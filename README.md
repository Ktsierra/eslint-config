# @ktsierra/eslint-config

My personal ESLint configurations for TypeScript projects.

## Installation

```bash
npm install -D @ktsierra/eslint-config
```

## Usage

To use these configurations, first install `eslint` in your project:

```bash
npm install -D eslint
```

Then, create your `eslint.config.mjs` file and import the desired configuration:

## Base TypeScript Configuration

```js
import baseConfig from '@ktsierra/eslint-config'

export default baseConfig() // Or baseConfig('./tsconfig.custom.json')
```

## React Projects

```js
import reactConfig from '@ktsierra/eslint-config/react'

export default reactConfig() // Or reactConfig('./tsconfig.custom.json')
```

## React Native Projects

```js
import reactNativeConfig from '@ktsierra/eslint-config/react-native'

export default reactNativeConfig() // Or reactNativeConfig('./tsconfig.custom.json')
```

## Custom Configuration

You can extend any configuration:

```js
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

## Peer dependencies

This package declares several peer dependencies which are not automatically installed by package managers. Install the required peer dependencies in your project to use the configs below.

Required (for TypeScript linting):

- eslint
- @eslint/js
- @typescript-eslint/parser
- @typescript-eslint/eslint-plugin
- globals

Optional (for React / React Native projects):

- eslint-plugin-react
- eslint-plugin-react-hooks
- eslint-plugin-react-refresh
- eslint-plugin-react-native

Install all recommended peer dependencies (pnpm):

```bash
pnpm add -D eslint @eslint/js @typescript-eslint/parser @typescript-eslint/eslint-plugin globals eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-react-native
```

npm:

```bash
npm install --save-dev eslint @eslint/js @typescript-eslint/parser @typescript-eslint/eslint-plugin globals eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-react-native
```

yarn:

```bash
yarn add -D eslint @eslint/js @typescript-eslint/parser @typescript-eslint/eslint-plugin globals eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-react-native
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