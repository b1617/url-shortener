import { FastifyReply, FastifyRequest } from "fastify";
import { linkService } from "./link.service";

async function listAllLinks(request: FastifyRequest, reply: FastifyReply) {
  const links = await linkService.findLinks();
  console.log(links);
  return reply.status(200).send(links);
}

async function shortenLink(request: FastifyRequest, reply: FastifyReply) {
  const link = await linkService.createShortenedLink(
    request.body as { originalUrl: string },
  );
  return reply.status(200).send(link);
}

export const linkController = {
  listAllLinks,
  shortenLink,
};
