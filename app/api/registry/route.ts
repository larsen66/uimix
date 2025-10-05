import { NextResponse } from 'next/server';
import { registry } from '@/registry';

export async function GET() {
  try {
    return NextResponse.json({
      name: "uimix",
      version: "0.1.0",
      description: "A modern, beautiful, and highly customizable React component library",
      homepage: "https://uimix.dev",
      items: registry,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to load registry' },
      { status: 500 }
    );
  }
}

