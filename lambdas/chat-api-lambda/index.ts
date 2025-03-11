import { RetrieveContextTool } from "./lib/retrieve-context.tool";
import { ChatTools } from "./models/chat-tools.model";
import { AmazonBedrockProvider, createAmazonBedrock } from "@ai-sdk/amazon-bedrock";
import { convertToCoreMessages, streamText } from "ai";
import { systemMessage } from './data/system-prompt.data'
import { APP_AWS_REGION, APP_GUARDRAIL_IDENTIFIER, APP_GUARDRAIL_VERSION, APP_MODEL_NAME } from "./config";
import { pipeline, Stream } from "stream";
import { ReadableStream } from 'stream/web'
import { trace } from "console";

// @ts-ignore
export const handler = awslambda.streamifyResponse(async (event: any, responseStream, context) => {
  try {
    const chatRequest = JSON.parse(event.body || '');
    const messages = chatRequest.messages;

    console.info(`api/chat: Request completion using ${APP_MODEL_NAME}`);

    const bedrockProvider: AmazonBedrockProvider = createAmazonBedrock({
      bedrockOptions: { region: APP_AWS_REGION },
    });

    const result = streamText({
      model: bedrockProvider.languageModel(APP_MODEL_NAME),
      providerOptions: {
        bedrock: {
          guardrailConfig: {
            guardrailIdentifier: APP_GUARDRAIL_IDENTIFIER,
            guardrailVersion: APP_GUARDRAIL_VERSION,
            streamProcessingMode: "async",
            trace: "enabled",
          },
        },
      },
      system: systemMessage,
      messages: convertToCoreMessages(messages),
      temperature: 0,
      tools: {
        [ChatTools.RetrieveContext]: RetrieveContextTool,
      }
    });

    result.providerMetadata.then((meta) => {
      meta && console.info('api/chat: guardrail invocation trace' + JSON.stringify(meta))
    })

    const vercelDataStream = result.toDataStream() as unknown as ReadableStream;
    await pipeline(Stream.Readable.fromWeb(vercelDataStream), responseStream, () => {});
  } catch (error) {
    console.error("api/chat: ", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Something went wrong' }),
    };
  }
});
