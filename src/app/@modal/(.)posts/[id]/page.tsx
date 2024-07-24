// import { Modal } from "./modal";

import { getPost } from "~/server/queries";

export default async function PostModal({
  params: { id: postId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(postId);
  if (Number.isNaN(idAsNumber)) {
    throw new Error("Некорректный ID");
  }
  const post = await getPost(idAsNumber);
  return (
    <div>
      <img src={post.imageUrl} className="w-32 rounded-3xl" alt={post.brand} />
    </div>
  );
}
