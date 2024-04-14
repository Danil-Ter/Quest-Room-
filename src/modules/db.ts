import { PrismaClient, Quest } from '@prisma/client';

const db = new PrismaClient();

export const getAllQuests = async (): Promise<Quest[]> => {
  try {
    const quests = await db.quest.findMany();
    return quests;
  } catch (error) {
    console.error('Error fetching quests:', error);
    throw error;
  }
};

export default db;
export type { Quest };