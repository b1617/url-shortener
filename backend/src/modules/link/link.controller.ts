import { FastifyReply, FastifyRequest } from "fastify";
import { linkService } from "./link.service";

async function listAllLinks(request: FastifyRequest, reply: FastifyReply) {
  const links = await linkService.findLinks();
  return reply.status(200).send(links);
}

async function shortenLink(request: FastifyRequest, reply: FastifyReply) {
  const link = await linkService.createShortenedLink(
    request.body as { originalUrl: string },
  );
  return reply.status(200).send(link);
}

async function redirectToOriginalUrl(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { shortId } = request.params as { shortId: string };
  const link = await linkService.findLinkByShortId(shortId);
  if (link) {
    return reply.status(301).redirect(link.originalUrl);
  }
  return reply
    .status(302)
    .redirect(process.env.FRONTEND_URL || "http://localhost:5173");
}

export const linkController = {
  listAllLinks,
  shortenLink,
  redirectToOriginalUrl,
};
