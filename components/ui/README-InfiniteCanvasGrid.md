# InfiniteCanvasGrid Component

Интерактивная бесконечная галерея компонентов с live preview и drag-to-explore функциональностью в fullscreen режиме.

## Возможности

- **Fullscreen Canvas**: Полностью immersive режим без header и UI элементов
- **Бесконечная сетка**: Компоненты расположены в виде сетки на бесконечном холсте
- **Apple-style навигация**: Drag, trackpad gestures, touch, scroll wheel с естественным скроллингом
- **Zoom система**: 10% - 300% с кнопками управления и pinch-to-zoom
- **Lazy loading**: Загрузка только видимых компонентов с прогрессивной подгрузкой
- **Live preview**: Все компоненты отображаются вживую с полным функционалом
- **Fullscreen modal**: Клик по компоненту открывает полноразмерный preview с анимациями
- **One-time visibility**: Компоненты загружаются только один раз и остаются видимыми навсегда
- **Viewport optimization**: Intersection Observer для отслеживания видимых компонентов

## Использование

```tsx
import { InfiniteCanvasGrid } from '@/components/ui/infinite-canvas-grid';

export default function HomePage() {
  return (
    <div className="w-screen h-screen">
      <InfiniteCanvasGrid />
    </div>
  );
}
```

### Навигация
- **Drag**: Перетаскивание мышью для навигации
- **Trackpad**: Apple-style естественный скроллинг с повышенной чувствительностью
- **Touch**: Поддержка касаний на мобильных устройствах
- **Scroll**: Колесико мыши для навигации (инвертированный для естественного ощущения)
- **Zoom**: Кнопки +/-, scroll wheel (Ctrl+scroll), pinch-to-zoom на trackpad
- **Click**: Клик по компоненту открывает полноразмерный modal

## Компоненты в галерее

Галерея включает все компоненты из registry в fullscreen режиме:

**Hero Components:**
- Hero Dock, Hero Minimalism, Hero Monochrome Launch, Hero Orbit Deck

**CTA Components:**
- CTA Marquee Base, Large, Reverse
- CTA with Video, Vertical Marquee variants
- CTA Horizontal Marquee

**Bento Components:**
- Bento Features (с золотой спиралью)
- Bento Monochrome (минималистичная сетка)

**Form Components:**
- Login Card (с анимированным фоном)

**Pricing Components:**
- Pricing Cards (с toggle анимациями)
- Pricing Cards variants 1 & 2

**FAQ Components:**
- FAQ Monochrome, FAQ with Spiral

**Utility Components:**
- Processing Card (с глитч эффектами)
- Fallback Card (элегантные fallback карточки)

Все компоненты загружаются только один раз при первом появлении и остаются видимыми с красивыми framer-motion анимациями.

## Технические детали

- **Fullscreen Mode**: Полностью immersive канвас без header и UI элементов
- **Навигация**: CSS transforms с поддержкой touch, wheel, drag событий (Apple-style)
- **Zoom System**: 10% - 300% с динамическим масштабированием компонентов
- **Оптимизация**: Intersection Observer API для lazy loading и viewport culling
- **Анимации**: Framer Motion для плавных анимаций загрузки и переходов
- **UI**: SVG фоновая сетка, backdrop blur, glass morphism
- **Persistent Components**: Компоненты остаются видимыми после первого показа

## Производительность

- **Viewport Culling**: Компоненты рендерятся только в видимой области + 150px margin
- **Intersection Observer**: Автоматическое отслеживание видимости компонентов
- **One-time Loading**: Компоненты загружаются только один раз при первом появлении и остаются видимыми навсегда
- **GPU Acceleration**: CSS transforms для плавной анимации камеры
- **Framer Motion**: Плавные анимации без влияния на производительность
- **No Flickering**: Компоненты никогда не скрываются после загрузки, предотвращая мерцание
