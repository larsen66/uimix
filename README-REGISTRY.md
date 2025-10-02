# UIMax Component Registry

This document explains how to use and maintain the UIMax component registry.

## For Users: Installing Components

Users can install your components using the Shadcn CLI with your custom registry:

### Method 1: Using the Online Registry (After Deployment)

```bash
# Install a single component
npx shadcn@latest add fallback-card -r https://yourdomain.com/api/registry

# Install multiple components
npx shadcn@latest add fallback-card button card -r https://yourdomain.com/api/registry
```

### Method 2: Configure components.json

Users can add your registry to their `components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "registries": {
    "uimix": "https://yourdomain.com/api/registry"
  }
}
```

Then install components:

```bash
npx shadcn@latest add fallback-card -r uimix
```

### Method 3: Local Development/Testing

For local testing before deployment:

```bash
# Start your Next.js dev server
npm run dev

# In another terminal, use the local registry
npx shadcn@latest add fallback-card -r http://localhost:3000/api/registry
```

## For Maintainers: Managing the Registry

### Directory Structure

```
registry/
├── index.json                 # Main registry index
├── schema.json                # JSON schema for validation
└── components/                # Individual component definitions
    ├── fallback-card.json
    ├── button.json
    └── ...
```

### Automatic Registry Generation

Run the script to auto-generate registry files from your components:

```bash
# Install tsx if you haven't
npm install -D tsx

# Generate registry
npx tsx scripts/generate-registry.ts
```

This will:
1. Scan all components in `components/ui/` (registry:ui)
2. Scan all components in `components/catalog/` (registry:example)
3. Extract dependencies automatically
4. Generate individual JSON files
5. Update the main `index.json`

### Manual Registry Entry

If you prefer to create registry entries manually, here's the format:

```json
{
  "name": "component-name",
  "type": "registry:ui",
  "description": "Description of the component",
  "dependencies": ["framer-motion", "lucide-react"],
  "registryDependencies": ["button", "card"],
  "files": [
    {
      "path": "components/ui/component-name.tsx",
      "type": "registry:ui"
    }
  ],
  "tailwind": {
    "config": {
      "theme": {
        "extend": {
          // Tailwind config additions
        }
      }
    }
  },
  "cssVars": {
    "light": {
      "--custom-var": "value"
    },
    "dark": {
      "--custom-var": "value"
    }
  }
}
```

### Component Types

- **`registry:ui`**: Core UI components (buttons, cards, inputs, etc.)
- **`registry:example`**: Example implementations and demos
- **`registry:block`**: Full page sections or complex blocks
- **`registry:component`**: General reusable components

### Best Practices

1. **Always regenerate** the registry after adding new components
2. **Version your registry** if you make breaking changes
3. **Document dependencies** - the script extracts them automatically
4. **Test locally** before deploying
5. **Keep file paths** relative to the workspace root

## API Endpoints

### GET /api/registry

Returns the full registry index with all components.

**Response:**
```json
{
  "name": "uimix",
  "components": [...]
}
```

### GET /api/registry?component=fallback-card

Returns the specific component definition.

**Response:**
```json
{
  "name": "fallback-card",
  "type": "registry:ui",
  "files": [...]
}
```

## Deployment Checklist

Before deploying your registry:

- [ ] Run `npx tsx scripts/generate-registry.ts`
- [ ] Test with `npx shadcn@latest add <component> -r http://localhost:3000/api/registry`
- [ ] Verify all file paths are correct
- [ ] Check that all dependencies are listed
- [ ] Update your documentation with the production URL
- [ ] Deploy to Vercel/Netlify/your hosting
- [ ] Update examples to use the production registry URL

## Advanced: Creating Your Own CLI

If you want a branded CLI experience like `npx uimix add <component>`, you'll need to:

1. Fork the Shadcn CLI
2. Customize the branding and default registry
3. Publish to npm as `uimix`
4. Users can then run: `npx uimix add fallback-card`

See examples:
- [Magic UI CLI](https://magicui.design)
- [Aceternity UI CLI](https://ui.aceternity.com)
- [Origin UI CLI](https://originui.com)

## Troubleshooting

### "Component not found"

- Ensure the component JSON file exists in `registry/components/`
- Regenerate the registry with the script
- Check file paths in the JSON match actual file locations

### "Failed to install dependencies"

- Verify npm package names in the `dependencies` array
- Check that `registryDependencies` reference valid components in your registry

### CORS Errors

- The API route includes CORS headers by default
- If you're hosting elsewhere, ensure CORS is enabled

## Examples

Check out these successful component libraries with registries:

- [Shadcn UI](https://ui.shadcn.com)
- [Magic UI](https://magicui.design)
- [Aceternity UI](https://ui.aceternity.com)
- [Origin UI](https://originui.com)

