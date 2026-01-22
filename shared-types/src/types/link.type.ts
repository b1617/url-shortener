import { z } from "zod";

export const LinkSchema = z.object({
  id: z.number(),
  uid: z.string(),
  originalUrl: z.url(),
  shortUrl: z.url(),
  createdAt: z.date(),
});

export const CreateShortenLinkRequestSchema = LinkSchema.pick({
  originalUrl: true,
});

export type Link = z.infer<typeof LinkSchema>;
export type CreateShortenLinkRequest = z.infer<
  typeof CreateShortenLinkRequestSchema
>;
