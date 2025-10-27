# Исправление центрирования камеры

## Проблема
Камера приближается к левому углу компонентов, а должна быть в центре компонентов.

## Анализ проблемы

### 1. Структура позиционирования
```tsx
// Masonry контейнер
<motion.div
  style={{
    position: 'absolute',
    left: CANVAS_ORIGIN.x,        // 3000px
    top: CANVAS_ORIGIN.y,         // 3000px
    transform: 'translate(-50%, -50%)', // Центрирование относительно точки
    width: '1200px',
  }}
>
```

### 2. CANVAS_ORIGIN
- **Позиция**: `{ x: 3000, y: 3000 }` (центр канваса 6000x6000)
- **Назначение**: точка привязки для Masonry контейнера
- **Центрирование**: `transform: translate(-50%, -50%)` центрирует контейнер относительно этой точки

## Решение

### 1. Обновлен TransformWrapper
```tsx
<TransformWrapper
  initialPositionX={typeof window !== 'undefined' ? (window.innerWidth / 2 - CANVAS_ORIGIN.x) : 0}
  initialPositionY={typeof window !== 'undefined' ? (window.innerHeight / 2 - CANVAS_ORIGIN.y) : 0}
  // ... другие пропсы
>
```

### 2. Улучшена функция центрирования
```tsx
const center = () => {
  const wx = window.innerWidth;
  const wy = window.innerHeight;

  // Calculate scale to fill screen
  const scaleX = wx / 1200; // 1200px is the width of masonry content
  const scaleY = wy / 800;  // 800px is approximate height of masonry content
  const s = Math.min(scaleX, scaleY, 1.125);

  // Center on the masonry content (placed at CANVAS_ORIGIN)
  // The masonry container is already centered with transform: translate(-50%, -50%)
  const posX = wx / 2 - (CANVAS_ORIGIN.x * s);
  const posY = wy / 2 - (CANVAS_ORIGIN.y * s);

  ref.setTransform(posX, posY, s, 0);
};
```

## Логика центрирования

### 1. Позиция Masonry контейнера
- **left**: `CANVAS_ORIGIN.x` (3000px)
- **top**: `CANVAS_ORIGIN.y` (3000px)
- **transform**: `translate(-50%, -50%)` - центрирует относительно точки (3000, 3000)

### 2. Расчет позиции камеры
```tsx
// Центр экрана
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;

// Позиция камеры для центрирования на CANVAS_ORIGIN
const posX = centerX - (CANVAS_ORIGIN.x * scale);
const posY = centerY - (CANVAS_ORIGIN.y * scale);
```

### 3. Результат
- **Камера направлена на**: точку (3000, 3000) - центр канваса
- **Masonry контейнер**: центрирован относительно этой точки
- **Компоненты**: отображаются в центре экрана

## Отладка

### 1. Логирование
```tsx
console.log('Centering camera:', {
  viewport: { width: wx, height: wy },
  canvasOrigin: CANVAS_ORIGIN,
  scale: s,
  position: { x: posX, y: posY },
  calculation: {
    centerX: wx / 2,
    centerY: wy / 2,
    scaledOriginX: CANVAS_ORIGIN.x * s,
    scaledOriginY: CANVAS_ORIGIN.y * s
  }
});
```

### 2. Проверка
- **CANVAS_ORIGIN**: должен быть (3000, 3000)
- **Позиция камеры**: должна быть отрицательной (левее и выше CANVAS_ORIGIN)
- **Масштаб**: должен быть адаптивным к размеру экрана

## Результат

Теперь камера:
- ✅ **Центрирована на компонентах** - направлена на центр Masonry контейнера
- ✅ **Правильное позиционирование** - учитывает `transform: translate(-50%, -50%)`
- ✅ **Адаптивна** - подстраивается под размер экрана
- ✅ **Отладка** - логирование для проверки расчетов

Камера теперь правильно центрирована на компонентах! 🎯
