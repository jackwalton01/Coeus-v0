"use client"

import { NEXT_PUBLIC_CDN_URL, NEXT_PUBLIC_FUNCTION_URL } from "@/config";
import { useEffect } from "react";


// FIXME: this also gets ran twice..?
export function ChatbotEmbeddable() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `${NEXT_PUBLIC_CDN_URL}/chatbot.bundle.js`;
    script.async = true;
    script.onload = () => {
      if (window.renderChatBot) {
        window.renderChatBot(
          'chat-container',
          NEXT_PUBLIC_FUNCTION_URL,
          '', // process.env.NEXT_PUBLIC_FEEDBACK_URL as string
          NEXT_PUBLIC_CDN_URL,
        );
      } else {
        console.error('renderChatBot function is not available.');
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div id="chat-container">
      {/* Chat bot will be rendered here */}
    </div>
  );
}