import Header from "@/app/(site)/_componentes/header";

export const metadata = {
  description: "Liana Capizani - Desenvolvedora Front End e especialista em UX/UI Design, conheça mais!",
};


export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-[4.625rem]">
        <section className="flex items-center h-[80vh] p-2 sm:p-10">
          <div className="flex flex-col justify-center h-full -mt-28">
            <div className="font-bold text-xl sm:text-3xl text-fuchsia-400">
              Liana Capizani
            </div>
            <div className="font-bold text-4xl sm:text-5xl sm:leading-tight text-zinc-50">
              Front-End Developer
              <br />
              UX|UI Designer
            </div>
            <div className="font-thin text-lg sm:text-xl leading-relaxed sm:leading-relaxed text-zinc-300 mt-5 sm:max-w-[50%]">
              Desenvolvendo soluções que transcendem o comum, proporcionando
          experiências excepcionais que simplificam e aprimoram a conexão humana
          com a tecnologia.
            </div>
          </div>
        </section>
      </main>
    </>
  );
}