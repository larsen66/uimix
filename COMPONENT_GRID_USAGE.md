# ComponentGrid Usage

The `ComponentGrid` component is a reusable layout for displaying component galleries in a 2-column grid format.

## Import

```tsx
import { ComponentGrid } from '@/components/ComponentGrid';
```

## Usage

```tsx
<ComponentGrid 
  components={[
    {
      component: YourComponent,
      name: "Component Name",
      href: "/docs/category/component-page#anchor",
      scale: 0.25,        // Optional: default 0.25
      height: "h-80"      // Optional: default "h-80"
    },
    // ... more components
  ]}
/>
```

## Props

### ComponentGridItem

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `component` | `React.ComponentType` | ✅ | - | The React component to display |
| `name` | `string` | ✅ | - | Display name for the component |
| `href` | `string` | ✅ | - | Link to the component documentation |
| `scale` | `number` | ❌ | `0.25` | Scale factor for the component preview |
| `height` | `string` | ❌ | `"h-80"` | Tailwind height class for the container |

## Example: Creating a new category page

```mdx
---
title: Navigation
description: Navigation components for better user experience
---

import NavigationComponent1 from '@/registry/default/navigation-1/navigation-1';
import NavigationComponent2 from '@/registry/default/navigation-2/navigation-2';
import { ComponentGrid } from '@/components/ComponentGrid';

## Components

<ComponentGrid 
  components={[
    {
      component: NavigationComponent1,
      name: "Primary Navigation",
      href: "/docs/navigation/primary#main",
      scale: 0.3,
      height: "h-64"
    },
    {
      component: NavigationComponent2,
      name: "Sidebar Navigation",
      href: "/docs/navigation/sidebar#main",
      scale: 0.25,
      height: "h-80"
    }
  ]}
/>

## Primary Navigation

Description of the primary navigation component.

## Sidebar Navigation

Description of the sidebar navigation component.
```

## Features

- **Responsive**: 1 column on mobile, 2 columns on desktop
- **Hover effects**: Subtle shadow and border color changes
- **Consistent styling**: Matches the design system
- **Flexible sizing**: Customizable scale and height per component
- **Accessible**: Proper semantic structure and focus states
- **Greyish text**: Component names use `text-muted-foreground` for subtle appearance
