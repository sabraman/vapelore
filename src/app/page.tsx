import { eq } from "drizzle-orm";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";
export const revalidate = 2; // 20 seconds

interface Post {
  id: number;
  imageUrl: string;
  // Add other properties of the 'post' object here
  isApproved: boolean;
}

// const mockInfo = {
//   brand: "mock brand",
//   model: "mock model",
//   puffs: 9999,
//   strength: "лёгкая",
//   puffType: "тугая",
//   taste: "насыщенная",
//   charge: "нет",
//   liqVolume: 5,
//   capacity: 900,
//   display: "нет",
//   features: "guarder x",
// };

const posts = await db.query.posts.findMany({
  orderBy: (post, { desc }) => desc(post.puffs),
  where: (post, { eq }) => eq(post.isApproved, true),
});
// console.log(posts);
export default async function HomePage() {
  return (
    <main>
      <div className="flex flex-wrap justify-evenly gap-8">
        {posts.map((post) => (
          <div key={post.id} className="flex w-52 flex-col gap-2">
            <img src={post.imageUrl} />
            <div className="info">
              <p className="text-2xl font-bold">{post.brand}</p>
              <p className="text-xl font-semibold">{post.model}</p>
              <div className="flex flex-row justify-between">
                Количество затяжек:{" "}
                <p className="font-semibold">{post.puffs}</p>
              </div>
              <div className="flex flex-row justify-between">
                Крепость: <p className="font-semibold">{post.strength}</p>
              </div>
              <div className="flex flex-row justify-between">
                Затяжка: <p className="font-semibold">{post.puffType}</p>
              </div>
              <div className="flex flex-row justify-between">
                Вкусопередача: <p className="font-semibold">{post.taste}</p>
              </div>
              <div className="flex flex-row justify-between">
                Зарядка: <p className="font-semibold">{post.charge}</p>
              </div>
              <div className="flex flex-row justify-between">
                Объем жидкости:{" "}
                <p className="font-semibold">{post.liqVolume}</p> мл
              </div>
              <div className="flex flex-row justify-between">
                Объем аккумулятора:{" "}
                <p className="font-semibold">{post.capacity}</p> mAh
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
