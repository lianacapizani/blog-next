import Markdown from "react-markdown";
import { retornarPostPorSlug, listarPosts } from "../_servicos/posts-servicos";
import Comentarios from "../../_componentes/comentarios";


const dateTimeFormat = Intl.DateTimeFormat("pt-BR");

export const revalidate = 10;

// Gera os parâmetros estáticos para SSG
export async function generateStaticParams() {
  const posts = await listarPosts();
  return posts
    .filter((post) => post.slug)
    .map((post) => ({ slug: post.slug }));
}

// Metadata dinâmico
export async function generateMetadata(context) {
  // Recebe context e aguarda params
  const params = await context.params;
  const slug = params?.slug;

  if (!slug) {
    return {
      title: "Post não encontrado",
      description: "O post solicitado não foi encontrado.",
    };
  }

  const post = await retornarPostPorSlug(slug);

  if (!post) {
    return {
      title: "Post não encontrado",
      description: "O post solicitado não foi encontrado.",
    };
  }

  return {
    title: post.titulo,
    description: `${post.conteudo.substring(0, 120)}...`,
  };
}

// Página do post
export default async function PostDetail(context) {
  const params = await context.params;
  const slug = params?.slug;

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 bg-black">
        Slug inválido
      </div>
    );
  }

  const post = await retornarPostPorSlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 bg-black">
        Post não encontrado
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="container flex flex-col gap-2 w-full mt-7">
        <h1 className="text-fuchsia-400 text-3xl font-bold mb-0">
          {post.titulo}
        </h1>
        <span className="text-zinc-400 text-sm">
          Postado em: {dateTimeFormat.format(post.criadoEm)}
        </span>
      </header>

      {/* Conteúdo */}
      <article className="container w-full mt-7 mb-10 prose prose-invert text-zinc-300">
        <Markdown>{post.conteudo}</Markdown>
      </article>

      <Comentarios postId={post.id} />

    </div>
  );
}
