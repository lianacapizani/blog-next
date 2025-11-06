"use client";

import { useFormStatus } from "react-dom";
import { criarPost } from "../_servicos/posts-servicos";
import { useRef, useState } from "react";

function CriarPostBotao({ pending }) {
  return (
    <button
      className="flex-1 bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all disabled:opacity-50"
      disabled={pending}
    >
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
        className="mb-4 bg-fuchsia-500 text-sm hover:bg-fuchsia-600 text-white py-1 px-4 rounded-l shadow-lg transition-all"
        onClick={() => setOpen(true)}
      >
        Criar Post
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          {/* Modal */}
          <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fadeIn">
            {/* Botão de fechar */}
            <button
              className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost text-gray-400 hover:text-white"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            {/* Título */}
            <h3 className="text-3xl font-bold text-fuchsia-400 text-center mb-6">
              Criar Post
            </h3>

            {/* Formulário */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              {/* Título */}
              <label className="form-control w-full">
                <span className="label-text font-semibold text-gray-100">
                  Título
                </span>
                <input
                  type="text"
                  name="titulo"
                  placeholder="Digite o título"
                  className="input input-bordered w-full rounded-xl p-3 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                  required
                />
              </label>

              {/* Slug */}
              <label className="form-control w-full">
                <span className="label-text font-semibold text-gray-100">
                  Slug
                </span>
                <input
                  type="text"
                  name="slug"
                  placeholder="Digite o slug"
                  className="input input-bordered w-full rounded-xl p-3 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                  required
                />
              </label>

              {/* Conteúdo */}
              <label className="form-control w-full">
                <span className="label-text font-semibold text-gray-100">
                  Conteúdo
                </span>
                <textarea
                  name="conteudo"
                  placeholder="Escreva o conteúdo aqui"
                  className="textarea textarea-bordered w-full h-40 rounded-xl p-3 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                  required
                ></textarea>
              </label>

              {/* Alertas */}
              {erros.length > 0 && (
                <div className="alert alert-error mt-2 rounded-lg shadow-md bg-red-900 text-red-200 border border-red-700">
                  {erros.map((erro, i) => (
                    <div key={i}>{erro}</div>
                  ))}
                </div>
              )}

              {sucesso && (
                <div className="alert alert-success mt-2 rounded-lg shadow-md bg-green-900 text-green-200 border border-green-700">
                  Post criado com sucesso!
                </div>
              )}

              {/* Botões */}
              <div className="flex justify-between mt-6 gap-4">
                <CriarPostBotao pending={pending} />

                <button
                  type="button"
                  className="flex-1 py-3 px-6 rounded-xl border border-gray-600 text-gray-200 hover:bg-gray-800 transition-all"
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
