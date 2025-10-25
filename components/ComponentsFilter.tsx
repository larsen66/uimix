"use client";

import React, { useState } from 'react';
import { ComponentGrid } from '@/components/ComponentGrid';

const categories = [
  'Popular',
  'Hero',
  'Bento',
  'Call to Action',
  'FAQ',
  'Login',
  'Pricing Cards',
  'Background',
  'Processing Card',
  'Fallback Card',
] as const;

type Category = typeof categories[number];

interface ComponentData {
  component: React.ComponentType;
  name: string;
  href: string;
  height?: string;
  scale?: number;
}

interface ComponentsFilterProps {
  heroComponents: ComponentData[];
  bentoComponents: ComponentData[];
  ctaComponents: ComponentData[];
  faqComponents: ComponentData[];
  loginComponents: ComponentData[];
  pricingComponents: ComponentData[];
  backgroundComponents: ComponentData[];
  processingComponents: ComponentData[];
  fallbackComponents: ComponentData[];
}

export function ComponentsFilter({
  heroComponents,
  bentoComponents,
  ctaComponents,
  faqComponents,
  loginComponents,
  pricingComponents,
  backgroundComponents,
  processingComponents,
  fallbackComponents,
}: ComponentsFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Popular');

  const isVisible = (cat: Category | Exclude<Category, 'Popular'>) =>
    selectedCategory === 'Popular' || selectedCategory === cat;

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={
              `px-3 py-1 rounded-full text-sm border transition-colors` +
              (selectedCategory === cat
                ? ' bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                : ' bg-transparent text-foreground border-border hover:bg-muted')
            }
            aria-pressed={selectedCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {isVisible('Popular') && (
        <section>
          <h2 className="text-xl font-semibold tracking-tight">Popular Components</h2>
          <div className="mt-4">
            <ComponentGrid components={[
              ...heroComponents.slice(0, 2),
              ...bentoComponents.slice(0, 1),
              ...ctaComponents.slice(0, 2),
              ...faqComponents.slice(0, 1),
              ...pricingComponents.slice(0, 1),
              ...backgroundComponents.slice(0, 1),
            ]} />
          </div>
        </section>
      )}

      {isVisible('Hero') && (
        <section>
          <h2 className="text-xl font-semibold tracking-tight">Hero Components</h2>
          <div className="mt-4">
            <ComponentGrid components={heroComponents} />
          </div>
        </section>
      )}

      {isVisible('Bento') && (
        <section>
          <h2 className="text-xl font-semibold tracking-tight">Bento Grid Components</h2>
          <div className="mt-4">
            <ComponentGrid components={bentoComponents} />
          </div>
        </section>
      )}

      {isVisible('Call to Action') && (
        <section>
          <h2 className="text-xl font-semibold tracking-tight">Call to Action Components</h2>
          <div className="mt-4">
            <ComponentGrid components={ctaComponents} />
          </div>
        </section>
      )}

      {isVisible('FAQ') && (
        <section>
          <h2 className="text-xl font-semibold tracking-tight">FAQ Components</h2>
          <div className="mt-4">
            <ComponentGrid components={faqComponents} />
          </div>
        </section>
      )}

      {isVisible('Login') && (
        <section>
          <h2 className="text-xl font-semibold tracking-tight">Login Components</h2>
          <div className="mt-4">
            <ComponentGrid components={loginComponents} />
          </div>
        </section>
      )}

      {isVisible('Pricing Cards') && (
        <section>
          <h2 className="text-xl font-semibold tracking-tight">Pricing Cards Components</h2>
          <div className="mt-4">
            <ComponentGrid components={pricingComponents} />
          </div>
        </section>
      )}

      {isVisible('Background') && (
        <section>
          <h2 className="text-xl font-semibold tracking-tight">Background Components</h2>
          <div className="mt-4">
            <ComponentGrid components={backgroundComponents} />
          </div>
        </section>
      )}

      {isVisible('Processing Card') && (
        <section>
          <h2 className="text-xl font-semibold tracking-tight">Processing Card Components</h2>
          <div className="mt-4">
            <ComponentGrid components={processingComponents} />
          </div>
        </section>
      )}

      {isVisible('Fallback Card') && (
        <section>
          <h2 className="text-xl font-semibold tracking-tight">Fallback Card Components</h2>
          <div className="mt-4">
            <ComponentGrid components={fallbackComponents} />
          </div>
        </section>
      )}
    </div>
  );
}
