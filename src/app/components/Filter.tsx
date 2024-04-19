"use client";
import Image from "next/image";
import { useEffect } from "react";
import create from "zustand";
import QuestList from "@/app/components/QuestList";
import { getQuests, Quest } from "@/app/actions/actions";

interface TypeMapping {
  [key: string]: string;
}

interface FilterState {
  quests: Quest[];
  selectedType: string;
}

interface FilterActions {
  setQuests: (quests: Quest[]) => void;
  setSelectedType: (selectedType: string) => void;
}

const useFilterStore = create<FilterState & FilterActions>((set) => ({
  quests: [],
  selectedType: "All",
  setQuests: (quests) => set({ quests }),
  setSelectedType: (selectedType) => set({ selectedType }),
}));

const Filter: React.FC = () => {
  const { quests, selectedType, setQuests, setSelectedType } = useFilterStore();

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const quests = await getQuests({ category: selectedType === 'All' ? undefined : selectedType });
        console.log('Quests received:', quests);
        setQuests(
          quests.map((quest) => ({
            ...quest,
            peopleCount: [quest.peopleCount[0], quest.peopleCount[1]],
          }))
        );
      } catch (error) {
        console.error('Error fetching quests:', error);
      }
    };

    fetchQuests();
  }, [selectedType]);

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
            onClick={() => setSelectedType(type)}
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
      <QuestList quests={quests} />
    </>
  );
};

export default Filter;