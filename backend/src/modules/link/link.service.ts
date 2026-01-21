import { prisma } from "../../helpers/prisma.helper";

async function findLinks(): Promise<any> {
  return await prisma.link.findMany();
}

async function createShortenedLink(data: {
  originalUrl: string;
}): Promise<any> {
  const newLink = await prisma.link.create({
    data: {
      uid: crypto.randomUUID(),
      originalUrl: data.originalUrl,
      slug: Math.random().toString(36).substring(2, 8),
    },
  });
  return newLink;
}

export const linkService = {
  findLinks,
  createShortenedLink,
};
