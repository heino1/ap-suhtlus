import { getMarkdownContent } from '@/lib/content';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export function generateStaticParams() {
  return [
    { slug: '1_sissejuhatus' },
    { slug: '2_suhtlemise_pohimotted' },
    { slug: '3_andmevahetuse_protokollid' },
    { slug: '4_integratsioonimustrid' },
    { slug: '5_turvaaspektid' },
    { slug: '6_kaasaegsed_trendid' },
  ];
}

export default function TheoryPage({ params }) {
  const { slug } = params;
  const fileName = `${slug}.md`;
  const { content } = getMarkdownContent(fileName);
  
  return (
    <div className="max-w-4xl mx-auto">
      <MarkdownRenderer content={content} />
    </div>
  );
}
