import { NextResponse } from 'next/server';
import { registry } from '@/registry';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    
    // Find the component in registry
    const component = registry.find((item) => item.name === name);
    
    if (!component) {
      return NextResponse.json(
        { error: 'Component not found' },
        { status: 404 }
      );
    }

    // Read the component files
    const filesWithContent = await Promise.all(
      component.files.map(async (file) => {
        const filePath = path.join(process.cwd(), file);
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          return {
            name: file,
            content,
          };
        } catch (error) {
          console.error(`Failed to read file: ${file}`, error);
          return {
            name: file,
            content: '',
          };
        }
      })
    );

    return NextResponse.json({
      ...component,
      files: filesWithContent,
    });
  } catch (error) {
    console.error('Registry API error:', error);
    return NextResponse.json(
      { error: 'Failed to load component' },
      { status: 500 }
    );
  }
}

