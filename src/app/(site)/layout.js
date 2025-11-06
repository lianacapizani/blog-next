import Header from "@/app/(site)/_componentes/header";

export const metadata = {
  title: "Portfólio",
  description: "Confira os posts do meu blog",
};

export default function SiteLayout({children}) {
  return (
    <>
      <Header />
      <main className="pt-[4.625rem] px-2 sm:px-4 prose !max-w-full">
        {children}
      </main>
    </>
  );
}