# Правильное центрирование камеры на Masonry

## Проблема
Камера все еще приближается к левому углу Masonry, а должна к центру.

## Анализ структуры

### 1. Позиционирование Masonry контейнера
```tsx
<motion.div
  style={{
    position: 'absolute',
    left: CANVAS_ORIGIN.x,        // 3000px
    top: CANVAS_ORIGIN.y,         // 3000px
    transform: 'translate(-50%, -50%)', // Центрирование относительно точки
    width: '1200px',              // MASONRY_WIDTH
    height: '800px',              // MASONRY_HEIGHT (приблизительно)
  }}
>
```

### 2. Координаты центра Masonry
- **CANVAS_ORIGIN**: `{ x: 3000, y: 3000 }` - точка привязки
- **MASONRY_CENTER**: `{ x: 3000, y: 3000 }` - реальный центр Masonry
- **Причина**: `transform: translate(-50%, -50%)` центрирует контейнер относительно CANVAS_ORIGIN

## Решение

### 1. Добавлены константы для Masonry
```tsx
// Masonry container dimensions
const MASONRY_WIDTH = 1200;
const MASONRY_HEIGHT = 800; // Approximate height

// Center of masonry container (since it's positioned with transform: translate(-50%, -50%))
const MASONRY_CENTER = { 
  x: CANVAS_ORIGIN.x, 
  y: CANVAS_ORIGIN.y 
};
```

### 2. Обновлен TransformWrapper
```tsx
<TransformWrapper
  initialPositionX={typeof window !== 'undefined' ? (window.innerWidth / 2 - MASONRY_CENTER.x) : 0}
  initialPositionY={typeof window !== 'undefined' ? (window.innerHeight / 2 - MASONRY_CENTER.y) : 0}
  // ... другие пропсы
>
```

### 3. Улучшена функция центрирования
```tsx
const center = () => {
  const wx = window.innerWidth;
  const wy = window.innerHeight;

  // Calculate scale to fill screen
  const scaleX = wx / MASONRY_WIDTH; // 1200px is the width of masonry content
  const scaleY = wy / MASONRY_HEIGHT;  // 800px is approximate height of masonry content
  const s = Math.min(scaleX, scaleY, 1.125);

  // Center on the masonry content center
  const posX = wx / 2 - (MASONRY_CENTER.x * s);
  const posY = wy / 2 - (MASONRY_CENTER.y * s);

  ref.setTransform(posX, posY, s, 0);
};
```

## Логика центрирования

### 1. Размеры Masonry
- **Ширина**: 1200px (MASONRY_WIDTH)
- **Высота**: 800px (MASONRY_HEIGHT) - приблизительно
- **Центр**: CANVAS_ORIGIN (3000, 3000)

### 2. Расчет масштаба
```tsx
const scaleX = viewportWidth / MASONRY_WIDTH;   // Масштаб по ширине
const scaleY = viewportHeight / MASONRY_HEIGHT; // Масштаб по высоте
const scale = Math.min(scaleX, scaleY, 1.125); // Оптимальный масштаб
```

### 3. Расчет позиции камеры
```tsx
// Центр экрана
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;

// Позиция камеры для центрирования на MASONRY_CENTER
const posX = centerX - (MASONRY_CENTER.x * scale);
const posY = centerY - (MASONRY_CENTER.y * scale);
```

## Отладка

### 1. Улучшенное логирование
```tsx
console.log('Centering camera:', {
  viewport: { width: wx, height: wy },
  canvasOrigin: CANVAS_ORIGIN,
  masonryCenter: MASONRY_CENTER,
  masonryDimensions: { width: MASONRY_WIDTH, height: MASONRY_HEIGHT },
  scale: s,
  position: { x: posX, y: posY },
  calculation: {
    centerX: wx / 2,
    centerY: wy / 2,
    scaledMasonryCenterX: MASONRY_CENTER.x * s,
    scaledMasonryCenterY: MASONRY_CENTER.y * s
  }
});
```

### 2. Проверка значений
- **MASONRY_CENTER**: должен быть (3000, 3000)
- **MASONRY_WIDTH**: должен быть 1200
- **MASONRY_HEIGHT**: должен быть 800
- **Позиция камеры**: должна быть отрицательной (левее и выше MASONRY_CENTER)

## Результат

Теперь камера:
- ✅ **Центрирована на Masonry** - направлена на реальный центр контейнера
- ✅ **Правильные размеры** - использует MASONRY_WIDTH и MASONRY_HEIGHT
- ✅ **Точное позиционирование** - учитывает реальный центр Masonry
- ✅ **Адаптивна** - подстраивается под размер экрана
- ✅ **Отладка** - детальное логирование для проверки

Камера теперь правильно центрирована на центре Masonry! 🎯
