"use client";

import { useActionState } from "react";
import { useFormStatus} from "react-dom";
import {cadastrar} from "../_servicos/autenticacao_servicos";

function BotaoSubmissao() {
  const {pending} = useFormStatus();

  return (
    <button
      type="submit"
      className="w-full p-3 bg-zinc-200 text-zinc-900 rounded font-bold"
      disabled={pending}
    >
      {pending ? "Criando..." : "Criar Conta"}
    </button>
  );
}

export default function CadastroForm() {
  const [state, formAction] = useActionState(
    async (_, formData) => {
      const email = formData.get("email");
      const senha = formData.get("senha");

      const result = await cadastrar({
        email,
        senha,
      });

      return result;
    },
    {erros: []}
  );

  return (
    <form action={formAction} className="flex flex-col gap-7 w-full">
      <div className="w-full">
        <label htmlFor="email" className="text-sm font-bold">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="w-full py-2 bg-transparent border-b border-solid border-b-zinc-400 text-zinc-300 outline-none"
          placeholder="ex: você@exemplo.com.br"
          autoFocus
          required
        />
      </div>
      <div className="w-full">
        <label htmlFor="senha" className="text-sm font-bold">
          Senha
        </label>
        <input
          id="senha"
          type="password"
          name="senha"
          className="w-full py-2 bg-transparent border-b border-solid border-b-zinc-400 text-zinc-300 outline-none"
          placeholder="••••••••••••"
          required
        />
      </div>
      {state.erros?.length > 0 && (
        <div role="alert" className="alert alert-error mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            {state.erros.map((erro) => (
              <div key={erro}>{erro}</div>
            ))}
          </span>
        </div>
      )}
      <BotaoSubmissao />
    </form>
  );
}