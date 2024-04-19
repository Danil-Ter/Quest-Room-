// Файл page.tsx
import Image from "next/image";
import { Metadata } from 'next' 
import OrderForm from "@/app/components/OrderForm";
import { getQuestById, Quest } from "@/app/actions/actions";

const QuestPage = async ({
  params: { id },
}: {
  params: { id: string };
}): Promise<any> => {
  const questId = parseInt(id);
  const quest: Quest | null = await getQuestById(questId);
  if (!quest) {
    return <div>Quest not found</div>;
  }

  return (
    <section
      style={{
        backgroundImage: `url(/${quest.coverImg})`,
        width: "100%",
        height: "100vh",
      }}
      className="bg-cover bg-center text-white flex  items-center justify-center "
    >
      <div className="w-1/2"></div>
      <div className="text-left  w-2/5 ">
        <p className="text-orange-500 font-normal text-sm">{quest.type}</p>
        <h1 className=" font-black text-8xl pb-12">{quest.title}</h1>
        <div className="flex items-center my-4">
          <div className="flex items-center mr-4">
            <Image
              src="/clock.png"
              alt="person"
              width={20}
              height={20}
              className="object-cover"
            />
            <p className="font-medium text-sm px-2">{quest.duration}</p>
          </div>
          <span className="border-r-2 border-orange-500 h-5"></span>
          <div className="flex items-center mr-4">
            <Image
              src="/person.png"
              alt="puzzle"
              width={16}
              height={21}
              className="object-cover ml-5"
            />
            <p className="font-medium text-sm px-2">
              {quest.peopleCount[0]} - {quest.peopleCount[1]}
            </p>
          </div>
          <span className="border-r-2 border-orange-500 h-5"></span>
          <div className="flex items-center">
            <Image
              src="/puzzle.png"
              alt="puzzle"
              width={20}
              height={21}
              className="object-cover ml-5"
            />
            <p className="font-medium text-sm px-2">{quest.level}</p>
          </div>
        </div>
        <p className="font-normal  text-lg w-3/4">{quest.description}</p>
        <OrderForm/>
      </div>
    </section>
  );
};

export const generateMetadata = async ({ params }: { params: { id: string } }): Promise<Metadata> => {
  const id = parseInt(params.id);
  const quest: Quest | null = await getQuestById(id);
  
  return {
    title: quest ? quest.title : "Quest Not Found",
  };
};

export default QuestPage;
