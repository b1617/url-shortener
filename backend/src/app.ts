import dotenv from "dotenv";
dotenv.config({ path: `./.env.development` });

import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import linkRoutes from "./modules/link/link.route";

const server = async () => {
  const port = process.env.PORT || 8080;
  const app = fastify();
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);
  app.withTypeProvider<ZodTypeProvider>();

  app.register(cors, {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  });
  app.register(helmet);

  // Health check endpoint
  app.get("/ping", async (request, reply) => {
    return { message: "pxong", timestamp: new Date().toISOString() };
  });

  // Routes
  app.register(linkRoutes, { prefix: "/api/links" });
  try {
    await app.listen({ port: +port, host: "0.0.0.0" });
    console.info(`✅ Server is running on http://0.0.0.0:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
  return app;
};

const main = server();
export default main;
