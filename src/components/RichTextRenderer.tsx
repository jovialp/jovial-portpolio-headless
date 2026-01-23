import { LexicalNode, RichTextContent } from "@/types";
import React, { JSX } from "react";

/* -------------------------------------------------
   Types (Payload Lexical)
-------------------------------------------------- */

type RichTextRendererProps = {
  readonly content?: RichTextContent | null;
  readonly className?: string;
};

/* -------------------------------------------------
   Lexical Text Format Bitmask
-------------------------------------------------- */

const TEXT_FORMAT = {
  BOLD: 1,
  ITALIC: 2,
  UNDERLINE: 4,
  STRIKETHROUGH: 8,
  CODE: 16,
  SUBSCRIPT: 32,
  SUPERSCRIPT: 64,
};

/* -------------------------------------------------
   Public Component
-------------------------------------------------- */

export function RichTextRenderer({
  content,
  className = "",
}: RichTextRendererProps) {
  if (!content?.root?.children?.length) return null;

  return (
    <div className={`${className}`}>
      {content.root.children.map((node, index) => renderNode(node, index))}
    </div>
  );
}

/* -------------------------------------------------
   Node Renderer
-------------------------------------------------- */

function renderNode(node: LexicalNode, key: number): React.ReactNode {
  switch (node.type) {
    /* ---------- Block nodes ---------- */

    case "paragraph":
      return (
        <p key={key} className="body-md">
          {renderChildren(node)}
        </p>
      );

    case "heading": {
      const Tag = (node.tag || "h2") as keyof JSX.IntrinsicElements;
      const sizeMap: Record<string, string> = {
        h1: "heading-xl",
        h2: "heading-lg",
        h3: "heading-md",
        h4: "heading-sm",
      };

      return (
        <Tag key={key} className={sizeMap[node.tag ?? "h2"] ?? "heading-md"}>
          {renderChildren(node)}
        </Tag>
      );
    }

    case "quote":
      return (
        <blockquote
          key={key}
          className="border-l-2 border-primary pl-6 italic text-muted-foreground"
        >
          {renderChildren(node)}
        </blockquote>
      );

    case "list": {
      const ListTag = node.tag === "ol" ? "ol" : "ul";
      return (
        <ListTag key={key} className="ml-6 list-disc space-y-2">
          {renderChildren(node)}
        </ListTag>
      );
    }

    case "listitem":
      return <li key={key}>{renderChildren(node)}</li>;

    case "code":
      return (
        <pre
          key={key}
          className="my-6 overflow-x-auto rounded-md bg-muted p-4 font-mono text-sm"
        >
          <code>{renderChildren(node)}</code>
        </pre>
      );

    /* ---------- Inline nodes ---------- */

    case "link":
      return (
        <a
          key={key}
          href={node.url}
          target={node.target ?? "_blank"}
          rel={node.rel ?? "noopener noreferrer"}
          className="link-underline"
        >
          {renderChildren(node)}
        </a>
      );

    case "linebreak":
      return <br key={key} />;

    case "text":
      return renderText(node, key);

    /* ---------- Fallback ---------- */

    default:
      return <React.Fragment key={key}>{renderChildren(node)}</React.Fragment>;
  }
}

/* -------------------------------------------------
   Helpers
-------------------------------------------------- */

function renderChildren(node: LexicalNode) {
  return node.children?.map((child, index) => renderNode(child, index));
}

function renderText(node: LexicalNode, key: number): React.ReactNode {
  let content: React.ReactNode = node.text ?? "";

  if (node.format) {
    if (node.format & TEXT_FORMAT.CODE) {
      content = (
        <code className="rounded text-foreground px-1 py-0.5 font-mono text-sm">
          {content}
        </code>
      );
    }

    if (node.format & TEXT_FORMAT.BOLD) {
      content = <strong>{content}</strong>;
    }

    if (node.format & TEXT_FORMAT.ITALIC) {
      content = <em>{content}</em>;
    }

    if (node.format & TEXT_FORMAT.UNDERLINE) {
      content = <u>{content}</u>;
    }

    if (node.format & TEXT_FORMAT.STRIKETHROUGH) {
      content = <s>{content}</s>;
    }

    if (node.format & TEXT_FORMAT.SUBSCRIPT) {
      content = <sub>{content}</sub>;
    }

    if (node.format & TEXT_FORMAT.SUPERSCRIPT) {
      content = <sup>{content}</sup>;
    }
  }

  return <React.Fragment key={key}>{content}</React.Fragment>;
}
