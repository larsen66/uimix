import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

const componentFiles: Record<string, string> = {
  'cta-horizontal-marquee': 'cta-with-horizontal-marquee.tsx',
  'cta-vertical-marquee': 'cta-with-vertical-marquee.tsx',
  'cta-vertical-marquee-left': 'cta-with-vertical-marquee-left.tsx',
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (!id || !componentFiles[id]) {
    return NextResponse.json({ error: 'Component not found' }, { status: 404 });
  }

  try {
    const filePath = join(process.cwd(), 'components', componentFiles[id]);
    const code = await readFile(filePath, 'utf-8');
    
    return NextResponse.json({ code });
  } catch (error) {
    console.error('Error reading component file:', error);
    return NextResponse.json({ error: 'Failed to read component' }, { status: 500 });
  }
}
