import { getPost } from "~/server/queries";

export default async function FullPost(props: { id: number }) {
  const post = await getPost(props.id);
  return (
    <div className="flex h-full w-full min-w-0 ">
      <div className="flex-shrink">
        <img
          src={post.imageUrl}
          className="rounded-3xl bg-white object-contain"
          alt={post.brand}
        />
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col">
        <div className="text-xl">{post.brand}</div>
        <div className="text-xl">{post.model}</div>
      </div>
    </div>
  );
}
