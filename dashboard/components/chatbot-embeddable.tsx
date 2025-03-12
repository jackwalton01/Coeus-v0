import { useEffect } from "react";

export function ChatbotEmbeddable() {
    useEffect(() => {
        const script = document.createElement('script');
        // script.src = 'https://<INSERT NEW CLOUDFRONT HERE>.cloudfront.net/chatbot.bundle.js';
        script.src = '/chatbot.bundle.js';
        script.async = true;
        script.onload = () => {
          if (window.renderChatBot) {

            // TODO: we need to get these function URLs sorted out. We don't need a chat URL for now as feedback is disabled
            window.renderChatBot(
              'chat-container',
              '', // process.env.NEXT_PUBLIC_CHAT_URL as string
              process.env.NEXT_PUBLIC_FEEDBACK_URL as string,
              undefined,
              undefined,
              true,
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