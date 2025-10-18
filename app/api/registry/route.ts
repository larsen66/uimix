import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const registryPath = join(process.cwd(), 'public', 'r', 'index.json');
    const registryData = readFileSync(registryPath, 'utf-8');
    const registry = JSON.parse(registryData);
    
    return NextResponse.json(registry);
  } catch {
    return NextResponse.json(
      { error: 'Registry not found' },
      { status: 404 }
    );
  }
}

