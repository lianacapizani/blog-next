"use server";

import {PrismaClient} from "@prisma/client";
import {z} from "zod";

const prisma = new PrismaClient();

export async function retornarPostPorId(id) {
  const validador = z.string({required_error: "ID é um campo obrigatório"});

  validador.parse(id);

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  return post;
}

export async function retornarPostPorSlug(slug) {
  const validador = z.string({required_error: "Slug é um campo obrigatório"});

  validador.parse(slug);

  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
  });

  return post;
}

export async function listarPosts() {
  const posts = await prisma.post.findMany({
    orderBy: {
      criadoEm: "desc",
    },
    include: {
      _count: {
        select: {
          postCommentarios: true,
        },
      },
    },
  });

  return posts;
}

export async function criarPost(payload) {
  const validador = z.object({
    slug: z.string({required_error: "Slug é um campo obrigatório"}),
    titulo: z.string({required_error: "Título é um campo obrigatório"}),
    conteudo: z.string({required_error: "Conteúdo é um campo obrigatório"}),
  });

  const camposValidados = validador.safeParse(payload);

  if (!camposValidados.success) {
    return {
      erros: camposValidados.error.issues.map((issue) => issue.message),
    };
  }

  const {titulo, slug, conteudo} = payload;

  const slugExiste = await retornarPostPorSlug(slug);

  if (slugExiste) {
    return {erros: ["Slug já cadastrado"]};
  }

  const post = await prisma.post.create({
    data: {
      titulo,
      slug,
      conteudo,
    },
  });

  return {data: post};
}

export async function atualizarPosts(payload) {
  const validador = z.object({
    id: z.string({required_error: "ID é um campo obrigatório"}),
    slug: z.string({required_error: "Slug é um campo obrigatório"}),
    titulo: z.string({required_error: "Título é um campo obrigatório"}),
    conteudo: z.string({required_error: "Conteúdo é um campo obrigatório"}),
  });

  const camposValidados = validador.safeParse(payload);

  if (!camposValidados.success) {
    return {
      erros: camposValidados.error.issues.map((issue) => issue.message),
    };
  }

  const {id, titulo, slug, conteudo} = payload;

  const postExiste = await retornarPostPorId(id);

  if (!postExiste) {
    return {erros: ["Post não encontrado"]};
  }

  const slugExiste = await retornarPostPorSlug(slug);

  if (slugExiste) {
    return {erros: ["Slug já cadastrado"]};
  }

  const post = await prisma.post.update({
    where: {
      id,
    },
    data: {
      titulo,
      slug,
      conteudo,
    },
  });

  return post;
}

export async function excluirPost(id) {
  const validador = z.string({required_error: "ID é um campo obrigatório"});

  const camposValidados = validador.safeParse(id);

  if (!camposValidados.success) {
    return {
      erros: camposValidados.error.issues.map((issue) => issue.message),
    };
  }

  await prisma.post.delete({
    where: {
      id,
    },
  });
}

export async function criarComentarioNoPost(payload) {
  const validador = z.object({
    postId: z.string({required_error: "ID do post é um campo obrigatório"}),
    conteudo: z.string({required_error: "Conteúdo é um campo obrigatório"}),
  });

  const camposValidados = validador.safeParse(payload);

  if (!camposValidados.success) {
    return {
      erros: camposValidados.error.issues.map((issue) => issue.message),
    };
  }

  const {postId, conteudo} = payload;

  const postExiste = await retornarPostPorId(postId);

  if (!postExiste) {
    return {erros: ["Post não encontrado"]};
  }

  const postComentario = await prisma.postCommentario.create({
    data: {
      postId,
      conteudo,
    },
  });

  return postComentario;
}

export async function listarComentariosDoPost(postId) {
  const validador = z.string({
    required_error: "ID do post é um campo obrigatório",
  });

  const camposValidados = validador.safeParse(postId);

  if (!camposValidados.success) {
    return {
      erros: camposValidados.error.issues.map((issue) => issue.message),
    };
  }

  const postExiste = await retornarPostPorId(postId);

  if (!postExiste) {
    return {erros: ["Post não encontrado"]};
  }

  const postComentario = await prisma.postCommentario.findMany({
    where: {
      postId,
    },
  });

  return postComentario;
}