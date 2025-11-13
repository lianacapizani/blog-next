import Link from "next/link";
import CadastroForm from "../_componentes/cadastro-form";

export default function Cadastrar() {
  return (
    <div className="w-full sm:w-96 mx-auto lg:mt28">
      <h1 className="text-xl text-zinc-50 mb-3 mt-8 text-center font-bold">
        Portfólio Cadastro
      </h1>
      <section className="w-full flex p-4 border border-solid border-zinc-300/[0.18] rounded">
        <CadastroForm />
      </section>
      <div className="text-xs text-center mt-3">
        Já tem conta?{" "}
        <Link href="/login" className="text-blue-300">
          Faça login
        </Link>
      </div>
    </div>
  );
}