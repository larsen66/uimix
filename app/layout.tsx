import '@/app/global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';

// Use system fonts instead of Google Fonts to avoid network issues
const inter = {
  className: 'font-sans',
  variable: '',
};

const spaceGrotesk = {
  className: '',
  variable: '--font-space-grotesk',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${inter.className} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
