"use server";

import {
  criarUsuario,
  retornarUsuarioPorEmail,
  validarSenha,
} from "@/app/(site)/usuarios/_servicos/usuarios-servicos";
import { redirect } from "next/navigation";
import { z } from "zod";
import * as jose from "jose";
import { cookies } from "next/headers";

async function retornarSessao(token) {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
  const { payload } = await jose.jwtVerify(token, secret);

  return payload;
}

async function criarSessao(payload) {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

  const session = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1d")
    .sign(secret);

  const { exp } = await retornarSessao(session);

  // ✅ NOVO: cookies() agora é assíncrono
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    expires: exp * 1000,
    path: "/",
    httpOnly: true,
  });
}

export async function sessaoValida() {
  const cookieStore = await cookies(); // ✅ também deve ser aguardado
  const sessionCookie = cookieStore.get("session");

  if (sessionCookie) {
    const { value } = sessionCookie;
    const { exp } = await retornarSessao(value);
    const currentDate = new Date().getTime();

    return exp * 1000 > currentDate;
  }

  return false;
}

export async function login(payload) {
  const validador = z.object({
    email: z
      .string({ required_error: "Email é obrigatório" })
      .email({ message: "Email inválido" }),
    senha: z
      .string({ required_error: "Senha é obrigatória" })
      .min(8, { message: "A senha deve conter ao menos 8 caracteres" }),
  });

  const camposValidados = validador.safeParse(payload);

  if (!camposValidados.success) {
    return {
      erros: camposValidados.error.issues.map((issue) => issue.message),
    };
  }

  const { email, senha } = payload;
  const { data: usuario } = await retornarUsuarioPorEmail(email);

  if (!usuario) {
    return { erros: ["Email ou senha inválidos"] };
  }

  const senhaValida = await validarSenha(senha, usuario.senha);

  if (!senhaValida) {
    return { erros: ["Email ou senha inválidos"] };
  }

  await criarSessao(usuario);
  redirect("/");
}

export async function cadastrar(payload) {
  const validador = z.object({
    email: z
      .string({ required_error: "Email é obrigatório" })
      .email({ message: "Email inválido" }),
    senha: z
      .string({ required_error: "Senha é obrigatória" })
      .min(8, { message: "A senha deve conter ao menos 8 caracteres" }),
  });

  const camposValidados = validador.safeParse(payload);

  if (!camposValidados.success) {
    return {
      erros: camposValidados.error.issues.map((issue) => issue.message),
    };
  }

  const { email, senha } = payload;
  const emailsPermitidos = ["teste@fiap.com.br"];

  if (!emailsPermitidos.includes(email)) {
    return { erros: ["Acesso não permitido"] };
  }

  const usuario = await criarUsuario({ email, senha });

  if (!usuario?.erros) {
    await criarSessao(usuario);
    redirect("/");
  }

  return usuario;
}
