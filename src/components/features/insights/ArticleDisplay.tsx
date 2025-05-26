import ReactMarkdown from 'react-markdown';

interface ArticleDisplayProps {
  markdownContent: string;
}

export default function ArticleDisplay({ markdownContent }: ArticleDisplayProps) {
  return (
    <div className="bg-card p-6 sm:p-8 rounded-lg shadow">
      <ReactMarkdown 
        className="prose prose-lg dark:prose-invert max-w-none 
                   prose-headings:font-bold prose-headings:text-foreground 
                   prose-p:text-muted-foreground 
                   prose-a:text-primary hover:prose-a:text-primary/80
                   prose-strong:text-foreground
                   prose-blockquote:border-primary prose-blockquote:text-muted-foreground
                   prose-code:bg-muted prose-code:text-foreground prose-code:p-1 prose-code:rounded-sm
                   prose-li:marker:text-primary"
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
}
