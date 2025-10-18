import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET(
  request: Request,
  context: { params: Promise<{ component: string }> }
) {
  try {
    const { component: componentName } = await context.params;
    const registryPath = join(process.cwd(), 'public', 'r', `${componentName}.json`);
    
    const componentData = readFileSync(registryPath, 'utf-8');
    const component = JSON.parse(componentData);
    
    return NextResponse.json(component);
  } catch {
    return NextResponse.json(
      { error: 'Component not found' },
      { status: 404 }
    );
  }
}

