# UIMix - Official shadcn Registry

UIMix теперь полностью совместим с официальным shadcn CLI! 🎉

## Быстрый старт

### 1. Настройка

В корне **вашего проекта** (не mixui) создайте файл `.shadcnrc`:

```json
{
  "registry": "https://uimix.dev/r"
}
```

### 2. Установка компонентов

```bash
# Перейдите в директорию вашего проекта
cd your-project

# Установите любой компонент
npx shadcn@latest add hero-minimalism
npx shadcn@latest add pricing-cards
npx shadcn@latest add login-card
```

## Альтернативный способ (без .shadcnrc)

Используйте флаг `--registry`:

```bash
npx shadcn@latest add hero-minimalism --registry https://uimix.dev/r
```

## Доступные компоненты

### Hero Components
- `hero-minimalism` - Minimalist hero section
- `hero-monochrome-launch` - Monochrome launch hero  
- `hero-orbit-deck` - Orbit deck hero with animations

### CTA Components  
- `cta-horizontal-marquee` - CTA with horizontal marquee
- `cta-vertical-marquee` - CTA with vertical marquee

### Features
- `bento-features` - Bento grid features layout

### FAQ
- `faq-monochrome` - Monochrome FAQ section

### Auth
- `login-card` - Beautiful login card

### Pricing
- `pricing-cards` - Pricing cards layout

### UI Components
- `button` - Button component
- `card` - Card component
- `input` - Input field
- `label` - Label component
- `checkbox` - Checkbox component

## Registry Structure

Registry следует официальной спецификации shadcn:

```
https://uimix.dev/r/
├── index.json              # Список всех компонентов
├── hero-minimalism.json    # Компонент с кодом
├── pricing-cards.json      # Компонент с кодом
└── ...
```

## Как работает

1. **shadcn CLI** читает `.shadcnrc` и находит URL registry
2. Загружает `https://uimix.dev/r/index.json` для списка компонентов
3. Загружает конкретный компонент, например `https://uimix.dev/r/hero-minimalism.json`
4. Автоматически устанавливает зависимости (`npm install`)
5. Копирует файлы в ваш проект
6. Рекурсивно устанавливает `registryDependencies` (другие компоненты)

## Локальная разработка

### Для тестирования локально:

```bash
# 1. В mixui директории запустите dev сервер
cd mixui
npm run dev

# 2. В тестовом проекте создайте .shadcnrc
cd ../test-project
echo '{"registry": "http://localhost:3000/r"}' > .shadcnrc

# 3. Установите компонент
npx shadcn@latest add hero-minimalism
```

## API Endpoints

### GET /r/index.json
Возвращает полный registry со всеми компонентами

**Response:**
```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "uimix",
  "homepage": "https://uimix.dev",
  "items": [...]
}
```

### GET /r/[component-name].json
Возвращает конкретный компонент с исходным кодом

**Example:** `GET /r/hero-minimalism.json`

**Response:**
```json
{
  "name": "hero-minimalism",
  "type": "registry:ui",
  "title": "Hero Minimalism",
  "description": "A minimalist hero section",
  "registryDependencies": ["button"],
  "dependencies": ["framer-motion", "lucide-react"],
  "files": [
    {
      "path": "components/catalog/hero/hero-minimalism.tsx",
      "type": "registry:component",
      "content": "... весь код компонента ..."
    }
  ]
}
```

## Преимущества официального формата

✅ **Полная совместимость** с shadcn CLI  
✅ **Автоматическая установка зависимостей** - npm пакеты устанавливаются автоматически  
✅ **Рекурсивная установка** - registry dependencies устанавливаются автоматически  
✅ **Стандартизация** - следует официальной спецификации  
✅ **Простота использования** - работает как обычные shadcn компоненты  

## Добавление новых компонентов

Чтобы добавить новый компонент в registry, отредактируйте `public/r/index.json`:

```json
{
  "items": [
    {
      "name": "your-component",
      "type": "registry:ui",
      "title": "Your Component",
      "description": "Description of your component",
      "registryDependencies": ["button", "card"],
      "dependencies": ["framer-motion"],
      "files": [
        {
          "path": "components/catalog/category/your-component.tsx",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

## Troubleshooting

### ❌ Component not found

Убедитесь что:
- `.shadcnrc` находится в корне вашего проекта
- URL registry правильный: `https://uimix.dev/r`
- Имя компонента правильное (без .json расширения)

### ❌ Failed to fetch

- Проверьте интернет соединение
- Для локальной разработки убедитесь что dev сервер запущен
- Проверьте что https://uimix.dev доступен

## Specification

Registry следует официальной спецификации:
- [registry.json schema](https://ui.shadcn.com/schema/registry.json)
- [registry-item.json schema](https://ui.shadcn.com/schema/registry-item.json)

## Links

- 🌐 Website: https://uimix.dev
- 📦 Registry: https://uimix.dev/r
- 📖 Documentation: [README.md](./README.md)
- 🐛 Issues: https://github.com/larsen66/uimix/issues

