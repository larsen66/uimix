"use client";

import { ComponentPreview } from '@/components/ComponentPreview';
import Link from 'next/link';

interface ComponentGridItem {
  component: React.ComponentType;
  name: string;
  href: string;
  scale?: number;
  height?: string;
}

interface ComponentGridProps {
  components: ComponentGridItem[];
}

export const ComponentGrid = ({ components }: ComponentGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      {components.map((item, index) => (
        <div key={index} className="group">
          <Link href={item.href} className="block no-underline">
            <div className="border border-border rounded-lg overflow-hidden bg-card transition-all duration-200 group-hover:shadow-md group-hover:border-border/80">
              <div 
                className={`${item.height || 'h-80'} relative bg-background flex items-center justify-center`}
              >
                <ComponentPreview 
                  component={item.component} 
                  scale={item.scale || 0.25} 
                  hideFullscreen={true} 
                />
              </div>
            </div>
          </Link>
          <h3 className="text-sm font-medium text-muted-foreground mt-3 group-hover:text-foreground/60 transition-colors">
            {item.name}
          </h3>
        </div>
      ))}
    </div>
  );
};
