import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { checkRole } from "~/utils/roles";
import { posts } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { revalidate } from "~/app/page";
import { revalidatePath } from "next/cache";

export async function getPosts() {
  const posts = await db.query.posts.findMany({
    orderBy: (post, { desc }) => desc(post.puffs),
    where: (post, { eq }) => eq(post.isApproved, true),
  });

  return posts;
}
export async function getAllPosts() {
  const posts = await db.query.posts.findMany({
    orderBy: (post, { desc }) => desc(post.puffs),
  });

  return posts;
}

export async function getUserPosts() {
  const user = auth();
  console.log(user.userId);

  try {
    if (!user.userId) throw new Error("Не авторизован😡");
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

export async function getPost(id: number) {
  const post = await db.query.posts.findFirst({
    where: (post, { eq }) => eq(post.id, id),
  });

  if (!post) {
    throw new Error("Не найден");
  }

  return post;
}

export async function deletePost(id: number) {
  const user = auth();
  if (!checkRole("admin")) {
    redirect("/");
  }
  const post = await db.query.posts.findFirst({
    where: (post, { eq }) => eq(post.id, id),
  });

  try {
    if (!user.userId) {
      throw new Error("Не авторизован😡");
    }
  } catch (err) {
    console.error(err);
    return redirect("/");
  }

  await db
    .delete(posts)
    .where(and(eq(posts.id, id), eq(posts.userId, user.userId)));

  revalidatePath(`/`);
}
export async function addPost(id: number) {
  const user = auth();
  if (!checkRole("admin")) {
    redirect("/");
  }
  const post = await db.query.posts.findFirst({
    where: (post, { eq }) => eq(post.id, id),
  });

  try {
    if (!user.userId) {
      throw new Error("Не авторизован😡");
    }
  } catch (err) {
    console.error(err);
    return redirect("/");
  }

  await db.update(posts).set({ isApproved: true }).where(eq(posts.id, id));

  revalidatePath(`/`);
}
