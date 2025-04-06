import { getMarkdownContent } from '@/lib/content';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export function generateStaticParams() {
  return [
    { slug: 'loengu_struktuur' },
    { slug: 'README' },
  ];
}

export default function OtherPage({ params }) {
  const { slug } = params;
  const fileName = `${slug}.md`;
  const { content } = getMarkdownContent(fileName);
  
  return (
    <div className="max-w-4xl mx-auto">
      <MarkdownRenderer content={content} />
    </div>
  );
}
