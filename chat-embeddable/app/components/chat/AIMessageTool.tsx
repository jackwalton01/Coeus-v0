"use client";

import { ChatTools } from "@/models/chat-tools.model";
import { Message, ToolInvocation } from "ai";
import { AICitations } from "./AICitations";
import { Context } from "@/models/context.model";
import { Cog } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export function AIMessageTool({ message }: { message: Message }) {
  return message.toolInvocations?.map((toolInvocation: ToolInvocation) => {
    const toolCallId = toolInvocation.toolCallId;

    <Card key={toolCallId} className="tw:border tw:border-[#95C13D] tw:mt-6 tw:p-2">
      <CardHeader>
        <CardTitle className="tw:flex tw:flex-row tw:justify-between tw:items-center">
          <span>No relevant information found</span>
          <Cog className="tw:h-4 tw:w-4" />
        </CardTitle>
      </CardHeader>
    </Card>;

    if (toolInvocation.toolName !== ChatTools.RetrieveContext) {
      return null;
    }

    if (toolInvocation.state !== "result") {
      return (
        <Card key={toolCallId} className="tw:border tw:border-[#95C13D] tw:mt-6">
          <CardHeader>
            <CardTitle className="tw:flex tw:flex-row tw:justify-between tw:items-center">
              <span>Searching Knowledge Base...</span>
              <Cog className="tw:h-4 tw:w-4 tw:animate-spin" />
            </CardTitle>
          </CardHeader>
        </Card>
      );
    }

    const searchTerm = toolInvocation.args["question"];

    if (!searchTerm) {
      return null;
    }

    const citations = toolInvocation.state === "result" ? (toolInvocation.result as Context[]) : [];

    if (!citations.length) {
      return (
        <Card key={toolCallId} className="tw:border tw:border-[#95C13D] tw:mt-6">
          <CardHeader>
            <CardTitle className="tw:flex tw:flex-row tw:justify-between tw:items-center">
              <span>No relevant information found</span>
              <Cog className="tw:h-4 tw:w-4" />
            </CardTitle>
          </CardHeader>
        </Card>
      );
    }

    return <AICitations key={toolCallId} searchTerm={searchTerm} citations={citations} />;
  });
}
