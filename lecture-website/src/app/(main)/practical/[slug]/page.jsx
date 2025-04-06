import { getMarkdownContent } from '@/lib/content';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export function generateStaticParams() {
  return [
    { slug: 'praktiline_naide_1_rest_api' },
    { slug: 'praktiline_naide_2_andmevahetuse_formaadid' },
    { slug: 'praktiline_naide_3_integratsioonistsenaarium' },
    { slug: 'praktiline_naide_4_ruhmatoo' },
  ];
}

export default function PracticalPage({ params }) {
  const { slug } = params;
  const fileName = `${slug}.md`;
  const { content } = getMarkdownContent(fileName);
  
  return (
    <div className="max-w-4xl mx-auto">
      <MarkdownRenderer content={content} />
    </div>
  );
}
