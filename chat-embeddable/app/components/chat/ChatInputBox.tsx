"use client";

import { ArrowRightCircleIcon } from "lucide-react";
import { useEffect, useRef } from "react";

export function ChatInputBox({
  handleSubmit,
  input,
  handleInputChange,
  handleFeedback,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  input: string;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleFeedback: (event: React.MouseEvent<HTMLButtonElement>) => void
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      const maximumRows = 3;
      const rowPxHeight = 24;

      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const newHeight = Math.min(Math.max(scrollHeight, rowPxHeight), maximumRows * rowPxHeight);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input, textareaRef]);

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleFeedback(e);
  }

  return (
    <div className="tw:w-full">
      <form
        className="tw:flex tw:flex-row tw:mb-2 tw:border! tw:border-gray-300! tw:rounded-lg tw:shadow-lg tw:bg-white tw:overflow-hidden tw:transition-all tw:duration-200 tw:ease-in-out tw:focus-within:ring-2! tw:focus-within:ring-blue-500! tw:focus-within:border-transparent!"
        onSubmit={handleSubmit}
      >
        <textarea
          ref={textareaRef}
          className="tw:flex-grow tw:p-3 tw:resize-none tw:overflow-hidden tw:focus:outline-none!"
          value={input}
          placeholder="Ask a question"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button
          className="tw:p-3 tw:text-gray-600! tw:bg-transparent! tw:hover:text-blue-600! tw:transition-colors tw:duration-200 tw:ease-in-out"
          type="submit"
        >
          <ArrowRightCircleIcon className="tw:w-6 tw:h-6" />
        </button>
      </form>
      <p className="tw:text-xs! tw:text-gray-500 tw:mt-1 tw:text-center">
        Chatbot may make mistakes. Please check important information.
        <br/>
        {/* <button className="tw:text-xs! tw:text-blue-500! tw:underline tw:bg-transparent! tw:border-none! tw:p-0! tw:m-0! tw:cursor-pointer" onClick={handleOnClick}>
            Want to provide feedback?
        </button> */}
      </p>
      
    </div>
  );
}
