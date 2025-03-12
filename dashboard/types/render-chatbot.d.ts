export {};

declare global {
  interface Window {
    renderChatBot: (
      elementId: string,
      functionUrl: string,
      feedbackUrl: string,
      cdnUrl: string = '',
      styleSheetVersion?: string,
      useLocalStylesheets: boolean = false
    ) => void;
  }
}