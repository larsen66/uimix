"use client";

import { ComponentPreview } from './ComponentPreview';
import { ComponentCode } from './ComponentCode';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { Maximize2, X } from 'lucide-react';
import { useState } from 'react';

interface ComponentSideBySideLayoutProps {
  component: React.ComponentType;
  scale?: number;
  componentName: string;
  componentPath: string;
  tailwindConfig?: string;
  css?: string;
}

export const ComponentSideBySideLayout = ({ 
  component,
  scale = 0.7,
  componentName, 
  componentPath,
  tailwindConfig,
  css
}: ComponentSideBySideLayoutProps) => {
  const [fs, setFs] = useState<null | 'preview' | 'code'>(null);

  const Overlay = ({ children }: { children: React.ReactNode }) => (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
      <div className="relative w-full h-full">
        <button
          onClick={() => setFs(null)}
          className="group absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur border border-border rounded-md hover:bg-background/90 transition-colors transition-transform duration-150 ease-out hover:scale-105 active:scale-95"
          aria-label="Exit fullscreen"
          title="Exit fullscreen"
        >
          <X className="h-4 w-4 transition-transform duration-200 ease-out group-hover:rotate-90" />
        </button>
        <div className="w-full h-full overflow-auto p-6">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left side - Code and Installation */}
      <div className="space-y-6">
        {/* Installation Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Installation</h3>
          
          {/* CLI Installation */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">CLI Installation</h4>
            <DynamicCodeBlock
              lang="bash"
              code={`npx shadcn@latest add @uimix/${componentName}`}
            />
          </div>
          
          {/* Manual Installation */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Manual Installation</h4>
            <p className="text-sm text-muted-foreground">Copy and paste the following code:</p>
          </div>
        </div>

        {/* Code Section */}
        <div className="relative">
          <button
            onClick={() => setFs('code')}
            className="group absolute top-2 right-2 z-10 p-2 bg-background/80 backdrop-blur border border-border rounded-md hover:bg-background/90 transition-colors transition-transform duration-150 ease-out hover:scale-105 active:scale-95"
            aria-label="Enter fullscreen"
            title="Enter fullscreen"
          >
            <Maximize2 className="h-4 w-4 transition-transform duration-200 ease-out group-hover:scale-110 group-hover:rotate-3" />
          </button>
          <ComponentCode componentPath={componentPath} />
        </div>

        {/* Additional Configuration */}
        {(tailwindConfig || css) && (
          <div className="space-y-4">
            {tailwindConfig && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Tailwind Configuration</h4>
                <DynamicCodeBlock
                  lang="js"
                  code={tailwindConfig}
                  codeblock={{ title: 'tailwind.config.js' }}
                />
              </div>
            )}
            {css && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Global Styles</h4>
                <DynamicCodeBlock
                  lang="css"
                  code={css}
                  codeblock={{ title: 'app/global.css' }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right side - Preview */}
      <div className="relative">
        <button
          onClick={() => setFs('preview')}
          className="group absolute top-2 right-2 z-10 p-2 bg-background/80 backdrop-blur border border-border rounded-md hover:bg-background/90 transition-colors transition-transform duration-150 ease-out hover:scale-105 active:scale-95"
          aria-label="Enter fullscreen"
          title="Enter fullscreen"
        >
          <Maximize2 className="h-4 w-4 transition-transform duration-200 ease-out group-hover:scale-110 group-hover:rotate-3" />
        </button>
        <ComponentPreview component={component} scale={scale} hideFullscreen />
      </div>

      {/* Fullscreen Overlays */}
      {fs && (
        <Overlay>
          {fs === 'preview' && (
            <ComponentPreview component={component} scale={0.75} hideFullscreen />
          )}
          {fs === 'code' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Installation</h3>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">CLI Installation</h4>
                  <DynamicCodeBlock
                    lang="bash"
                    code={`npx shadcn@latest add @uimix/${componentName}`}
                  />
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Manual Installation</h4>
                  <p className="text-sm text-muted-foreground">Copy and paste the following code:</p>
                </div>
              </div>
              
              <ComponentCode componentPath={componentPath} />
              
              {(tailwindConfig || css) && (
                <div className="space-y-4">
                  {tailwindConfig && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">Tailwind Configuration</h4>
                      <DynamicCodeBlock
                        lang="js"
                        code={tailwindConfig}
                        codeblock={{ title: 'tailwind.config.js' }}
                      />
                    </div>
                  )}
                  {css && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">Global Styles</h4>
                      <DynamicCodeBlock
                        lang="css"
                        code={css}
                        codeblock={{ title: 'app/global.css' }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </Overlay>
      )}
    </div>
  );
};
