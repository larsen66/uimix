# Using uimix Registry with shadcn CLI v3

## Quick Start Guide

### Method 1: Add Registry First (Recommended)

1. **Add the registry to your project:**

```bash
npx shadcn@latest add -r https://uimix.dev/r
```

This adds uimix to your `components.json`:

```json
{
  "registries": {
    "uimix": "https://uimix.dev/r"
  }
}
```

2. **Install components using the namespace:**

```bash
npx shadcn@latest add @uimix/cta-vertical-marquee
```

### Method 2: Direct URL

Install components directly without adding the registry:

```bash
npx shadcn@latest add https://uimix.dev/r/cta-vertical-marquee.json
```

### Method 3: Local Development

When developing locally with `npm run dev`:

```bash
npx shadcn@latest add http://localhost:3000/r/cta-vertical-marquee.json
```

## Available Components

- `@uimix/cta-vertical-marquee` - CTA section with vertical scrolling marquee

## What Gets Installed

When you install a component:

1. ✅ Component files are copied to your project
2. ✅ Dependencies are installed automatically
3. ✅ Tailwind config is updated with required animations
4. ✅ Path aliases are configured

## Example Usage

After installation:

```tsx
import CtaVerticalMarquee from '@/components/cta-vertical-marquee'

export default function LandingPage() {
  return (
    <main>
      <CtaVerticalMarquee />
    </main>
  )
}
```

## Customization

Components are yours to customize:

```tsx
<CtaVerticalMarquee 
  speed={15} 
  pauseOnHover 
  className="custom-styles"
/>
```

## Troubleshooting

### "Registry not found"

Make sure your dev server is running if using localhost, or the site is deployed if using the production URL.

### "Component already exists"

Use the `--overwrite` flag:

```bash
npx shadcn@latest add @uimix/cta-vertical-marquee --overwrite
```

### "Invalid configuration"

Run `npx shadcn@latest init` to initialize or fix your `components.json`.

## Building Your Own Registry

Want to create your own registry like this? Check out:

1. Create `registry.json` in your project root
2. Add components to `registry/default/[name]/`
3. Run `npm run registry:build`
4. Deploy and share your registry URL!

See [shadcn registry docs](https://ui.shadcn.com/docs/cli#building-a-registry) for details.

