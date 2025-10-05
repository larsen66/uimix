import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface RegistryFile {
  path: string;
  type: string;
  content?: string;
}

interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  registryDependencies: string[];
  dependencies: string[];
  files: RegistryFile[];
}

interface Registry {
  $schema: string;
  name: string;
  homepage: string;
  items: RegistryItem[];
}

// Load the registry index
const registryPath = path.join(process.cwd(), 'public/r/index.json');
const registry: Registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const { slug } = await params;
    
    // If no slug or slug is "index.json", return the full registry
    if (!slug || slug.length === 0 || (slug.length === 1 && slug[0] === 'index.json')) {
      return NextResponse.json(registry);
    }

    // Extract component name from slug (e.g., ["hero-minimalism.json"])
    const fileName = slug[slug.length - 1];
    const componentName = fileName.replace('.json', '');
    
    // Find the component in registry
    const component = registry.items.find((item: RegistryItem) => item.name === componentName);
    
    if (!component) {
      return NextResponse.json(
        { error: 'Component not found' },
        { status: 404 }
      );
    }

    // Read the actual file contents
    const filesWithContent = await Promise.all(
      component.files.map(async (file: RegistryFile) => {
        const filePath = path.join(process.cwd(), file.path);
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          return {
            ...file,
            content,
          };
        } catch (error) {
          console.error(`Failed to read file: ${file.path}`, error);
          return {
            ...file,
            content: '',
          };
        }
      })
    );

    // Return component with file contents
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

