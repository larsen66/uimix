import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get('path');
  if (!file) return NextResponse.json({ error: 'Missing path' }, { status: 400 });
  const filePath = path.join(process.cwd(), file);
  try {
    const code = await fs.readFile(filePath, 'utf8');
    return NextResponse.json({ code });
  } catch (e) {
    const err = e as unknown as { message?: string };
    return NextResponse.json({ error: err?.message ?? 'Not found' }, { status: 404 });
  }
}
