import { NextResponse } from 'next/server';
import registry from '@/registry/index.json';

export async function GET() {
  return NextResponse.json(registry);
}

