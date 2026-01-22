import { Base62Helper } from "../../helpers/base62.helper";
import { prisma } from "../../helpers/prisma.helper";

async function findLinks(): Promise<any> {
  return await prisma.link.findMany({
    orderBy: { createdAt: "desc" },
  });
}

async function createShortenedLink(data: {
  originalUrl: string;
}): Promise<any> {
  const shortId = await new Base62Helper().generateBase62Id();
  const shortUrl = `${process.env.BACKEND_URL || "http://localhost:8080"}/${shortId}`;

  const newLink = await prisma.link.create({
    data: {
      originalUrl: data.originalUrl,
      shortUrl,
    },
  });
  return newLink;
}

async function findLinkByShortId(slug: string): Promise<any | null> {
  const shortUrl = `${process.env.BACKEND_URL || "http://localhost:8080"}/${slug}`;

  return await prisma.link.findUnique({
    where: { shortUrl },
  });
}

export const linkService = {
  findLinks,
  createShortenedLink,
  findLinkByShortId,
};
