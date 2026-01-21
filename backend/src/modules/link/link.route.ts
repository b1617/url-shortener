import { FastifyInstance } from "fastify";
import { CreateShortenLinkRequestSchema, LinkSchema } from "shared-types";
import { linkController } from "./link.controller";

async function linkRoutes(router: FastifyInstance) {
  router.get("/", {
    schema: {
      response: {
        200: LinkSchema.array(),
      },
    },
    handler: linkController.listAllLinks,
  });

  router.post("/", {
    schema: {
      response: {
        200: LinkSchema,
      },
      payload: {
        schema: CreateShortenLinkRequestSchema,
      },
    },
    handler: linkController.shortenLink,
  });
}

export default linkRoutes;
