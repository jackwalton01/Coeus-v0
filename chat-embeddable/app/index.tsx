import { createRoot } from 'react-dom/client';
import ChatBot from "./components/ChatBot";
import { CONFIG } from "../config";

const renderChatBot = async (
  elementId: string,
  chatUrl: string, 
  feedbackUrl: string, 
  cdnUrl: string,
  styleSheetVersion?: string,
  useLocalStylesheets: boolean = false
) => {
  const container: HTMLElement | null = document.getElementById(elementId);

  CONFIG.CdnUrl = cdnUrl;

  if(!container) {
    console.error(`Container with id ${elementId} to render ChatBot into did not exist or was not found.`);
    return;
  }

  const styleSheetUrl = useLocalStylesheets 
    ? './style.css' 
    : `${CONFIG.CdnUrl}/style.css${styleSheetVersion ? '?versionId=' + styleSheetVersion : ''}`;

  const response = await fetch(styleSheetUrl);
  const cssText = await response.text();

  if (!container.shadowRoot) {
    const shadowRoot = container.attachShadow({mode: 'open'})
    const styleElement = document.createElement('style');
    styleElement.textContent = cssText;
    shadowRoot.appendChild(styleElement);

    /* 
      WORKAROUND:
      Currently Tailwind v4 uses @property css rules which are not supported in the shadowDOM
      the current workaround is to apply those rules to the parent document instead therefor,
      we are extracting only the @property rules from the compiled tailwind style sheet and
      applying them directly to `document.adoptedStyleSheets`
    */
    const styleSheet = styleElement.sheet as CSSStyleSheet;

    const propertyRules: CSSRule[] = [];
    const otherRules: CSSRule[] = [];

    Array.from(styleSheet.cssRules).forEach(rule => {
      if (rule instanceof CSSPropertyRule) {
        propertyRules.push(rule);
      } else {
        otherRules.push(rule);
      }
    });

    const propertyCss = propertyRules.map(rule => rule.cssText).join('\n');
    const otherCss = otherRules.map(rule => rule.cssText).join('\n');

    const propertyStyleSheet = new CSSStyleSheet();
    await propertyStyleSheet.replace(propertyCss);

    const restStyleSheet = new CSSStyleSheet();
    await restStyleSheet.replace(otherCss);

    // Apply the rest of the CSS to the shadow DOM
    shadowRoot.adoptedStyleSheets = [restStyleSheet];

    // Apply the @property rules to the document
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, propertyStyleSheet];

    const shadowContainer = document.createElement('div');
    shadowRoot.appendChild(shadowContainer);

    const root = createRoot(shadowContainer);

    root.render(<ChatBot chatUrl={chatUrl} feedbackUrl={feedbackUrl}/>);
  } else {
    console.warn('ChatBot Index: renderChatBot ran but a shadowRoot was already attached to the container');
  }
};

window.renderChatBot = renderChatBot;

// if (process.env.ENVIRONMENT === 'amplify' || process.env.ENVIRONMENT === 'local') { 
//   console.info('Index: Loading bot');

//   renderChatBot(
//     'chat-container',
//     process.env.APP_FUNCTION_URL as string,
//     process.env.APP_FEEDBACK_URL as string,
//     undefined,
//     undefined,
//     process.env.ENVIRONMENT === 'local'
//   );
// }

export default renderChatBot;