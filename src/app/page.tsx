import { headers } from "next/headers";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const mockInfo = {
  brand: "mock brand",
  model: "mock model",
  puffs: 9999,
  strength: "лёгкая",
  puffType: "тугая",
  taste: "насыщенная",
  charge: "нет",
  liqVolume: 5,
  capacity: 900,
  display: "нет",
  features: "guarder x",
};

const mockUrls = [
  "https://utfs.io/f/57c7bafb-3d9a-414a-9cbd-a0b164757416-akwizj.png",
  "https://utfs.io/f/17370d49-9029-4e16-9901-46463e54fbd9-iuhoxa.png",
  "https://utfs.io/f/242384a3-0deb-48fb-9983-9a44393d4f46-g0f4l3.png",
  "https://utfs.io/f/56388810-81f1-4e53-a5cd-187dcb165f2c-g0f21l.png",
];

const mockItems = mockUrls.map((imageUrl, index) => ({
  id: index + 1,
  imageUrl,
  ...mockInfo,
}));

const posts = await db.query.posts.findMany();
console.log(posts);

export default async function HomePage() {
  headers();
  return (
    <main>
      <div className="flex flex-wrap justify-evenly gap-8">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {[...mockItems, ...mockItems, ...mockItems].map((item) => (
          <div key={item.id} className="flex w-52 flex-col gap-2">
            <img src={item.imageUrl} />
            <div className="info">
              <p className="text-2xl font-bold">{item.brand}</p>
              <p className="text-xl font-semibold">{item.model}</p>
              <div className="flex flex-row justify-between">
                Количество затяжек:{" "}
                <p className="font-semibold">{item.puffs}</p>
              </div>
              <div className="flex flex-row justify-between">
                Крепость: <p className="font-semibold">{item.strength}</p>
              </div>
              <div className="flex flex-row justify-between">
                Затяжка: <p className="font-semibold">{item.puffType}</p>
              </div>
              <div className="flex flex-row justify-between">
                Вкусопередача: <p className="font-semibold">{item.taste}</p>
              </div>
              <div className="flex flex-row justify-between">
                Зарядка: <p className="font-semibold">{item.charge}</p>
              </div>
              <div className="flex flex-row justify-between">
                Объем жидкости:{" "}
                <p className="font-semibold">{item.liqVolume}</p> мл
              </div>
              <div className="flex flex-row justify-between">
                Объем аккумулятора:{" "}
                <p className="font-semibold">{item.capacity}</p> mAh
              </div>
              <div className="flex flex-row justify-between">
                Индикатор: <p className="font-semibold">{item.display}</p>
              </div>
              <div className="flex flex-col justify-between">
                Особенности: <p className="font-semibold">{item.features}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
