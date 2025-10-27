# Центрирование камеры на компонентах

## Проблема
Камера должна быть центрирована на компонентах, а не на начале координат канваса.

## Решение

### 1. Обновлен TransformWrapper
```tsx
<TransformWrapper
  initialPositionX={typeof window !== 'undefined' ? window.innerWidth / 2 - CANVAS_ORIGIN.x : 0}
  initialPositionY={typeof window !== 'undefined' ? window.innerHeight / 2 - CANVAS_ORIGIN.y : 0}
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
  const posX = wx / 2 - (CANVAS_ORIGIN.x * s);
  const posY = wy / 2 - (CANVAS_ORIGIN.y * s);

  ref.setTransform(posX, posY, s, 0);
};
```

### 3. Добавлено логирование для отладки
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

## Логика центрирования

### 1. CANVAS_ORIGIN
- **Позиция**: `{ x: 3000, y: 3000 }` (центр канваса 6000x6000)
- **Назначение**: точка, где размещены компоненты Masonry
- **Центрирование**: камера должна быть направлена на эту точку

### 2. Расчет позиции камеры
```tsx
// Центр экрана
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;

// Позиция камеры для центрирования на CANVAS_ORIGIN
const posX = centerX - (CANVAS_ORIGIN.x * scale);
const posY = centerY - (CANVAS_ORIGIN.y * scale);
```

### 3. Масштабирование
- **Масштаб по ширине**: `scaleX = viewportWidth / 1200`
- **Масштаб по высоте**: `scaleY = viewportHeight / 800`
- **Финальный масштаб**: `Math.min(scaleX, scaleY, 1.125)`

## Результат

Теперь камера:
- ✅ **Центрирована на компонентах** - направлена на CANVAS_ORIGIN
- ✅ **Адаптивна** - подстраивается под размер экрана
- ✅ **Оптимальный масштаб** - компоненты заполняют экран
- ✅ **Отладка** - логирование для проверки расчетов

Камера теперь всегда направлена на компоненты! 🎯
