import { RetrieveContextTool } from "./lib/retrieve-context.tool";
import { ChatTools } from "./models/chat-tools.model";
import { AmazonBedrockProvider, createAmazonBedrock } from "@ai-sdk/amazon-bedrock";
import { convertToCoreMessages, streamText } from "ai";
import { systemMessage } from './data/system-prompt.data'
import { APP_AWS_REGION, APP_MODEL_NAME } from "./config";
import { pipeline, Stream } from "stream";
import { ReadableStream } from 'stream/web'

// @ts-ignore
export const handler = awslambda.streamifyResponse(async (event: any, responseStream, context) => {
  try {
    const chatRequest = JSON.parse(event.body || '');
    const messages = chatRequest.messages;

    console.info(`api/chat: Request completion using ${APP_MODEL_NAME}`);

    // fixme need to make sure bedrock is using the correct provider now,
    // we need to be using catalyst NOT lcc
    const bedrockProvider: AmazonBedrockProvider = createAmazonBedrock({
      bedrockOptions: { region: APP_AWS_REGION },
    });

    // TODO: System message needs updating
    // TODO: Need to ingest some info into bedrock knowledge base.

    /* No need for guard rails yet
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
    */

    const result = streamText({
      model: bedrockProvider.languageModel(APP_MODEL_NAME),
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

    const vercelDataStream = result.toDataStream({
      getErrorMessage(error: any) {
        return error.message;
      },
    }) as unknown as ReadableStream;
    await pipeline(Stream.Readable.fromWeb(vercelDataStream), responseStream, () => {});
  } catch (error) {
    console.error("api/chat: ", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Something went wrong' }),
    };
  }
});
