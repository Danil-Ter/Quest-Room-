'use server';
import db from '@/modules/db';

export type Quest = {
  id: number;
  title: string;
  description: string;
  previewImg: string;
  coverImg: string;
  type: string;
  level: string;
  peopleCount: number[];
  duration: number;
};

export const getQuests = async (filters?: { category?: string }): Promise<Quest[]> => {
    const res: Quest[] = await db.quest.findMany({
      where: {
        type: filters?.category,
      },
    });
  
    if (!res) {
      return [];
    }
  
    return res;
  };

export const getQuestById = async (id: number): Promise<Quest | null> => {
  const res: Quest | null = await db.quest.findUnique({
    where: {
      id: +id,
    },
  });

  return res;
};

