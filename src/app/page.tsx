"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Quest {
  id: number;
  title: string;
  description: string;
  previewImg: string;
  coverImg: string;
  type: string;
  level: string;
  peopleCount: [number, number];
  duration: number;
}

export default function Home() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [filteredQuests, setFilteredQuests] = useState<Quest[]>([]);
  const [selectedType, setSelectedType] = useState<string>("All");

  useEffect(() => {
    fetch("http://localhost:3001/quests")
      .then((response) => response.json())
      .then((data) => {
        setQuests(data);
        setFilteredQuests(data);
      })
      .catch((error) => console.error("Помилка", error));
  }, []);

  const typeMappings: { [key: string]: string } = {
    All: " Всі квести",
    adventures: "Пригоди",
    horror: "Жахи",
    mystic: "Мистика",
    detective: "Детектив",
    "sci-fi": "Sci-fi",
  };

  const filterQuestsByType = (type: string) => {
    setSelectedType(type);
    if (type === "All") {
      setFilteredQuests(quests);
    } else {
      const filtered = quests.filter((quest) => quest.type === type);
      setFilteredQuests(filtered);
    }
  };

  return (
    <main className="flex min-h-screen flex-col p-24 w-9/12 m-auto">
      <h2 className="font-medium text-orange-500 text-sm">Квести у Львові</h2>
      <h1 className="font-extrabold text-white text-7xl py-7">
        Выберите тематику
      </h1>
      <div className="flex items-center justify-around pb-16">
        {Object.keys(typeMappings).map((type, index, array) => (
          <div
            key={type}
            className={`flex items-center cursor-pointer`}
            onClick={() => filterQuestsByType(type)}
          >
            <Image
              src={`/type/${type}.png`}
              alt={type}
              width={type === "All" ? 26 : 36}
              height={30}
              className="mr-4"
            />
            <p
              className={`text-sm font-medium mr-10 ${
                selectedType === type
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-white"
              }`}
            >
              {typeMappings[type]}
            </p>
            {index !== array.length - 1 && (
              <span className="border-r-2 border-orange-500 h-10"></span>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-around">
        {filteredQuests.map((quest) => (
          <Link key={quest.id} href={`/quests/${quest.id}`}>
            <div key={quest.id} className="relative py-5">
              <Image
                quality={100}
                src={`/${quest.previewImg}`}
                alt={quest.title}
                width={344}
                height={234}
                style={{ width: "334px", height: "234px" }}
                className=" rounded-lg"
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
    </main>
  );
}
