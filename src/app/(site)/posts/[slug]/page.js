import Markdown from "react-markdown";
import { listarPosts, retornarPostPorSlug } from "../_servicos/posts-servicos";

const dateTimeFormat = Intl.DateTimeFormat("pt-BR");

export const revalidate = 10;

export async function generateStaticParams() {
    const posts = await listarPosts();

    return posts.map((post) => ({slug: post.slug}))
}
export default async function PostDetail({params}) {
  const post = await retornarPostPorSlug(params.slug);

  return (
    <>
      <header className="container flex flex-col gap-2 w-full mt-7">
        <h1 className="text-emerald-300 mb-0">{post.titulo}</h1>
          <span className="text-zinc-300 text-sm">
            Postado em: {dateTimeFormat.format(post.criadoEm)} 
          </span>
      </header>
      <article className="container w-full mt-7 mb-10 prose prose-invert text-zinc-300">
        <Markdown>{post.conteudo}</Markdown>
      </article>
    </>
  );
}