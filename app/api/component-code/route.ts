import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

const componentFiles: Record<string, string> = {
  'hero-minimalism': 'catalog/hero/hero-minimalism.tsx',
  'hero-monochrome-launch': 'catalog/hero/hero-monochrome-launch.tsx',
  'hero-orbit-deck': 'catalog/hero/hero-orbit-deck.tsx',
  'login-card': 'catalog/login-signup/login-card.tsx',
  'cta-horizontal-marquee': 'catalog/cta/cta-with-horizontal-marquee.tsx',
  'cta-vertical-marquee': 'catalog/cta/cta-with-vertical-marquee.tsx',
  'cta-vertical-marquee-left': 'catalog/cta/cta-with-vertical-marquee-left.tsx',
  'hero-with-marquee-large': 'catalog/cta/hero-with-marquee-large.tsx',
  'hero-with-marquee': 'catalog/cta/hero-with-marquee.tsx',
  'hero-with-marquee-mixed-font': 'catalog/cta/hero-with-marquee-mixed-font.tsx',
  'hero-with-marquee-reverse': 'catalog/cta/hero-with-marquee-reverse.tsx',
  'hero-with-video': 'catalog/cta/hero-with-video.tsx',
  'pricing-cards': 'catalog/pricing/pricing-cards.tsx',
  'processing-card': 'catalog/processing/processing-demo.tsx',
  'fallback-card-demo': 'catalog/cards/fallback-card-demo.tsx',
  'background-noise': 'catalog/backgrounds/background-noise.tsx',
  'squares-background': 'catalog/backgrounds/squares-background.tsx',
  'background-gradient-grid': 'catalog/backgrounds/background-gradient-grid.tsx',
  'blueprint-gradient-mesh': 'catalog/backgrounds/blueprint-gradient-mesh.tsx',
  'bento-features': 'catalog/features/bento-features.tsx',
  'bento-monochrome': 'catalog/features/bento-monochrome.tsx',
  'bento-monochrome-1': 'catalog/features/bento-monochrome-1.tsx',
  'faq-with-spiral': 'catalog/faq/faq-with-spiral.tsx',
  'faq-monochrome': 'catalog/faq/faq-monochrome.tsx',
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
