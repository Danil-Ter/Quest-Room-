import Link from "next/link";
import Image from "next/image";

function Header() {
  return (
    <header className="absolute  w-full  px-40 mx-auto flex items-center justify-between h-20">
      <Image
        src="/Logo.png"
        alt="Logo"
        width={134}
        height={50}
        className=" object-cover"
      />
      <nav className=" font-semibold text-white text-sm">
        <Link className="px-5" href="/">
          КВЕСТИ
        </Link>
        <Link className="px-5" href="/beginners">
          НОВИЧКАМ
        </Link>
        <Link className="px-5" href="/reviews">
          ВІДГУКИ
        </Link>
        <Link className="px-5" href="/stock">
          АКЦІЇ
        </Link>
        <Link className="px-5" href="/contacts">
          КОНТАКТИ
        </Link>
      </nav>
      <p className="font-semibold text-white text-sm">026-88-22-222</p>
    </header>
  );
}

export default Header;
