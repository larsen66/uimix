import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import fs from 'node:fs';
import path from 'node:path';

interface ComponentCodeProps {
  componentPath: string;
  title?: string;
}

export const ComponentCode = ({ 
  componentPath, 
  title 
}: ComponentCodeProps) => {
  const filePath = path.join(process.cwd(), componentPath);
  let code = '';
  try {
    code = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    code = `/* Failed to load ${filePath}: ${String(e)} */`;
  }
  
  if (!code || code.trim().length === 0) {
    return <div>Could not load component source.</div>;
  }
  
  return (
    <DynamicCodeBlock
      lang="tsx"
      code={code}
      codeblock={{ title: title || componentPath }}
    />
  );
};
