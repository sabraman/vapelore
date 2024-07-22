import { getUserPosts } from "~/server/queries";
export const dynamic = "force-dynamic";
export default async function MyPosts() {
  const posts = await getUserPosts();
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
            <img src={post.imageUrl} className="rounded-3xl" />
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
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
