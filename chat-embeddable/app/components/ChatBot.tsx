"use client";

import { useState, useCallback } from "react";
import Chat from "./chat/Chat";
import { FeedbackForm } from "./feedback/FeedbackForm";
import { ExpandableChat } from "@/components/ui/chat/expandable-chat";
import { useMediaQuery } from 'react-responsive';
import { Feedback } from "../../models/feedback.model";

export default function ChatBot({chatUrl, feedbackUrl}: {chatUrl: string, feedbackUrl: string}) {

  const [feedbackMode, setFeedbackMode] = useState(false);
  const isSmallScreen = useMediaQuery({ query: `(max-width: 638px)` });

  const handleFeedbackSubmitted = useCallback(async (feedback: Feedback) => {
    try {
      const response = await fetch(feedbackUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback }),
      });

      if (!response.ok) {
        console.error('Failed to send feedback')
        return;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);

  return (
      <ExpandableChat size={isSmallScreen ? 'full' : 'xl'} position="bottom-right">
          { feedbackMode ? (
              <FeedbackForm returnToChat={() => setFeedbackMode(false)} onFeedbackSubmitted={handleFeedbackSubmitted}/>
            ) :
            <Chat handleFeedback={() => setFeedbackMode(true)} chatUrl={chatUrl}/>
          }
      </ExpandableChat>
  );
}
