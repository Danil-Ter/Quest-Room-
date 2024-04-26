import Link from "next/link";
import Image from "next/image";
import initTranslations from '../i18n';

  export default async function Header({ params: { locale } }: { params: { locale: string } }) {
    const { t } = await initTranslations(locale, ["default"]);

  return (
    <header className="absolute w-full px-40 mx-auto flex items-center justify-between h-20">
      <Image
        src="/Logo.png"
        alt="Logo"
        width={134}
        height={50}
        className=" object-cover"
      />
      <nav className=" font-semibold text-white text-sm">
        <Link className="px-5" href="/">
        {t("quests")}
        </Link>
        <Link className="px-5" href="/beginners">
          {t("beginner")}
        </Link>
        <Link className="px-5" href="/reviews">
          {t("reviews")}
        </Link>
        <Link className="px-5" href="/stock">
          {t("promotions")}
        </Link>
        <Link className="px-5" href="/contacts">
        {t("contacts")}
        </Link>
      </nav>
      <p className="font-semibold text-white text-sm">026-88-22-222</p>
    </header>
  );
}
