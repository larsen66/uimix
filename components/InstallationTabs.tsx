import { Tabs, Tab } from 'fumadocs-ui/components/tabs';
import { ComponentCode } from './ComponentCode';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';

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
  return (
    <Tabs items={['CLI', 'Manual']}>
      <Tab value="CLI">
        <div className="space-y-4">
          <p>Install the component using the shadcn CLI:</p>
          <DynamicCodeBlock
            lang="bash"
            code={`npx shadcn@latest add @uimix/${componentName}`}
          />
          <p>This will automatically add the component to your project.</p>
        </div>
      </Tab>
      
      <Tab value="Manual">
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
      </Tab>
    </Tabs>
  );
};
