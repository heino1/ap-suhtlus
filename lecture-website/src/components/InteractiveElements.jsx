'use client';

import { useState, useEffect } from 'react';
import { Download, Copy, Check } from 'lucide-react';

const CodeBlock = ({ children, className }) => {
  const [copied, setCopied] = useState(false);
  const language = className ? className.replace(/language-/, '') : '';
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <div className="relative group">
      <pre className={`${className} rounded-md`}>
        <code>{children}</code>
      </pre>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={copyToClipboard}
          className="p-2 bg-gray-700 rounded-md text-white hover:bg-gray-600"
          aria-label="Copy code"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );
};

const DownloadButton = ({ fileName }) => {
  const handleDownload = () => {
    // This is a client-side only feature
    window.location.href = `/api/download?file=${fileName}`;
  };
  
  return (
    <button
      onClick={handleDownload}
      className="flex items-center px-4 py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      <Download size={16} className="mr-2" />
      Laadi alla {fileName}
    </button>
  );
};

const TableOfContents = ({ content }) => {
  const [toc, setToc] = useState([]);
  
  useEffect(() => {
    // Extract headings from content
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const headings = [];
    let match;
    
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const id = text.toLowerCase().replace(/[^\w]+/g, '-');
      
      headings.push({ level, text, id });
    }
    
    setToc(headings);
  }, [content]);
  
  if (toc.length < 3) {
    return null;
  }
  
  return (
    <div className="p-4 mb-6 border rounded-md dark:border-gray-700">
      <h2 className="text-lg font-bold mb-2">Sisukord</h2>
      <ul className="space-y-1">
        {toc.map((heading, index) => (
          <li 
            key={index} 
            className={`${heading.level === 1 ? 'font-bold' : heading.level === 2 ? 'ml-4' : 'ml-8'}`}
          >
            <a 
              href={`#${heading.id}`} 
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { CodeBlock, DownloadButton, TableOfContents };
