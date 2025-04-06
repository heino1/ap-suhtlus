import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');
  
  // Security check to prevent directory traversal
  if (!file || file.includes('..') || file.includes('/')) {
    return NextResponse.json({ error: 'Invalid file name' }, { status: 400 });
  }
  
  const filePath = path.join(process.cwd(), 'src/app/content', file);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
  
  // Read file content
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Set headers for file download
  const fileName = path.basename(filePath);
  
  return new NextResponse(fileContent, {
    headers: {
      'Content-Disposition': `attachment; filename=${fileName}`,
      'Content-Type': 'text/markdown; charset=utf-8'
    }
  });
}
