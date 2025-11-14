"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

const dateTimeFormat = Intl.DateTimeFormat("pt-BR");

export default function Comentarios({ postId }) {
  const {
    data: comentarios,
    isLoading,
    mutate,
  } = useSWR(`/api/posts/${postId}`);
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      conteudo: "",
    },
  });

  const [comentando, setComentando] = useState(false);

  async function onSubmit(payload) {
    setComentando(true);

    const resposta = await fetch(`/api/posts/${postId}`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const comentario = await resposta.json();

    mutate([...comentarios, comentario], { revalidate: true });

    form.reset();
    setComentando(false);
  }

  return (
    <section className="container mb-10">
      <h2 className="text-zinc-50">Comentários</h2>

      {isLoading && (
        <div className="text-zinc-400">Caregando comentários...</div>
      )}

      {!isLoading && comentarios.length > 0 && (
        <div className="container flex flex-col gap-5">
          {comentarios.map((comentario) => (
            <div key={comentario.id}>
              <div className="text-zinc-300 mb-1">{comentario.conteudo}</div>
              <div className="text-zinc-400 text-xs italic">
                Postado em:{" "}
                {dateTimeFormat.format(new Date(comentario.criadoEm))}
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && comentarios.length === 0 && (
        <div className="text-zinc-400">Seja o primeiro a comentar!</div>
      )}

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-1 w-full mt-7"
      >
        <div className="w-full">
          <textarea
            className="textarea textarea-bordered h-16 bg-transparent w-full"
            placeholder="Digite seu comentário"
            {...form.register("conteudo", { required: true })}
          ></textarea>
        </div>

        <div className="inline-flex justify-end">
          <button
            type="submit"
            disabled={!form.formState.isValid}
            className={`btn btn-sm text-fuchsia-400 ${
              form.formState.isValid ? "btn-primary" : "btn-disabled opacity-50"
            }`}
          >
            {comentando ? "Comentando..." : "Comentar"}
          </button>
        </div>
      </form>
    </section>
  );
}
