// For now, this component will be very simple.
// In a real app, you'd use a library like 'react-markdown' to render markdown.
// For simplicity in this scaffold, we'll render it as preformatted text.

interface CaseStudyDisplayProps {
  markdownContent: string;
}

export default function CaseStudyDisplay({ markdownContent }: CaseStudyDisplayProps) {
  // A proper markdown renderer should be used in a production app.
  // Example: import ReactMarkdown from 'react-markdown';
  // return <ReactMarkdown>{markdownContent}</ReactMarkdown>;
  
  // Basic rendering for demonstration:
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none bg-card p-6 rounded-lg shadow">
      <pre className="whitespace-pre-wrap break-words font-sans text-sm">
        {markdownContent}
      </pre>
    </div>
  );
}
