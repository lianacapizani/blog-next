import Header from "@/app/(site)/_componentes/header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="pt-[4.625rem]">
        <section className="flex items-center h-[80vh] p-2 sm:p-10">
          <div className="flex flex-col justify-center h-full -mt-28">
            <div className="font-bold text-xl sm:text-3xl text-emerald-200">
              Página Não Encontrada
            </div>
            <div className="font-bold text-4xl sm:text-6xl sm:leading-tight text-zinc-50">
              Ops!
              <br />
              Parece que me perdi...
            </div>
            <div className="font-thin text-lg sm:text-xl leading-relaxed sm:leading-relaxed text-zinc-300 mt-5 sm:max-w-[50%]">
              Navegue pelo menu superior para encontrar o que você procura.
            </div>
          </div>
        </section>
      </main>
    </>
  );
}