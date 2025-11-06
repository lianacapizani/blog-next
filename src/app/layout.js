import {Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children}) {
  return (
    <html
      lang="pt-BR"
      data-theme="luxury"
      className="bg-zinc-900 text-zinc-200"
    >
      <body className={inter.className}>{children}</body>
    </html>
  );
}