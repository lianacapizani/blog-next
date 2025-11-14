import {
  criarComentarioNoPost,
  listarComentariosDoPost,
} from "@/app/(site)/posts/_servicos/posts-servicos";

export async function GET(request, { params }) {
  const { id: postId } = await params;
  const comentarios = await listarComentariosDoPost(postId);

  return Response.json(comentarios);
}

export async function POST(request, { params }) {
  const { id: postId } = await params;
  const payload = await request.json();
  const comentario = await criarComentarioNoPost({ ...payload, postId });

  return Response.json(comentario);
}
