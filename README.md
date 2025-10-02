# uimix.dev
<img src="./public/logo.png" alt="MIX-UI Logo" width="120" />

A modern, beautiful, and highly customizable React component library built with Next.js 15, React 19, and Tailwind CSS 4.

## ✨ Features

- 🎨 **20+ Premium Components** - Hero sections, CTAs, login forms, pricing tables, and more
- 🌓 **Dark/Light Mode** - Full theme support with smooth transitions
- 🎬 **Animated Previews** - Interactive video previews on hover
- 📱 **Fully Responsive** - Works seamlessly on all devices
- 🎯 **TypeScript** - Full type safety and IntelliSense support
- ⚡ **Performance First** - Built with Next.js 15 and React 19
- 🎭 **Framer Motion** - Smooth, professional animations
- 🔍 **Search & Filter** - Easy component discovery
- 💎 **Custom Font** - Unique Alpha Lyrae typography
- 🎪 **Copy-Paste Ready** - Get started in seconds

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd mixui

# Install dependencies
npm install
# or
pnpm install
# or
yarn install
```

## 🚀 Quick Start

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to see the component catalog.

## 📚 Component Categories

### 🦸 Hero Sections
Beautiful, attention-grabbing hero sections to captivate your visitors.

```tsx
import { HeroMinimalism } from '@/components/catalog/hero';

<HeroMinimalism />
```

### 📣 Call to Action
Conversion-focused CTA components with engaging animations and marquee effects.

- CTA with Vertical Marquee
- CTA with Horizontal Marquee
- CTA with Video Background
- CTA with Large Marquee

```tsx
import { CtaVerticalMarquee } from '@/components/catalog/cta';

<CtaVerticalMarquee />
```

### 🔐 Login & Signup
Beautiful authentication forms with modern design and smooth interactions.

```tsx
import { LoginCard } from '@/components/catalog/login-signup';

<LoginCard />
```

### 💰 Pricing
Modern pricing sections with card layouts and hover effects.

```tsx
import { PricingCards } from '@/components/catalog/pricing';

<PricingCards />
```

### ⚙️ Processing & Loaders
Processing states, loaders, and progress indicators.

```tsx
import { ProcessingCard } from '@/components/catalog/processing';

<ProcessingCard />
```

### 🎴 Cards
Beautiful card components with stunning effects.

```tsx
import { FallbackCard } from '@/components/catalog/cards';

<FallbackCard />
```

### 🌌 Backgrounds
Stunning background effects with gradients, noise, and meshes.

- Background with Noise
- Squares Grid Background
- Gradient Grid Background
- Blueprint Gradient Mesh

```tsx
import { BackgroundNoise } from '@/components/catalog/backgrounds';

<BackgroundNoise />
```

### ⭐ Features
Showcase your product features with bento-style layouts.

```tsx
import { BentoFeatures } from '@/components/catalog/features';

<BentoFeatures />
```

### ❓ FAQ
Beautiful FAQ sections with interactive animations.

```tsx
import { FaqWithSpiral } from '@/components/catalog/faq';

<FaqWithSpiral />
```

## 🎯 Usage

### Import Components

All components are exported from the catalog:

```tsx
import { 
  HeroMinimalism,
  CtaVerticalMarquee,
  LoginCard,
  PricingCards,
  BackgroundNoise
} from '@/components/catalog';
```

### Use in Your App

```tsx
import { HeroMinimalism } from '@/components/catalog/hero';

export default function Home() {
  return (
    <main>
      <HeroMinimalism />
    </main>
  );
}
```

### Customize Components

All components are built with Tailwind CSS and can be easily customized:

```tsx
<HeroMinimalism 
  className="bg-gradient-to-br from-purple-900 to-blue-900"
  title="Your Custom Title"
  description="Your custom description"
/>
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **React**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Custom Alpha Lyrae font
- **Code Highlighting**: [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)

## 📁 Project Structure

```
mixui/
├── app/                          # Next.js app directory
│   ├── component/[id]/          # Dynamic component pages
│   ├── component-preview/[id]/  # Component preview pages
│   ├── api/                     # API routes
│   ├── globals.css              # Global styles
│   └── layout.tsx               # Root layout
├── components/                   # React components
│   ├── catalog/                 # Component catalog
│   │   ├── backgrounds/
│   │   ├── cards/
│   │   ├── cta/
│   │   ├── faq/
│   │   ├── features/
│   │   ├── hero/
│   │   ├── login-signup/
│   │   ├── pricing/
│   │   └── processing/
│   ├── ui/                      # Base UI components
│   ├── component-catalog.tsx    # Main catalog component
│   └── component-preview.tsx    # Preview component
├── lib/                         # Utilities
├── public/                      # Static assets
│   ├── fonts/                   # Custom fonts
│   └── components/              # Component assets
├── alpha-lyrae/                 # Font source files
└── package.json
```

## 🎨 Customization

### Theme

The library supports dark and light modes out of the box. Toggle between themes:

```tsx
import { ThemeProvider } from '@/components/theme-provider';

<ThemeProvider defaultTheme="dark">
  <YourApp />
</ThemeProvider>
```

### Tailwind Configuration

Customize the theme in `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        // Your custom colors
      },
      fontFamily: {
        logo: ['AlphaLyrae', 'sans-serif'],
      },
    },
  },
};
```

### Component Utilities

Use the `cn()` utility for conditional classes:

```tsx
import { cn } from '@/lib/utils';

<div className={cn(
  "base-class",
  isActive && "active-class",
  isDarkMode ? "dark-class" : "light-class"
)} />
```

## 🔧 Development

### Adding New Components

1. Create your component in the appropriate category folder:

```tsx
// components/catalog/hero/hero-gradient.tsx
export function HeroGradient() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600">
      {/* Your component */}
    </section>
  );
}
```

2. Export it from the index file:

```tsx
// components/catalog/hero/index.ts
export * from './hero-gradient';
```

3. Add it to the catalog:

```tsx
// components/component-catalog.tsx
const components = [
  {
    id: "hero-gradient",
    title: "Hero Gradient",
    preview: "bg-gradient-to-br from-purple-600 to-blue-600",
    previewImage: "/path/to/preview.png",
    previewVideo: "/path/to/video.mp4",
    category: "hero",
  },
  // ... other components
];
```

### Creating Component Previews

1. Take a screenshot of your component
2. (Optional) Record a video preview
3. Place files in `/public/components/`
4. Update the component catalog with paths

## 📖 API Reference

### Component Catalog

```tsx
interface Component {
  id: string;              // Unique identifier
  title: string;           // Display name
  preview: string;         // CSS classes for preview background
  previewImage?: string;   // Path to preview image
  previewVideo?: string;   // Path to preview video
  category: string;        // Component category
  isPro?: boolean;         // Pro/premium flag
}
```

### Component Page

Each component has a dedicated page at `/component/[id]` with:

- Interactive preview
- Full-screen mode
- Source code viewer
- Copy-to-clipboard functionality
- Installation instructions
- Dependencies list

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/)
- UI primitives from [Radix UI](https://www.radix-ui.com/)

## 📞 Support

For support, please open an issue in the GitHub repository.

---

Made with ❤️ by uimix team
