import { marked } from "marked";
import { memo, useMemo } from "react";
import ReactMarkdown, { Components } from "react-markdown";

const MarkdownComponents: Components = {
  h1: ({ children }) => <h1 className="tw:text-2xl tw:font-bold tw:mb-2">{children}</h1>,
  h2: ({ children }) => <h2 className="tw:text-xl tw:font-bold tw:mb-2">{children}</h2>,
  h3: ({ children }) => <h3 className="tw:text-lg tw:font-bold tw:mb-2">{children}</h3>,
  ul: ({ children }) => <ul className="tw:list-disc tw:pl-6 tw:mb-2 tw:space-y-1">{children}</ul>,
  ol: ({ children }) => <ol className="tw:list-decimal tw:pl-6 tw:mb-2 tw:space-y-1">{children}</ol>,
  p: ({ children }) => <p className="tw:my-2 tw:leading-relaxed">{children}</p>,
  a: ({ children, href }) => (
    <a href={href} className="tw:underline" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
};

function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown);
  return tokens.map((token) => token.raw);
}

const MemoizedMarkdownBlock = memo(
  ({ content }: { content: string }) => {
    return (
      <ReactMarkdown
        components={MarkdownComponents}
        className="tw:prose tw:prose-sm tw:max-w-none tw:[&>*:last-child]:mb-0"
      >
        {content}
      </ReactMarkdown>
    );
  },
  (prevProps, nextProps) => prevProps.content === nextProps.content
);

MemoizedMarkdownBlock.displayName = "MemoizedMarkdownBlock";

export const MemoizedMarkdownMessage = memo(
  ({ content, id }: { content: string; id: string }) => {
    const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);

    return (
      <>
        {blocks.map((block, index) => (
          <MemoizedMarkdownBlock content={block} key={`${id}-block_${index}`} />
        ))}
      </>
    );
  }
);

MemoizedMarkdownMessage.displayName = "MemoizedMarkdown";
