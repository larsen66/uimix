# Установка компонентов UIMix

## Быстрый старт

### Для пользователей uimix.dev

```bash
# 1. Перейдите в директорию вашего проекта
cd your-project

# 2. Инициализируйте shadcn (если еще не сделали)
npx shadcn@latest init

# 3. Установите компонент из uimix registry
npx shadcn@latest add hero-minimalism --registry https://uimix.dev/api/registry
```

## Настройка проекта для использования uimix registry

### Вариант 1: Обновить components.json

Добавьте uimix registry в ваш `components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  },
  "registries": {
    "uimix": {
      "url": "https://uimix.dev/api/registry"
    }
  }
}
```

### Вариант 2: Создать .shadcnrc

Создайте файл `.shadcnrc` в корне проекта:

```json
{
  "registry": "https://uimix.dev/api/registry"
}
```

После этого можно использовать без флага `--registry`:

```bash
npx shadcn@latest add hero-minimalism
```

## Примеры установки

### Одиночный компонент

```bash
npx shadcn@latest add hero-minimalism --registry https://uimix.dev/api/registry
```

### Несколько компонентов

```bash
npx shadcn@latest add hero-minimalism pricing-cards bento-features --registry https://uimix.dev/api/registry
```

### Для разработчиков (локальный сервер)

Если вы разрабатываете компоненты локально:

```bash
# 1. Запустите dev сервер
npm run dev

# 2. В другом терминале установите компонент
npx shadcn@latest add hero-minimalism --registry http://localhost:3000/api/registry
```

## Частые ошибки

### ❌ Ошибка: "The item was not found"

```
Message:
The item at https://ui.shadcn.com/r/styles/new-york-v4/hero-minimalism.json was not found.
```

**Причина**: Вы не указали `--registry` флаг, и shadcn ищет компонент в официальном registry.

**Решение**: Добавьте флаг `--registry`:
```bash
npx shadcn@latest add hero-minimalism --registry https://uimix.dev/api/registry
```

### ❌ Ошибка: "Failed to fetch"

**Причина**: Registry URL недоступен или неправильный.

**Решение**: 
- Проверьте, что сайт https://uimix.dev работает
- Для локальной разработки убедитесь, что dev сервер запущен (`npm run dev`)

### ❌ Команда запущена не из директории проекта

**Причина**: Вы запустили команду из `~` (домашней директории).

**Решение**: Сначала перейдите в директорию проекта:
```bash
cd /path/to/your/project
npx shadcn@latest add hero-minimalism --registry https://uimix.dev/api/registry
```

## Доступные компоненты

### Hero (Заголовки)
- `hero-minimalism`
- `hero-monochrome-launch`
- `hero-orbit-deck`

### CTA (Призывы к действию)
- `cta-horizontal-marquee`
- `cta-vertical-marquee`
- `cta-vertical-marquee-left`
- `hero-marquee-large`
- `hero-marquee-mixed-font`
- `hero-marquee-reverse`
- `hero-marquee`
- `hero-video`

### Features (Возможности)
- `bento-features`
- `bento-monochrome-1`
- `bento-monochrome`

### FAQ (Вопросы-ответы)
- `faq-monochrome`
- `faq-spiral`

### Login/Signup (Авторизация)
- `login-card`

### Pricing (Цены)
- `pricing-cards`

### Processing (Обработка)
- `processing-demo`

### Backgrounds (Фоны)
- `background-gradient-grid`
- `background-noise`
- `blueprint-gradient-mesh`
- `squares-background`

### UI Components (Базовые компоненты)
- `button`
- `card`
- `input`
- `label`
- `checkbox`
- `switch`
- `separator`
- `noise`
- `processing-card`
- `fallback-card`
- `hyper-text`

## Проверка установки

После установки компонент будет находиться в:
- `components/catalog/[category]/[component-name].tsx` - для компонентов каталога
- `components/ui/[component-name].tsx` - для базовых UI компонентов

## Зависимости

Компоненты автоматически установят необходимые зависимости:
- `framer-motion` - для анимаций
- `lucide-react` - для иконок
- `@radix-ui/*` - для UI примитивов

## Поддержка

- 🌐 Website: https://uimix.dev
- 📖 Документация: [README.md](./README.md)
- 🔧 Для разработчиков: [REGISTRY.md](./REGISTRY.md)
- 🐛 Issues: https://github.com/larsen66/uimix/issues

