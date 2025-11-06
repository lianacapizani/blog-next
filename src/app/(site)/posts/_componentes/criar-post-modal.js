"use client";

import { useFormStatus } from "react-dom";
import { criarPost } from "../_servicos/posts-servicos";
import { useRef, useState } from "react";

function CriarPostBotao({ pending }) {
  return (
    <button className="btn btn-primary flex-1" disabled={pending}>
      {pending ? "Criando..." : "Criar"}
    </button>
  );
}

export default function CriarPostModal() {
  const formRef = useRef();
  const { pending } = useFormStatus();
  const [erros, setErros] = useState([]);
  const [sucesso, setSucesso] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErros([]);
    setSucesso(false);

    const formData = new FormData(formRef.current);

    try {
      const result = await criarPost({
        titulo: formData.get("titulo"),
        slug: formData.get("slug"),
        conteudo: formData.get("conteudo"),
      });

      if (result?.data) {
        formRef.current.reset();
        setSucesso(true);
      } else if (result?.erros) {
        setErros(result.erros);
      }
    } catch (error) {
      setErros([error.message || "Ocorreu um erro inesperado."]);
    }
  }

  return (
    <>
      {/* Botão que abre o modal */}
      <button
        className="btn btn-primary mb-4"
        onClick={() => setOpen(true)}
      >
        Criar Post
      </button>

      {/* Overlay do modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-base-100 rounded-xl shadow-2xl max-w-lg w-full p-6 relative animate-fadeIn">
            {/* Botão de fechar no canto */}
            <button
              className="absolute top-3 right-3 btn btn-sm btn-circle btn-ghost"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-center mb-4">Criar Post</h3>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              {/* Título */}
              <label className="form-control w-full">
                <span className="label-text font-medium">Título</span>
                <input
                  type="text"
                  name="titulo"
                  placeholder="Digite o título"
                  className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </label>

              {/* Slug */}
              <label className="form-control w-full">
                <span className="label-text font-medium">Slug</span>
                <input
                  type="text"
                  name="slug"
                  placeholder="Digite o slug"
                  className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </label>

              {/* Conteúdo */}
              <label className="form-control w-full">
                <span className="label-text font-medium">Conteúdo</span>
                <textarea
                  name="conteudo"
                  placeholder="Escreva o conteúdo aqui"
                  className="textarea textarea-bordered w-full h-40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                ></textarea>
              </label>

              {/* Alertas */}
              {erros.length > 0 && (
                <div className="alert alert-error mt-2 rounded-lg shadow-sm">
                  {erros.map((erro, i) => (
                    <div key={i}>{erro}</div>
                  ))}
                </div>
              )}

              {sucesso && (
                <div className="alert alert-success mt-2 rounded-lg shadow-sm">
                  Post criado com sucesso!
                </div>
              )}

              {/* Botões Criar e Fechar */}
              <div className="flex justify-between mt-4 gap-4">
                <CriarPostBotao pending={pending} />

                <button
                  type="button"
                  className="btn btn-outline btn-secondary flex-1"
                  onClick={() => setOpen(false)}
                >
                  Fechar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
