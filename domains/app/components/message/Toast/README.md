# EaToast Component

A flexible and customizable toast notification component for Vue 3 applications with built-in icons.

## Features

- 4 different toast types: success, error, warning, info
- Built-in SVG icons (no external files required)
- Customizable colors with CSS variables (optional)
- Auto-dismiss functionality with customizable duration
- Smooth animations and transitions
- Responsive design
- Accessible with proper ARIA labels
- Teleport to body for proper z-index handling

## Installation

```bash
npm install ea-kit
```

## Usage

### Basic Setup

```vue
<script setup>
import { EaToast, useToast } from 'ea-kit'

const { showSuccess, showError, showWarning, showInfo } = useToast()
</script>

<template>
  <div>
    <!-- Your app content -->
    <button @click="showSuccess('Success message!')">Show Success</button>
    <button @click="showError('Error message!')">Show Error</button>
    <button @click="showWarning('Warning message!')">Show Warning</button>
    <button @click="showInfo('Info message!')">Show Info</button>
    
    <!-- Toast component - place once in your app -->
    <EaToast />
  </div>
</template>
```

### CSS Variables (Optional)

If you want to customize colors, define these CSS variables in your project:

```css
:root {
  /* Gray colors */
  --gray-50: 249 250 251;
  --gray-200: 229 231 235;
  --gray-300: 209 213 219;
  --gray-500: 107 114 128;
  --gray-800: 31 41 55;
  
  /* Success colors */
  --success-50: 240 253 244;
  --success-200: 187 247 208;
  --success-500: 34 197 94;
  --success-600: 22 163 74;
  --success-800: 22 101 52;
  
  /* Error colors */
  --danger-50: 254 242 242;
  --danger-200: 254 202 202;
  --danger-500: 239 68 68;
  --danger-600: 220 38 38;
  --danger-800: 153 27 27;
  
  /* Warning colors */
  --warning-50: 255 251 235;
  --warning-200: 254 215 170;
  --warning-500: 245 158 11;
  --warning-600: 217 119 6;
  --warning-800: 146 64 14;
  
  /* Info colors */
  --info-50: 239 246 255;
  --info-200: 191 219 254;
  --info-500: 59 130 246;
  --info-600: 37 99 235;
  --info-800: 30 64 175;
}
```

## Usage Examples

### Basic Usage

```vue
<script setup>
import { EaToast, useToast } from 'ea-kit'

const { showSuccess, showError, showWarning, showInfo } = useToast()

const handleSuccess = () => {
  showSuccess('Operation completed successfully!')
}

const handleError = () => {
  showError('Something went wrong!')
}
</script>

<template>
  <div>
    <button @click="handleSuccess">Success</button>
    <button @click="handleError">Error</button>
    <EaToast />
  </div>
</template>
```

### Advanced Usage with Custom Duration

```vue
<script setup>
import { EaToast, useToast } from 'ea-kit'

const { showToast, showCustomToast, clearAllToasts } = useToast()

const showCustomToast = () => {
  // Show toast for 5 seconds
  showToast('Custom message', 'info', 5000)
}

const showPersistentToast = () => {
  // Show toast that doesn't auto-dismiss (duration: 0)
  showToast('Persistent message', 'warning', 0)
}
</script>

<template>
  <div>
    <button @click="showCustomToast">Custom Duration</button>
    <button @click="showPersistentToast">Persistent</button>
    <button @click="clearAllToasts">Clear All</button>
    <EaToast />
  </div>
</template>
```

### Custom Toast Examples

```vue
<script setup>
import { EaToast, useToast } from 'ea-kit'

const { showCustomToast } = useToast()

// Custom toast with purple theme
const showPurpleToast = () => {
  showCustomToast('Purple custom toast!', {
    customColor: '#8B5CF6',
    customIconColor: '#7C3AED',
    customTextColor: '#5B21B6',
    duration: 4000
  })
}

// Custom toast with custom icon
const showHeartToast = () => {
  const heartIcon = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  `
  
  showCustomToast('Loved it! ❤️', {
    customIcon: heartIcon,
    customColor: '#FDF2F8',
    customIconColor: '#EC4899',
    customTextColor: '#BE185D',
    duration: 3000
  })
}

// Custom toast with emoji
const showRocketToast = () => {
  showCustomToast('🚀 Launching to space!', {
    customColor: '#F0F9FF',
    customIconColor: '#0EA5E9',
    customTextColor: '#0C4A6E',
    duration: 5000
  })
}
</script>

<template>
  <div>
    <button @click="showPurpleToast">Purple Toast</button>
    <button @click="showHeartToast">Heart Toast</button>
    <button @click="showRocketToast">Rocket Toast</button>
    <EaToast />
  </div>
</template>
```

## API Reference

### useToast Composable

#### Methods

- `showSuccess(message: string, duration?: number)` - Show success toast
- `showError(message: string, duration?: number)` - Show error toast
- `showWarning(message: string, duration?: number)` - Show warning toast
- `showInfo(message: string, duration?: number)` - Show info toast
- `showToast(message: string, type: 'success' | 'error' | 'warning' | 'info', duration?: number)` - Show custom toast
- `showCustomToast(message: string, options?: CustomToastOptions)` - Show fully customizable toast
- `removeToast(id: string)` - Remove specific toast
- `clearAllToasts()` - Remove all toasts

#### Properties

- `toasts` - Reactive array of current toasts

### CustomToastOptions Type

```typescript
interface CustomToastOptions {
  duration?: number // Auto-dismiss duration in ms (0 = no auto-dismiss)
  customIcon?: string // Custom SVG icon HTML string
  customColor?: string // Custom background color (hex, rgb, etc.)
  customIconColor?: string // Custom icon color
  customTextColor?: string // Custom text color
}
```

### ToastMessage Type

```typescript
interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info' | 'custom'
  duration?: number
  customIcon?: string
  customColor?: string
  customIconColor?: string
  customTextColor?: string
}
```

## Built-in Icons

The component includes built-in SVG icons for each toast type:

- **Success**: Checkmark in circle (from ea-kit SVG collection)
- **Error**: X marks in circle (from ea-kit SVG collection)
- **Warning**: Exclamation triangle (from ea-kit SVG collection)
- **Info**: Info circle (from ea-kit SVG collection)

## Styling

The component uses BEM methodology for CSS classes:

- `.toast-container` - Main container
- `.toast` - Individual toast item
- `.toast__content` - Toast content wrapper
- `.toast__icon` - Icon container
- `.toast__message` - Message text
- `.toast__close` - Close button
- `.toast--success` - Success toast modifier
- `.toast--error` - Error toast modifier
- `.toast--warning` - Warning toast modifier
- `.toast--info` - Info toast modifier

## Accessibility

- Close button has proper `aria-label`
- Proper focus management
- Keyboard navigation support
- Screen reader friendly

## Browser Support

- Vue 3.x
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive 