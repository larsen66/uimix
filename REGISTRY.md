# UIMix Component Registry

This project uses a custom shadcn-compatible registry for managing and distributing components.

## Installation

### Using shadcn CLI

You can install components using the shadcn CLI with our custom registry:

```bash
# Install a specific component
npx shadcn@latest add hero-minimalism --registry https://uimix.dev/api/registry

# Install multiple components
npx shadcn@latest add hero-minimalism hero-orbit-deck --registry https://uimix.dev/api/registry

# Or use local development server
npx shadcn@latest add hero-minimalism --registry http://localhost:3000/api/registry
```

### Available Components

#### Hero Components
- `hero-minimalism` - Minimalist hero section
- `hero-monochrome-launch` - Monochrome launch hero
- `hero-orbit-deck` - Orbit deck hero with animations

#### CTA Components
- `cta-horizontal-marquee` - CTA with horizontal marquee
- `cta-vertical-marquee` - CTA with vertical marquee
- `cta-vertical-marquee-left` - CTA with left-aligned vertical marquee
- `hero-marquee-large` - Large hero with marquee
- `hero-marquee-mixed-font` - Hero with mixed font marquee
- `hero-marquee-reverse` - Hero with reverse marquee
- `hero-marquee` - Standard hero with marquee
- `hero-video` - Hero with video background

#### Features Components
- `bento-features` - Bento grid features layout
- `bento-monochrome-1` - Monochrome bento grid variant 1
- `bento-monochrome` - Monochrome bento grid

#### FAQ Components
- `faq-monochrome` - Monochrome FAQ section
- `faq-spiral` - FAQ with spiral design

#### Login/Signup Components
- `login-card` - Login card component

#### Pricing Components
- `pricing-cards` - Pricing cards layout

#### Processing Components
- `processing-demo` - Processing card demo

#### Background Components
- `background-gradient-grid` - Gradient grid background
- `background-noise` - Noise texture background
- `blueprint-gradient-mesh` - Blueprint gradient mesh
- `squares-background` - Squares pattern background

#### UI Components
- `button` - Button component
- `card` - Card component
- `input` - Input field
- `label` - Label component
- `checkbox` - Checkbox component
- `switch` - Switch component
- `separator` - Separator component
- `noise` - Noise effect component
- `processing-card` - Processing card component
- `fallback-card` - Fallback card component
- `hyper-text` - Hyper text effect component

## Configuration

The registry is configured in `components.json`:

```json
{
  "registries": {
    "uimix": {
      "url": "http://localhost:3000/api/registry"
    }
  }
}
```

## Development

### Adding a New Component

1. Create your component file in the appropriate directory under `components/catalog/` or `components/ui/`
2. Add the component to the registry in `registry/index.ts`:

```typescript
{
  name: "your-component",
  type: "registry:ui",
  registryDependencies: ["button"], // Optional: other registry components this depends on
  dependencies: ["framer-motion"], // Optional: npm dependencies
  files: ["components/catalog/your-category/your-component.tsx"],
  category: "your-category",
  subcategory: undefined,
  chunks: [],
}
```

3. Update the JSON registry in `public/registry/index.json` with the same information

### Testing the Registry

1. Start the development server:
```bash
npm run dev
```

2. Test the registry API:
```bash
# Get all components
curl http://localhost:3000/api/registry

# Get specific component
curl http://localhost:3000/api/registry/hero-minimalism
```

3. Install a component using shadcn CLI:
```bash
npx shadcn@latest add hero-minimalism --registry http://localhost:3000/api/registry
```

## Production Deployment

When deploying to production, update the registry URL in `components.json`:

```json
{
  "registries": {
    "uimix": {
      "url": "https://uimix.dev/api/registry"
    }
  }
}
```

## Registry Structure

The registry follows the shadcn registry schema:

- `name` - Unique component identifier
- `type` - Component type (registry:ui, registry:block, registry:example)
- `registryDependencies` - Other registry components required
- `dependencies` - npm packages required
- `files` - Component file paths
- `category` - Component category
- `subcategory` - Optional subcategory
- `chunks` - Optional code chunks

## API Endpoints

- `GET /api/registry` - Get all components in the registry
- `GET /api/registry/[name]` - Get specific component with file contents

## License

MIT

