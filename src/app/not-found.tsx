import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Сторінку не знайдено"
};

export default function NotFound() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/bg-notFound.png')",
        width: "100%",
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <h1 className=" text-5xl font-black text-orange-500">
        Сторінка не знайдена
      </h1>
      <h1 className=" text-8xl font-black text-white">Помилка 404</h1>
      <Link
        className="mt-10 px-10 py-5  rounded-full  bg-orange-500 text-white  shadow-md hover:bg-yellow-600 transition-colors duration-300 ease-in-out"
        href="/"
      >
        Повернутися на головну
      </Link>
    </section>
  );
}
