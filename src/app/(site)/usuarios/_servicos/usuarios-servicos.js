"use server";

import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";
import {z} from "zod";

const prisma = new PrismaClient();

export async function retornarUsuarioPorEmail(email) {
  const validador = z
    .string({required_error: "Email é obrigatório"})
    .email({message: "Email inválido"});

  const camposValidados = validador.safeParse(email);

  if (!camposValidados.success) {
    return {
      erros: camposValidados.error.issues.map((issue) => issue.message),
    };
  }

  const usuario = await prisma.usuario.findFirst({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
    },
  });

  return {data: usuario};
}

export async function criarUsuario(payload) {
  const validador = z.object({
    email: z
      .string({required_error: "Email é obrigatório"})
      .email({message: "Email inválido"}),
    senha: z
      .string({required_error: "Senha é obrigatória"})
      .min(8, {message: "A senha deve conter ao menos 8 caracteres"}),
  });

  const camposValidados = validador.safeParse(payload);

  if (!camposValidados.success) {
    return {
      erros: camposValidados.error.issues.map((issue) => issue.message),
    };
  }

  const {email, senha} = payload;

  const {data: usuarioExiste} = await retornarUsuarioPorEmail(email);

  if (usuarioExiste) {
    return {erros: ["Email já cadastrado"]};
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const usuario = await prisma.usuario.create({
    data: {
      email,
      senha: senhaHash,
    },
    select: {
      id: true,
      email: true,
    },
  });

  return usuario;
}

export async function validarSenha(senhaDigitada, senhaAtual) {
  const validador = z.object({
    senhaDigitada: z.string({required_error: "Senha digitada é obrigatória"}),
    senhaAtual: z.string({required_error: "Senha atual é obrigatória"}),
  });

  const camposValidados = validador.safeParse({senhaDigitada, senhaAtual});

  if (!camposValidados.success) {
    return {
      erros: camposValidados.error.issues.map((issue) => issue.message),
    };
  }

  return bcrypt.compare(senhaDigitada, senhaAtual);
}