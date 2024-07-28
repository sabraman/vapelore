import { addPost, deletePost, getAllPosts, getPosts } from "~/server/queries";
import { clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { checkRole } from "~/utils/roles";
import { Button } from "~/components/ui/button";

export const dynamic = "force-dynamic";

export default async function MyPosts() {
  // If the user does not have the admin role, redirect them to the home page
  if (!checkRole("admin")) {
    redirect("/");
  }
  const posts = await getAllPosts();
  const userInfo = (await clerkClient.users.getUserList()).data;
  return (
    <main>
      <div className="flex flex-wrap justify-evenly gap-8">
        {posts.map((post) => (
          <div key={post.id} className="flex w-52 flex-col gap-2">
            <div className="flex flex-row justify-between">
              Статус:
              <p className="font-semibold">
                {post.isApproved ? "Добавлено" : "В обработке"}
              </p>
            </div>
            <div key={post.id} className="flex w-52 flex-col gap-2">
              <div className="flex flex-row justify-between">
                Добавлено:
                <p className="text-sm">
                  {userInfo.map((user) => {
                    if (user.id === post.userId) {
                      return user.username;
                    }
                  })}
                </p>
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.imageUrl}
              className="rounded-3xl"
              width={208}
              height={208}
              style={{ objectFit: "cover" }}
              alt={post.brand + " " + post.model}
            />
            <div className="info">
              <p className="text-2xl font-bold">{post.brand}</p>
              <p className="text-xl font-semibold">{post.model}</p>
              <div className="flex flex-row justify-between">
                Количество затяжек:
                <p className="font-semibold">
                  {post.puffs.toLocaleString("ru-RU")}
                </p>
              </div>
              <div className="flex flex-row justify-between">
                Крепость: <p className="font-semibold">{post.strength}</p>
              </div>
              <div className="flex flex-row justify-between">
                Затяжка: <p className="font-semibold">{post.puffType}</p>
              </div>
              <div className="flex flex-col justify-between">
                Вкусопередача:{" "}
                <p className="flex justify-end font-semibold">{post.taste}</p>
              </div>
              <div className="flex flex-row justify-between">
                Зарядка: <p className="font-semibold">{post.charge}</p>
              </div>
              <div className="flex flex-row justify-between">
                Объем жидкости:{" "}
                <div className="flex items-end justify-end">
                  <p className="font-semibold">{post.liqVolume}</p> &#8239; мл
                </div>
              </div>
              <div className="flex flex-row justify-between">
                Объем аккумулятора:{" "}
                <div className="flex items-end justify-end align-middle">
                  <p className="font-semibold">{post.capacity}</p> &#8239; mAh
                </div>
              </div>
              <div className="flex flex-row justify-between">
                Индикатор: <p className="font-semibold">{post.display}</p>
              </div>
              <div className="flex flex-col justify-between">
                Особенности: <p className="font-semibold">{post.features}</p>
              </div>
              <form
                action={async () => {
                  "use server";
                  await addPost(post.id);
                }}
              >
                <Button
                  variant={"outline"}
                  type="submit"
                  className="mt-4 w-full"
                >
                  Добавить
                </Button>
              </form>
              <form
                action={async () => {
                  "use server";
                  await deletePost(post.id);
                }}
              >
                <Button
                  variant={"destructive"}
                  type="submit"
                  className="mt-4 w-full"
                >
                  Удалить
                </Button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
