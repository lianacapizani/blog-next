import Link from "next/link";
import Image from "next/image";

function HeaderLink({children, ...props}) {
  return (
    <Link
      className="font-semibold text-zinc-50 rounded-md hover:bg-zinc-500/[0.1] px-2 py-1 transition-all duration-100"
      {...props}
    >
      {children}
    </Link>
  );
}

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between fixed px-2 py-4 sm:p-4 bg-zinc-900">
      <Image src="/logo.svg" width={42} height={42} alt="Logo do Portfólio" />

      <nav className="flex gap-3">
        <HeaderLink href="/">Home</HeaderLink>
        <HeaderLink href="/posts">Posts</HeaderLink>
      </nav>
    </header>
  );
}