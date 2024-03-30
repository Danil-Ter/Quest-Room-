import Filter from "@/app/components/Filter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24 w-9/12 m-auto">
      <h2 className="font-medium text-orange-500 text-sm">Квести у Львові</h2>
      <h1 className="font-extrabold text-white text-7xl py-7">
        Виберіть тематику
      </h1>
      <Filter />
    </main>
  );
}
