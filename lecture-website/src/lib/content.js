// This file must be used in a server component or API route
import fs from 'fs';
import path from 'path';

// Define the content directory
const contentDirectory = path.join(process.cwd(), 'src/app/content');

// Function to get all markdown files
export function getMarkdownFiles() {
  const fileNames = fs.readdirSync(contentDirectory);
  return fileNames.filter(fileName => fileName.endsWith('.md'));
}

// Function to get content for a specific file
export function getMarkdownContent(fileName) {
  const filePath = path.join(contentDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return {
    fileName,
    content: fileContent,
  };
}

// Function to get all content
export function getAllContent() {
  const fileNames = getMarkdownFiles();
  const allContent = fileNames.map(fileName => {
    return getMarkdownContent(fileName);
  });
  
  return allContent;
}

// Function to categorize content
export function getCategorizedContent() {
  const allContent = getAllContent();
  
  const categories = {
    theory: [],
    practical: [],
    slides: [],
    other: []
  };
  
  allContent.forEach(item => {
    if (item.fileName.match(/^\d+_/)) {
      categories.theory.push(item);
    } else if (item.fileName.startsWith('praktiline_naide_')) {
      categories.practical.push(item);
    } else if (item.fileName === 'esitlus_slaidid.md') {
      categories.slides.push(item);
    } else {
      categories.other.push(item);
    }
  });
  
  // Sort theory content by number
  categories.theory.sort((a, b) => {
    const numA = parseInt(a.fileName.split('_')[0]);
    const numB = parseInt(b.fileName.split('_')[0]);
    return numA - numB;
  });
  
  // Sort practical content by number
  categories.practical.sort((a, b) => {
    const numA = parseInt(a.fileName.split('_')[2]);
    const numB = parseInt(b.fileName.split('_')[2]);
    return numA - numB;
  });
  
  return categories;
}

// Function to get content metadata
export function getContentMetadata() {
  const categories = getCategorizedContent();
  
  return {
    theory: categories.theory.map(item => ({
      fileName: item.fileName,
      title: getTitleFromContent(item.content) || formatFileName(item.fileName),
      path: `/theory/${item.fileName.replace('.md', '')}`
    })),
    practical: categories.practical.map(item => ({
      fileName: item.fileName,
      title: getTitleFromContent(item.content) || formatFileName(item.fileName),
      path: `/practical/${item.fileName.replace('.md', '')}`
    })),
    slides: categories.slides.map(item => ({
      fileName: item.fileName,
      title: getTitleFromContent(item.content) || formatFileName(item.fileName),
      path: `/slides/${item.fileName.replace('.md', '')}`
    })),
    other: categories.other.map(item => ({
      fileName: item.fileName,
      title: getTitleFromContent(item.content) || formatFileName(item.fileName),
      path: `/other/${item.fileName.replace('.md', '')}`
    }))
  };
}

// Helper function to extract title from content
function getTitleFromContent(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1] : null;
}

// Helper function to format file name as title
function formatFileName(fileName) {
  return fileName
    .replace('.md', '')
    .replace(/_/g, ' ')
    .replace(/^\d+\s+/, '')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
