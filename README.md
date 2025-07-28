# @ktsierra/eslint-config

My personal ESLint configurations for TypeScript projects.

## Installation

```bash
npm install -D @ktsierra/eslint-config
```

## Usage

## Base TypeScript Configuration

For Node.js/backend TypeScript projects:

```bash
npm install -D eslint @eslint/js typescript-eslint globals
```

Create eslint.config.mjs:

```bash
import baseConfig from '@ktsierra/eslint-config'

export default baseConfig() // Or baseConfig('./tsconfig.custom.json')
```

## React Projects

```bash
npm install -D eslint @eslint/js typescript-eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh globals
```

Create eslint.config.mjs:

```bash
import reactConfig from '@ktsierra/eslint-config/react'

export default reactConfig() // Or reactConfig('./tsconfig.custom.json')
```

## React Native Projects

```bash
npm install -D eslint @eslint/js typescript-eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-react-native globals
```

Create eslint.config.mjs:

```bash
import reactNativeConfig from '@ktsierra/eslint-config/react-native'

export default reactNativeConfig() // Or reactNativeConfig('./tsconfig.custom.json')
```

## Custom Configuration

You can extend any configuration:

```bash
import reactConfig from '@ktsierra/eslint-config/react'

export default [
  reactConfig(), // Or reactConfig('./tsconfig.custom.json')
  {
    rules: {
      // Your custom rules
      'no-console': 'warn',
    },
  },
]
```

## Available Configurations

| Package Name                             | Description                   |
|------------------------------------------|-------------------------------|
| `@ktsierra/eslint-config`             | Base TypeScript configuration |
| `@ktsierra/eslint-config/react`       | React + TypeScript            |
| `@ktsierra/eslint-config/react-native`| React Native + TypeScript     |

## What's Included

### Base Configuration

TypeScript strict type checking  
Custom rules for better code quality

### React Configuration

Everything from base configuration  
React best practices  
React Hooks rules  
React Refresh rules

### React Native Configuration

Everything from React configuration  
React Native specific rules  
Platform-specific component rules
