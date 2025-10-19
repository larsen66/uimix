"use client";

import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { ReactNode, useEffect, useState } from 'react';

interface ComponentCodeProps {
  componentPath?: string;
  title?: string;
  children?: ReactNode;
}

export const ComponentCode = ({ 
  componentPath, 
  title,
  children
}: ComponentCodeProps) => {
  const [code, setCode] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (children && typeof children === 'string') {
      setCode(children);
      return;
    }
    if (!componentPath) return;
    let mounted = true;
    fetch(`/api/code?path=${encodeURIComponent(componentPath)}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
        const data = await r.json();
        if (mounted) setCode(data.code ?? '');
      })
      .catch((e) => mounted && setErr(String(e)));
    return () => { mounted = false; };
  }, [children, componentPath]);

  if (err) return <div>Could not load component source: {err}</div>;
  if (!code) return <div>Loading source…</div>;

  return (
    <DynamicCodeBlock
      lang="tsx"
      code={code}
      codeblock={{ title: title || componentPath || 'Code' }}
    />
  );
};
