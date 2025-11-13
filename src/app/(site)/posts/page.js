import dynamic from "next/dynamic";
import Link from "next/link";
import { listarPosts } from "./_servicos/posts-servicos";
import { sessaoValida } from "@/app/(autenticacao)/_servicos/autenticacao_servicos";

export const metadata = {
  title: "Posts",
  description:
    "Confira todos os meus posts sobre variados assuntos na programação",
};

const CriarPostModal = dynamic(() => import("./_componentes/criar-post-modal"));

const dateTimeFormat = Intl.DateTimeFormat("pt-BR");

export const revalidate = 10;

export default async function Posts() {
  const isSessaoValida = await sessaoValida();
  const posts = await listarPosts();

  return (
    <>
      <header className="container flex items-center justify-between w-full mt-7">
        <h1 className="text-white mb-0">Posts</h1>
        {isSessaoValida && <CriarPostModal />}
      </header>

      <section className="container w-full mt-7">
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <div key={post.id}>
              {post.slug ? (
                <h3 className="my-0">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-fuchsia-300 hover:underline"
                  >
                    {post.titulo}
                  </Link>
                </h3>
              ) : (
                <h3 className="my-0 text-gray-400">
                  {post.titulo} (slug ausente)
                </h3>
              )}

              <span className="text-zinc-300 text-sm">
                Postado em: {dateTimeFormat.format(post.criadoEm)} -
                Comentários: {post._count.postCommentarios}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
