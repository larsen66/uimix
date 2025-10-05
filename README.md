ls
# UIMix - Modern React Component Library

A modern, beautiful, and highly customizable React component library built with Next.js 15, React 19, and Tailwind CSS 4.

🌐 **Website**: [uimix.dev](https://uimix.dev)

## Quick Start

### Installation via shadcn CLI

Install any component from the **uimix** registry using shadcn CLI:

```bash
# ⚠️ ВАЖНО: Запускайте команду из директории вашего проекта!
cd your-project

# Install a specific component
npx shadcn@latest add hero-minimalism

# Install multiple components at once
npx shadcn@latest add hero-minimalism pricing-cards login-card
```

📖 **Подробная инструкция**: См. [INSTALL.md](./INSTALL.md)

### Configuration (Опционально)

Чтобы не указывать `--registry` каждый раз, создайте файл `.shadcnrc` в корне проекта:

```json
{
  "registry": "https://uimix.dev/api/registry"
}
```

После этого можно использовать просто:
```bash
npx shadcn@latest add hero-minimalism
```

## Available Components

### 🎯 Hero Components
- `hero-minimalism` - Minimalist hero section
- `hero-monochrome-launch` - Monochrome launch hero
- `hero-orbit-deck` - Orbit deck hero with animations

### 📣 CTA Components
- `cta-horizontal-marquee` - CTA with horizontal marquee
- `cta-vertical-marquee` - CTA with vertical marquee
- `cta-vertical-marquee-left` - CTA with left-aligned vertical marquee
- `hero-marquee-large` - Large hero with marquee
- `hero-marquee-mixed-font` - Hero with mixed font marquee
- `hero-marquee-reverse` - Hero with reverse marquee
- `hero-marquee` - Standard hero with marquee
- `hero-video` - Hero with video background

### ✨ Features Components
- `bento-features` - Bento grid features layout
- `bento-monochrome-1` - Monochrome bento grid variant 1
- `bento-monochrome` - Monochrome bento grid

### ❓ FAQ Components
- `faq-monochrome` - Monochrome FAQ section
- `faq-spiral` - FAQ with spiral design

### 🔐 Login/Signup Components
- `login-card` - Login card component

### 💰 Pricing Components
- `pricing-cards` - Pricing cards layout

### ⚙️ Processing Components
- `processing-demo` - Processing card demo

### 🎨 Background Components
- `background-gradient-grid` - Gradient grid background
- `background-noise` - Noise texture background
- `blueprint-gradient-mesh` - Blueprint gradient mesh
- `squares-background` - Squares pattern background

### 🧱 UI Components
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

## Features

✅ **Modern Stack**: Built with Next.js 15, React 19, and Tailwind CSS 4  
✅ **Type-Safe**: Full TypeScript support  
✅ **Animations**: Beautiful animations with Framer Motion  
✅ **Accessible**: Built on Radix UI primitives  
✅ **Customizable**: Easy to customize with Tailwind CSS  
✅ **Copy-Paste**: Install via shadcn CLI or copy-paste directly  
✅ **Dark Mode**: Full dark mode support  

## Usage Example

```bash
# 1. Initialize shadcn in your project (if not already done)
npx shadcn@latest init

# 2. Install a component from uimix registry
npx shadcn@latest add hero-minimalism

# 3. Use in your code
import { HeroMinimalism } from "@/components/catalog/hero/hero-minimalism"

export default function Home() {
  return <HeroMinimalism />
}
```

## Development

### Prerequisites

- Node.js 18+ 
- pnpm, npm, or yarn

### Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Project Structure

```
mixui/
├── app/                    # Next.js app directory
├── components/
│   ├── catalog/           # Main component catalog
│   │   ├── hero/         # Hero components
│   │   ├── cta/          # CTA components
│   │   ├── features/     # Feature components
│   │   ├── faq/          # FAQ components
│   │   ├── pricing/      # Pricing components
│   │   └── backgrounds/  # Background components
│   └── ui/               # Base UI components
├── registry/             # Component registry configuration
└── public/registry/      # Public registry JSON
```

## Registry API

The uimix registry exposes the following endpoints:

- **GET** `/api/registry` - Get all components
- **GET** `/api/registry/[name]` - Get specific component with source code

## Contributing

See [REGISTRY.md](./REGISTRY.md) for detailed information about adding new components to the registry.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Primitives**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/)

## License

MIT © UIMix Team

## Links

- 🌐 Website: [uimix.dev](https://uimix.dev)
- 📦 Registry: `https://uimix.dev/api/registry`
- 🐛 Issues: [GitHub Issues](https://github.com/larsen66/uimix/issues)
- 📖 Documentation: [REGISTRY.md](./REGISTRY.md)

---

Built with ❤️ by the UIMix team
