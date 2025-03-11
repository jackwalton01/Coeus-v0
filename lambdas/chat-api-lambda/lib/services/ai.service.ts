import { APP_AWS_REGION, APP_MODEL_NAME } from "../../config";
import { RefineQuerySchema } from "../../models/refine-query.schema";
import { AmazonBedrockProvider, createAmazonBedrock } from "@ai-sdk/amazon-bedrock";
import { generateObject, LanguageModel } from "ai";

export class AIService {
  private provider: AmazonBedrockProvider;
  private model: LanguageModel;

  constructor(region: string, modelName: string) {
    this.provider = createAmazonBedrock({
      bedrockOptions: {
        region: region,
      },
    });

    this.model = this.provider(modelName);
  }

  async refineQuery(query: string): Promise<string> {
    const result = await generateObject({
      model: this.model,
      system: `
        Transform the user’s message into a short, focused search query.
        You must not provide explanations or additional text.

        Guidelines:
        1. Take the user’s input (usually a full sentence or question).
        2. Identify the essential keywords and context needed to find the right information for semantic search.
        3. Output a single succinct phrase or set of keywords that accurately captures the user’s intent.
        4. Return only the refined search query, and nothing else.
        `,
      schema: RefineQuerySchema,
      prompt: query,
    });

    return result.object.query;
  }
}

export const aiService = new AIService(
  APP_AWS_REGION,
  APP_MODEL_NAME
);
