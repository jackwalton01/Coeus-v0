export {};

declare global {
  interface Window {
    renderChatBot: (elementId: string, apiUrl: string, feedbackUrl: string) => void;
  }
}