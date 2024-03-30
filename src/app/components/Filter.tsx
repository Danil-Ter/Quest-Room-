"use client"

import Image from "next/image";
import { useEffect } from "react";
import create from "zustand";
import QuestList from "@/app/components/QuestList";

interface Quest {
  id: number;
  title: string;
  previewImg: string;
  level: string;
  peopleCount: [number, number];
  type: string;
}

interface TypeMapping {
  [key: string]: string;
}

interface FilterState {
  quests: Quest[];
  filteredQuests: Quest[];
  selectedType: string;
}

interface FilterActions {
  setQuests: (quests: Quest[]) => void;
  setSelectedType: (selectedType: string) => void;
  filterQuestsByType: (type: string) => void;
}

const useFilterStore = create<FilterState & FilterActions>((set) => ({
  quests: [],
  filteredQuests: [],
  selectedType: "All",
  setQuests: (quests) => set({ quests, filteredQuests: quests }),
  setSelectedType: (selectedType) => set({ selectedType }),
  filterQuestsByType: (type) => {
    set((state) => ({
      selectedType: type,
      filteredQuests:
        type === "All" ? state.quests : state.quests.filter((quest) => quest.type === type),
    }));
  },
}));

const Filter: React.FC = () => {
  const { quests, filteredQuests, selectedType, setQuests, setSelectedType, filterQuestsByType } =
    useFilterStore();

  useEffect(() => {
    fetch("http://localhost:3001/quests")
      .then((response) => response.json())
      .then((data: Quest[]) => setQuests(data))
      .catch((error) => console.error("Ошибка", error));
  }, [setQuests]);

  const typeMappings: TypeMapping = {
    All: " Всі квести",
    adventures: "Пригоди",
    horror: "Жахи",
    mystic: "Мистика",
    detective: "Детектив",
    "sci-fi": "Sci-fi",
  };

  return (
    <>
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
      <QuestList quests={filteredQuests} />
    </>
  );
};

export default Filter;
