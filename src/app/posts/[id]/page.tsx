import FullPost from "~/components/full-post";

export default function PostModal({
  params: { id: postId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(postId);
  if (Number.isNaN(idAsNumber)) {
    throw new Error("Некорректный ID");
  }
  return <FullPost id={idAsNumber} />;
}
