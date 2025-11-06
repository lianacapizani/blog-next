import Header from "@/app/(site)/_componentes/header";

export const metadata = {
  title: {
    template: "%s | Portfólio",
    default: "Portfólio",
  }
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