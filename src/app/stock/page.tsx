import Image from 'next/image';
import Link from 'next/link';
import { Quest, getAllQuests } from '@/modules/db';

async function getData(): Promise<{ quests: Quest[] }> {
  const quests = await getAllQuests();
  return { quests };
}

export default async function QuestsPage() {
  const { quests } = await getData();

  return (
    <div className="flex flex-wrap justify-around pt-48">
      {quests.map((quest) => (
        <Link key={quest.id} href={`/quests/${quest.id}`}>
          <div className="relative py-5">
            <Image
              quality={100}
              src={`/${quest.previewImg}`}
              alt={quest.title}
              width={344}
              height={234}
              style={{ width: '334px', height: '234px' }}
              className="rounded-lg"
            />
            <div className="absolute bottom-10 left-8 text-white">
              <h3 className="text-2xl font-bold">{quest.title}</h3>
              <div className="flex items-center">
                <Image
                  src="/person.png"
                  alt="person"
                  width={11}
                  height={14}
                  className="object-cover"
                />
                <p className="font-medium text-sm px-2">
                  {quest.peopleCount[0]} - {quest.peopleCount[1]}
                </p>
                <span className="border-r-2 border-orange-500 h-5"></span>
                <Image
                  src="/puzzle.png"
                  alt="puzzle"
                  width={14}
                  height={14}
                  className="object-cover mx-2"
                />
                <p className="font-medium text-sm">{quest.level}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}