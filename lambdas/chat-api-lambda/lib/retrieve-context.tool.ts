import { tool } from "ai";
import { z } from "zod";
import { contextService } from "./services/context.service";
import { Context } from "../models/context.model";

export const RetrieveContextTool = tool({
  description: "Retrieve context information that must be used to answer the users questions. Do not reflect on the quality of the returned search results.",
  parameters: z.object({
    question: z
      .string()
      .describe(
        "Refined question that keeps the original meaning and can be used to search for related information to answer the users question"
      ),
  }),
  execute: async ({ question }) => {
    console.info(`Retrieving knowledge on ${question}`);

    try {
      const context: Context[] = await contextService.fetchContext(question);

      if (!context.length) {
        return "No information was found on this topic";
      }

      return context;
    } catch (error) {
      console.error(error);
      return "There was an error retrieving from the context";
    }
  },
});
