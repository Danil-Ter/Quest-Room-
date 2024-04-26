import Image from "next/image";
import OrderForm from "@/app/components/OrderForm";
import initTranslations from '@/app/i18n';


export default async function Contacts({ params: { locale } }: { params: { locale: string } }) {
  const { t } = await initTranslations(locale, ["default"]);
  return (
    <section
      className=" pt-20"
      style={{
        backgroundImage: "url('/bg-notFound.png')",
        width: "100%",
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <div className="w-3/4 m-auto">
        <h2 className=" font-medium text-orange-500 text-sm pt-16">
          {t("City")}
        </h2>
        <h1 className=" font-extrabold text-white text-7xl py-7">{t("Contacts")}</h1>
        <div className="border-t-2 border-orange-500"></div>
        <div className="flex items-center  justify-around pt-16">
          <div className=" flex-col">
            <div className="flex-col pb-4">
              <h3 className=" font-bold text-base text-white">{t("Address")}</h3>
              <p className=" font-medium text-sm text-white">
              {t("Place")}
              </p>
            </div>
            <div className="flex-col pb-4">
              <h3 className=" font-bold text-base text-white">{t("Hours")}</h3>
              <p className=" font-medium text-sm text-white">
                9 - 20
              </p>
            </div>
            <div className="flex-col pb-4">
              <h3 className=" font-bold text-base text-white">{t("Phone")}</h3>
              <p className=" font-medium text-sm text-white">026-88-22-222</p>
            </div>
            <div className="flex-col">
              <h3 className=" font-bold text-base text-white">E-mail</h3>
              <p className=" font-medium text-sm text-white">
                lviv.games@game.ua
              </p>
            </div>
            <OrderForm/>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d160.81250022253508!2d24.032424211722333!3d49.84245745494354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add6d03cf8511%3A0x74310635f5da0be!2zS2FtJ3lhbnl0c3lhIFZpbMq5Y2hraXYsINC_0LvQvtGJ0LAg0KDQuNC90L7QuiwgMywg0JvRjNCy0ZbQsiwg0JvRjNCy0ZbQstGB0YzQutCwINC-0LHQu9Cw0YHRgtGMLCA3OTAwMA!5e0!3m2!1sru!2sua!4v1711049313539!5m2!1sru!2sua"
            width="645"
            height="350"
          ></iframe>
        </div>
      </div>
    </section>
  );
}


