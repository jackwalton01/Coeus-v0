import {
  APP_AWS_REGION,
  APP_KNOWLEDGE_BASE_ID,
} from "../../config";
import { Context } from "../../models/context.model";
import {
  BedrockAgentRuntimeClient,
  KnowledgeBaseRetrievalResult,
  RetrieveCommand,
} from "@aws-sdk/client-bedrock-agent-runtime";

class ContextService {
  private client: BedrockAgentRuntimeClient;

  constructor(region: string) {
    if (!region) {
      console.error("Could not set up bedrock client. AWS_REGION parameter missing");
    }
    this.client = new BedrockAgentRuntimeClient({ region });
  }

  async fetchContext(input: string): Promise<Context[]> {
    const command = new RetrieveCommand({
      knowledgeBaseId: APP_KNOWLEDGE_BASE_ID,
      retrievalQuery: {
        text: input,
      },
      retrievalConfiguration: {
        vectorSearchConfiguration: {
          numberOfResults: 7,
        },
      },
    });

    const response = await this.client.send(command);

    if (!response.retrievalResults) {
      return [];
    }

    return response.retrievalResults
      .filter((chunk) => chunk.content?.text && chunk.location?.webLocation?.url)
      .map((chunk: KnowledgeBaseRetrievalResult) => ({
        source: chunk.location?.webLocation?.url as string,
        content: chunk.content?.text as string,
      }));
  }
}

export const contextService = new ContextService(APP_AWS_REGION);
