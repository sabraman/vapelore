import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function getPosts() {
  const posts = await db.query.posts.findMany({
    orderBy: (post, { desc }) => desc(post.puffs),
    where: (post, { eq }) => eq(post.isApproved, true),
  });

  return posts;
}

export async function getUserPosts() {
  const user = auth();
  console.log(user.userId);

  try {
    if (!user.userId) throw new Error("Unauthorized");
  } catch (err) {
    console.error(err);
    return redirect("/");
  }
  const posts = await db.query.posts.findMany({
    where: (post, { eq }) => eq(post.userId, user.userId),
    orderBy: (post, { desc }) => desc(post.puffs),
  });

  return posts;
}
