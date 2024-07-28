import { clerkClient } from "@clerk/nextjs/server";
import { getPost } from "~/server/queries";

export default async function FullPost(props: { id: number }) {
  const post = await getPost(props.id);

  const uploaderInfo = await clerkClient.users.getUser(post.userId);
  return (
    <div className="flex h-full w-full min-w-0 ">
      <div className="flex flex-shrink items-center justify-center">
        <img
          src={post.imageUrl}
          className=" flex-shrink rounded-3xl object-contain"
          alt={post.brand}
        />
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col">
        <div className="text-xl">{post.brand}</div>
        <div className="text-xl">{uploaderInfo.username}</div>
      </div>
    </div>
  );
}
