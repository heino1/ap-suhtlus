import { getMarkdownContent } from '@/lib/content';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export function generateStaticParams() {
  return [
    { slug: 'esitlus_slaidid' },
  ];
}

export default function SlidesPage({ params }) {
  const { slug } = params;
  const fileName = `${slug}.md`;
  const { content } = getMarkdownContent(fileName);
  
  return (
    <div className="max-w-4xl mx-auto">
      <MarkdownRenderer content={content} />
    </div>
  );
}
