import Filter from "@/app/components/Filter";
import initTranslations from '../i18n';

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { t } = await initTranslations(locale, ["default"]);
  return (
    <main className="flex min-h-screen flex-col p-24 w-9/12 m-auto">
      <h2 className="font-medium text-orange-500 text-sm">{t("City")}</h2>
      <h1 className="font-extrabold text-white text-7xl py-7">
      {t("tema")}
      </h1>
      <Filter />
    </main>
  );
}