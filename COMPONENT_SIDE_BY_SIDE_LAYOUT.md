# ComponentSideBySideLayout

Новый компонент для отображения компонентов в боковом макете с кодом слева и превью справа.

## Особенности

- **Боковой макет**: Код и установка слева, превью справа
- **Секция установки**: CLI и ручная установка сверху от кода
- **Полноэкранный режим**: Возможность развернуть как код, так и превью
- **Адаптивность**: На мобильных устройствах переключается на вертикальный макет

## Использование

```tsx
import { ComponentSideBySideLayout } from "@/components/ComponentSideBySideLayout"
import YourComponent from "@/registry/default/your-component"

<ComponentSideBySideLayout 
  component={YourComponent}
  scale={0.6}
  componentName="your-component"
  componentPath="registry/default/your-component.tsx"
  tailwindConfig="// Optional tailwind config"
  css="/* Optional global styles */"
/>
```

## Параметры

- `component`: React компонент для превью
- `scale`: Масштаб превью (по умолчанию 0.7)
- `componentName`: Имя компонента для CLI установки
- `componentPath`: Путь к файлу компонента для отображения кода
- `tailwindConfig`: Опциональная конфигурация Tailwind
- `css`: Опциональные глобальные стили

## Миграция с ComponentWithInstallation

Замените:
```tsx
<ComponentWithInstallation 
  component={YourComponent}
  scale={0.6}
  componentName="your-component"
  componentPath="registry/default/your-component.tsx"
/>
```

На:
```tsx
<ComponentSideBySideLayout 
  component={YourComponent}
  scale={0.6}
  componentName="your-component"
  componentPath="registry/default/your-component.tsx"
/>
```
