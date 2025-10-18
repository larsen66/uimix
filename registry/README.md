# uimix Registry

Beautiful and customizable UI components built with React and Tailwind CSS, compatible with shadcn/ui CLI v3.

## Quick Start

### Add the Registry

First, add the uimix registry to your project:

```bash
npx shadcn@latest add -r https://uimix.dev/r
```

This will add the registry to your `components.json` file.

### Install Components

Once the registry is added, you can install components using the namespace:

```bash
npx shadcn@latest add @uimix/cta-vertical-marquee
```

Or without adding the registry first:

```bash
npx shadcn@latest add https://uimix.dev/r/cta-vertical-marquee.json
```

## Available Components

### CTA Vertical Marquee

An engaging call-to-action section with a vertical marquee animation showcasing target audiences.

**Install:**

```bash
npx shadcn@latest add @uimix/cta-vertical-marquee
```

**Features:**
- ✨ Smooth vertical scrolling animation
- 🎨 Customizable speed and direction
- 📱 Fully responsive design
- 🌙 Dark mode support
- ♿ Accessibility-friendly with aria-hidden
- 🎯 Fade effect for smooth appearance
- 🖱️ Optional pause on hover

**Usage:**

```tsx
import CtaVerticalMarquee from '@/components/cta-vertical-marquee'

export default function Page() {
  return <CtaVerticalMarquee />
}
```

**Dependencies:**
- `class-variance-authority`
- `clsx`
- `tailwind-merge`

## Manual Installation

If you prefer not to use the CLI, you can manually install components:

### 1. Install dependencies

```bash
npm install class-variance-authority clsx tailwind-merge
```

### 2. Add the utilities helper

Create `lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 3. Update your Tailwind config

Add the animations to your `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      keyframes: {
        "marquee-vertical": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" }
        },
        "fade-in-up": {
          "0%": { 
            opacity: "0",
            transform: "translateY(20px)"
          },
          "100%": { 
            opacity: "1",
            transform: "translateY(0)"
          }
        }
      },
      animation: {
        "marquee-vertical": "marquee-vertical var(--duration, 30s) linear infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards"
      }
    }
  }
}
```

### 4. Copy the component code

Copy the component code from the [registry](https://uimix.dev/r/cta-vertical-marquee.json) to your project.

## Customization

All components support full customization through props and Tailwind CSS classes.

### CTA Vertical Marquee Props

The `VerticalMarquee` subcomponent accepts the following props:

- `children`: ReactNode - Content to display in the marquee
- `pauseOnHover`: boolean - Pause animation on hover (default: false)
- `reverse`: boolean - Reverse animation direction (default: false)
- `className`: string - Additional CSS classes
- `speed`: number - Animation speed in seconds (default: 30)

**Example:**

```tsx
<VerticalMarquee speed={15} pauseOnHover>
  {items.map((item, idx) => (
    <div key={idx} className="marquee-item">
      {item}
    </div>
  ))}
</VerticalMarquee>
```

## CSS Variables

The components use CSS variables for theming. Make sure to define these in your `globals.css`:

```css
@layer base {
  :root {
    --background: 0 0% 96%;
    --foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 93.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 82%;
    --accent-foreground: 0 0% 9%;
    --border: 0 0% 80%;
  }

  .dark {
    --background: 0 0% 7.04%;
    --foreground: 0 0% 92%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
    --secondary: 0 0% 12.9%;
    --secondary-foreground: 0 0% 92%;
    --muted: 0 0% 12.9%;
    --muted-foreground: 0 0% 70%;
    --accent: 0 0% 40.9%;
    --accent-foreground: 0 0% 90%;
    --border: 0 0% 40%;
  }
}
```

## Registry Structure

This registry follows the shadcn/ui v3 specification with namespaced components:

- **Namespace:** `@uimix`
- **Registry URL:** `https://uimix.dev/r`
- **Components:** Available at `https://uimix.dev/r/[component-name].json`

## Contributing

To add new components to the registry:

1. Create the component in `registry/default/[component-name]/`
2. Add the component definition to `registry.json`
3. Run `npm run registry:build`
4. Test with the shadcn CLI

## Support

For issues and feature requests, please visit our GitHub repository.

## License

MIT
