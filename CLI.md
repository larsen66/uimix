# UIMix CLI - Установка компонентов

## Проблема с shadcn CLI

К сожалению, текущая версия shadcn CLI не поддерживает флаг `--registry` для кастомных регистров. Поэтому мы создали собственный простой CLI для установки компонентов из uimix registry.

## Использование

### Способ 1: Через npm script (Рекомендуется)

```bash
# Установка одного компонента
npm run add hero-minimalism

# Установка с зависимостями
npm run add login-card
# Затем установите зависимости, если они будут указаны
```

### Способ 2: Прямой запуск скрипта

```bash
node scripts/add-component.js hero-minimalism
```

### Способ 3: Локальный registry (для разработки)

```bash
# Запустите dev сервер
npm run dev

# В другом терминале
UIMIX_REGISTRY=http://localhost:3000/api/registry npm run add hero-minimalism
```

## Примеры

### Установка hero компонента

```bash
npm run add hero-minimalism
```

Вывод:
```
📦 Installing component: hero-minimalism
🔗 Registry: https://uimix.dev/api/registry

✅ Found component: hero-minimalism
📁 Files to install: 1

📦 Dependencies: framer-motion, lucide-react
Run: npm install framer-motion lucide-react

✓ Created: components/catalog/hero/hero-minimalism.tsx

✅ Component hero-minimalism installed successfully!

⚠️  This component depends on: button
Install them with:
  node scripts/add-component.js button
```

### Установка компонента с зависимостями

```bash
# 1. Установите основной компонент
npm run add login-card

# 2. Установите npm зависимости (если требуется)
npm install lucide-react

# 3. Установите registry зависимости (если требуется)
npm run add card
npm run add button
npm run add input
npm run add label
npm run add checkbox
```

## Что делает скрипт?

1. 📡 Подключается к uimix registry (https://uimix.dev/api/registry)
2. 📥 Загружает код компонента
3. 📁 Создает необходимые директории
4. ✏️ Записывает файлы компонентов
5. ℹ️ Показывает список зависимостей для установки

## Ручная установка (Copy-Paste)

Если вы предпочитаете ручную установку:

1. Откройте https://uimix.dev
2. Найдите нужный компонент
3. Скопируйте код
4. Создайте файл в `components/catalog/[category]/[component].tsx`
5. Вставьте код
6. Установите необходимые зависимости

## Альтернатива: curl

```bash
# Получить список всех компонентов
curl https://uimix.dev/api/registry | jq

# Получить конкретный компонент
curl https://uimix.dev/api/registry/hero-minimalism | jq
```

## Доступные компоненты

Выполните для получения полного списка:
```bash
curl https://uimix.dev/api/registry | jq '.items[].name'
```

Или смотрите [README.md](./README.md) для полного списка с описаниями.

## Registry API

### GET /api/registry
Возвращает список всех компонентов

```bash
curl https://uimix.dev/api/registry
```

### GET /api/registry/[name]
Возвращает конкретный компонент с исходным кодом

```bash
curl https://uimix.dev/api/registry/hero-minimalism
```

Response:
```json
{
  "name": "hero-minimalism",
  "type": "registry:ui",
  "files": [
    {
      "name": "components/catalog/hero/hero-minimalism.tsx",
      "content": "... исходный код ..."
    }
  ],
  "dependencies": ["framer-motion", "lucide-react"],
  "registryDependencies": ["button"]
}
```

## Troubleshooting

### ❌ Cannot connect to registry

```
❌ Error fetching component: getaddrinfo ENOTFOUND uimix.dev
```

**Решение**: 
- Проверьте интернет соединение
- Убедитесь что https://uimix.dev доступен
- Для локальной разработки используйте `UIMIX_REGISTRY=http://localhost:3000/api/registry`

### ❌ Component not found

```
❌ Error parsing component data
```

**Решение**: 
- Проверьте название компонента (должно быть в kebab-case)
- Посмотрите список доступных компонентов: `curl https://uimix.dev/api/registry | jq '.items[].name'`

### ❌ Permission denied

```
Error: EACCES: permission denied
```

**Решение**: 
- Убедитесь что запускаете команду из директории проекта
- Проверьте права доступа к директории

## Future: shadcn integration

Мы работаем над интеграцией с официальным shadcn registry. Следите за обновлениями!

## Поддержка

- 🌐 Website: https://uimix.dev
- 🐛 Issues: https://github.com/larsen66/uimix/issues
- 📖 Docs: [README.md](./README.md)

