"use client";

import { Tabs, Tab } from 'fumadocs-ui/components/tabs';
import { ComponentCode } from './ComponentCode';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { Maximize2, X } from 'lucide-react';
import { useState } from 'react';

interface InstallationTabsProps {
  componentName: string;
  componentPath: string;
  tailwindConfig?: string;
  css?: string;
}

export const InstallationTabs = ({ 
  componentName, 
  componentPath,
  tailwindConfig,
  css
}: InstallationTabsProps) => {
  const [fs, setFs] = useState<null | 'cli' | 'manual'>(null);

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
    <Tabs items={['CLI', 'Manual']}>
      <Tab value="CLI">
        <div className="relative">
          <button
            onClick={() => setFs('cli')}
            className="group absolute top-2 right-2 z-10 p-2 bg-background/80 backdrop-blur border border-border rounded-md hover:bg-background/90 transition-colors transition-transform duration-150 ease-out hover:scale-105 active:scale-95"
            aria-label="Enter fullscreen"
            title="Enter fullscreen"
          >
            <Maximize2 className="h-4 w-4 transition-transform duration-200 ease-out group-hover:scale-110 group-hover:rotate-3" />
          </button>
          <div className="space-y-4">
            <p>Install the component using the shadcn CLI:</p>
            <DynamicCodeBlock
              lang="bash"
              code={`npx shadcn@latest add @uimix/${componentName}`}
            />
            <p>This will automatically add the component to your project.</p>
          </div>
        </div>
      </Tab>
      
      <Tab value="Manual">
        <div className="relative">
          <button
            onClick={() => setFs('manual')}
            className="group absolute top-2 right-2 z-10 p-2 bg-background/80 backdrop-blur border border-border rounded-md hover:bg-background/90 transition-colors transition-transform duration-150 ease-out hover:scale-105 active:scale-95"
            aria-label="Enter fullscreen"
            title="Enter fullscreen"
          >
            <Maximize2 className="h-4 w-4 transition-transform duration-200 ease-out group-hover:scale-110 group-hover:rotate-3" />
          </button>
          <div className="space-y-4">
            <p>Copy and paste the following code into your project:</p>
            <ComponentCode componentPath={componentPath} />
            {tailwindConfig && (
              <>
                <p>Make sure you have the required animations in your <code>tailwind.config.js</code>:</p>
                <DynamicCodeBlock
                  lang="js"
                  code={tailwindConfig}
                  codeblock={{ title: 'tailwind.config.js' }}
                />
              </>
            )}
            {css && (
              <>
                <p>Add the required classes to your global stylesheet:</p>
                <DynamicCodeBlock
                  lang="css"
                  code={css}
                  codeblock={{ title: 'app/global.css' }}
                />
              </>
            )}
          </div>
        </div>
      </Tab>

      {fs && (
        <Overlay>
          {fs === 'cli' && (
            <div className="space-y-6">
              <p className="text-lg">Install the component using the shadcn CLI:</p>
              <DynamicCodeBlock
                lang="bash"
                code={`npx shadcn@latest add @uimix/${componentName}`}
              />
              <p>This will automatically add the component to your project.</p>
            </div>
          )}
          {fs === 'manual' && (
            <div className="space-y-6">
              <p className="text-lg">Copy and paste the following code into your project:</p>
              <ComponentCode componentPath={componentPath} />
              {tailwindConfig && (
                <DynamicCodeBlock
                  lang="js"
                  code={tailwindConfig}
                  codeblock={{ title: 'tailwind.config.js' }}
                />
              )}
              {css && (
                <DynamicCodeBlock
                  lang="css"
                  code={css}
                  codeblock={{ title: 'app/global.css' }}
                />
              )}
            </div>
          )}
        </Overlay>
      )}
    </Tabs>
  );
};
