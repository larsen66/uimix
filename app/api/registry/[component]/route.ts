import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET(
  request: Request,
  { params }: { params: { component: string } }
) {
  try {
    const componentName = params.component;
    const registryPath = join(process.cwd(), 'registry', 'components', `${componentName}.json`);
    
    const componentData = readFileSync(registryPath, 'utf-8');
    const component = JSON.parse(componentData);
    
    return NextResponse.json(component);
  } catch (error) {
    return NextResponse.json(
      { error: 'Component not found' },
      { status: 404 }
    );
  }
}

