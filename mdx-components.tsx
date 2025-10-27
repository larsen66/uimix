import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ComponentSideBySideLayout } from '@/components/ComponentSideBySideLayout';
import { ComponentWithInstallation } from '@/components/ComponentWithInstallation';
import { ComponentPreview } from '@/components/ComponentPreview';
import { ComponentCode } from '@/components/ComponentCode';

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ComponentSideBySideLayout,
    ComponentWithInstallation,
    ComponentPreview,
    ComponentCode,
    ...components,
  };
}
