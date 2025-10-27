# Отладка центрирования камеры

## Проблема
Камера все еще открывается на левом компоненте вместо центра Masonry.

## Добавлена отладка

### 1. Расширенное логирование функции центрирования
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
  },
  debug: {
    masonryLeft: CANVAS_ORIGIN.x,
    masonryTop: CANVAS_ORIGIN.y,
    masonryTransform: 'translate(-50%, -50%)',
    actualCenterX: CANVAS_ORIGIN.x, // Since transform centers it
    actualCenterY: CANVAS_ORIGIN.y  // Since transform centers it
  }
});
```

### 2. Логирование TransformWrapper
```tsx
initialPositionX={typeof window !== 'undefined' ? (() => {
  const pos = window.innerWidth / 2 - MASONRY_CENTER.x;
  console.log('TransformWrapper initialPositionX:', {
    windowWidth: window.innerWidth,
    masonryCenterX: MASONRY_CENTER.x,
    calculatedPosition: pos
  });
  return pos;
})() : 0}
```

## Что проверить в консоли

### 1. Значения CANVAS_ORIGIN и MASONRY_CENTER
- **CANVAS_ORIGIN**: должен быть `{ x: 3000, y: 3000 }`
- **MASONRY_CENTER**: должен быть `{ x: 3000, y: 3000 }`

### 2. Размеры окна
- **window.innerWidth**: ширина окна браузера
- **window.innerHeight**: высота окна браузера

### 3. Расчет позиции камеры
- **centerX**: `window.innerWidth / 2` - центр экрана по X
- **centerY**: `window.innerHeight / 2` - центр экрана по Y
- **scaledMasonryCenterX**: `MASONRY_CENTER.x * scale` - масштабированная позиция центра
- **scaledMasonryCenterY**: `MASONRY_CENTER.y * scale` - масштабированная позиция центра

### 4. Финальная позиция камеры
- **posX**: `centerX - scaledMasonryCenterX` - должна быть отрицательной
- **posY**: `centerY - scaledMasonryCenterY` - должна быть отрицательной

## Возможные проблемы

### 1. Неправильный масштаб
- **scale**: должен быть адаптивным к размеру экрана
- **Проверка**: `scaleX = window.innerWidth / 1200`, `scaleY = window.innerHeight / 800`

### 2. Неправильные координаты
- **MASONRY_CENTER**: должен быть (3000, 3000)
- **Проверка**: соответствует ли CANVAS_ORIGIN

### 3. Проблема с TransformWrapper
- **initialPositionX/Y**: должны быть отрицательными
- **Проверка**: логи TransformWrapper

## Следующие шаги

1. **Открыть консоль браузера** и посмотреть на логи
2. **Проверить значения** CANVAS_ORIGIN, MASONRY_CENTER, scale
3. **Проверить расчеты** позиции камеры
4. **Исправить проблему** на основе найденных значений

## Ожидаемые значения

Для экрана 1920x1080:
- **CANVAS_ORIGIN**: `{ x: 3000, y: 3000 }`
- **MASONRY_CENTER**: `{ x: 3000, y: 3000 }`
- **scale**: примерно 0.9 (1920/1200 = 1.6, 1080/800 = 1.35, min = 1.35, но ограничено 1.125)
- **posX**: `960 - (3000 * 0.9) = 960 - 2700 = -1740`
- **posY**: `540 - (3000 * 0.9) = 540 - 2700 = -2160`

Если значения отличаются, нужно исправить логику! 🔍
