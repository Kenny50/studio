// In a real app, you'd use a library like 'react-markdown' to render markdown with proper styling.
// For simplicity here, we'll render it as preformatted text, similar to CaseStudyDisplay.
// Consider using a markdown-to-HTML library like 'marked' or 'react-markdown' for rich text.

interface ArticleDisplayProps {
  markdownContent: string;
}

export default function ArticleDisplay({ markdownContent }: ArticleDisplayProps) {
  // Basic rendering for demonstration:
  // For a production app, use a dedicated markdown renderer:
  // import ReactMarkdown from 'react-markdown';
  // return <ReactMarkdown className="prose prose-lg dark:prose-invert max-w-none">{markdownContent}</ReactMarkdown>;
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none bg-card p-6 sm:p-8 rounded-lg shadow">
      {/* Using a simpler approach for now to avoid Tailwind prose plugin complexities if not set up */}
      {/* This will render markdown as plain text with line breaks. */}
      <pre className="whitespace-pre-wrap break-words font-sans text-base leading-relaxed">
        {markdownContent}
      </pre>
    </div>
  );
}
