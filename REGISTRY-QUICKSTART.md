# 🚀 Quick Start: UIMax Component Registry

## ✅ What You Just Got

You now have a **fully functional component registry** that works with the Shadcn CLI! Users can install your components just like they install Shadcn components.

## 📦 How Users Install Your Components

Once you deploy your site, users can run:

```bash
npx shadcn@latest add fallback-card -r https://yourdomain.com/api/registry
```

Or they can configure their `components.json`:

```json
{
  "registries": {
    "uimix": "https://yourdomain.com/api/registry"
  }
}
```

Then:

```bash
npx shadcn@latest add fallback-card -r uimix
```

## 🛠️ Next Steps

### 1. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 2. Generate the Full Registry

This will scan all your components and create registry entries automatically:

```bash
npm run registry:generate
```

### 3. Test Locally

Start your dev server:

```bash
npm run dev
```

In another terminal, test installing a component:

```bash
# Create a test Next.js project
cd /tmp
npx create-next-app@latest test-uimix
cd test-uimix

# Initialize shadcn
npx shadcn@latest init

# Try installing your component from local dev server
npx shadcn@latest add fallback-card -r http://localhost:3000/api/registry
```

### 4. Deploy

Deploy to Vercel (recommended):

```bash
npm install -g vercel
vercel
```

Or use:
- Netlify
- Railway
- Your own server

### 5. Update Documentation

Once deployed, update your README with:

```markdown
## Installation

Install components using the Shadcn CLI:

\`\`\`bash
npx shadcn@latest add [component-name] -r https://yourdomain.com/api/registry
\`\`\`

Available components:
- `fallback-card` - Fallback card with glitch effects
- `processing-card` - Processing state card
- `hyper-text` - Animated hyper text
- ... (run `npm run registry:generate` to update this list)
\`\`\`
```

## 📁 Registry Structure

```
registry/
├── index.json                      # Main registry (auto-generated)
├── schema.json                     # JSON schema
├── components/                     # Component definitions
│   ├── fallback-card.json
│   ├── fallback-card-demo.json
│   └── ... (auto-generated)
└── README.md

app/api/registry/
└── route.ts                        # API endpoint

scripts/
└── generate-registry.ts            # Auto-generation script
```

## 🎨 Adding New Components

### Option A: Automatic (Recommended)

1. Add your component to `components/ui/` or `components/catalog/`
2. Run: `npm run registry:generate`
3. Done! The registry is updated automatically

### Option B: Manual

1. Create a JSON file in `registry/components/`:

```json
{
  "name": "my-component",
  "type": "registry:ui",
  "description": "My awesome component",
  "dependencies": ["framer-motion"],
  "registryDependencies": ["button"],
  "files": [
    {
      "path": "components/ui/my-component.tsx",
      "type": "registry:ui"
    }
  ]
}
```

2. Update `registry/index.json` to include it in the components array

## 🔍 Testing Your Registry

### Test the API endpoint:

```bash
# Get full registry
curl http://localhost:3000/api/registry

# Get specific component
curl http://localhost:3000/api/registry?component=fallback-card
```

### Test with Shadcn CLI:

```bash
# In a test project
npx shadcn@latest add fallback-card -r http://localhost:3000/api/registry
```

## 🚀 Going Further: Custom CLI

Want users to run `npx uimix add <component>` instead?

You'll need to:

1. **Fork the Shadcn CLI**: https://github.com/shadcn-ui/ui
2. **Customize it**:
   - Change branding
   - Set your registry as default
   - Customize prompts
3. **Publish to npm** as `uimix`
4. **Update docs** to use your CLI

Examples to reference:
- [Magic UI](https://github.com/magicuidesign/magicui) - `npx magicui-cli add`
- [Aceternity UI](https://github.com/aceternity/ui) - `npx aceternity-ui@latest add`

## 📚 Resources

- [Shadcn UI Registry Docs](https://ui.shadcn.com)
- [Registry Schema](./registry/schema.json)
- [Full Documentation](./README-REGISTRY.md)

## 🐛 Troubleshooting

**Registry not found?**
- Make sure your dev server is running: `npm run dev`
- Check the API route exists: `/app/api/registry/route.ts`

**Component not installing?**
- Verify the component exists in `registry/components/`
- Check file paths match actual files
- Run `npm run registry:generate` to regenerate

**Dependencies not installing?**
- Check npm package names in the `dependencies` array
- Verify `registryDependencies` reference valid components

## 💡 Pro Tips

1. **Automate registry generation** in your CI/CD pipeline
2. **Version your registry** for breaking changes
3. **Add descriptions** to help users discover components
4. **Include examples** (type: `registry:example`) for each component
5. **Test locally** before every deployment

---

Need help? Check the [full documentation](./README-REGISTRY.md) or open an issue!

