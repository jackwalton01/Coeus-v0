import { z } from "zod";

export const RefineQuerySchema = z.object({
  query: z.string(),
});

export type RefineQuery = z.infer<typeof RefineQuerySchema>;
