import { getPost } from "~/server/queries";

export default async function FullPost(props: { id: number }) {
  const post = await getPost(props.id);
  return (
    <div>
      <img src={post.imageUrl} className="w-32 rounded-3xl" alt={post.brand} />
    </div>
  );
}
