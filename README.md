# @ktsierra/eslint-config

My personal ESLint configurations for TypeScript projects.

## Requirements

- ESLint 10
- Node.js `^20.19.0 || ^22.13.0 || >=24`

Projects still on ESLint 9 should use version 2:

```bash
npm install -D @ktsierra/eslint-config@2
```

See [CHANGELOG.md](./CHANGELOG.md) for what changed in 3.0.0.

## Installation

```bash
npm install -D @ktsierra/eslint-config
```

## Usage

To use these configurations, first install the peer dependencies for your configuration (see [Peer dependencies](#peer-dependencies) below).

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
  ...reactConfig(), // Or ...reactConfig('./tsconfig.custom.json')
  {
    rules: {
      // Your custom rules
      'no-console': 'warn',
    },
  },
]
```

## Peer dependencies

Package managers do not install these for you. Install the ones your configuration needs next to `@ktsierra/eslint-config`. `@eslint/js` and `globals` come with the config, so you do not install them yourself.

### Base

`eslint`, `typescript-eslint` and `typescript`.

pnpm:

```bash
pnpm add -D eslint typescript-eslint typescript
```

npm:

```bash
npm install --save-dev eslint typescript-eslint typescript
```

yarn:

```bash
yarn add -D eslint typescript-eslint typescript
```

### React

The base three, plus `eslint-plugin-react`, `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`.

pnpm:

```bash
pnpm add -D eslint typescript-eslint typescript eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
```

npm:

```bash
npm install --save-dev eslint typescript-eslint typescript eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
```

yarn:

```bash
yarn add -D eslint typescript-eslint typescript eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
```

### React Native

The React six, plus `eslint-plugin-react-native`. The React Native configuration imports the React configuration, so it needs all the React plugins too, including `eslint-plugin-react-refresh`.

pnpm:

```bash
pnpm add -D eslint typescript-eslint typescript eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-react-native
```

npm:

```bash
npm install --save-dev eslint typescript-eslint typescript eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-react-native
```

yarn:

```bash
yarn add -D eslint typescript-eslint typescript eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-react-native
```

## Wrapped plugins

`eslint-plugin-react` and `eslint-plugin-react-native` have no release for ESLint 10. The config wraps them with `fixupPluginRules` from `@eslint/compat` so they run on ESLint 10.

- Installing them shows a peer dependency warning, because neither plugin declares support for ESLint 10. The config still works.
- Do not register these two plugins yourself under `react` or `react-native`. The config already registers them, and ESLint refuses to redefine a plugin name with a different plugin object.
- You can still turn on more `react/*` or `react-native/*` rules in your own config.

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
React Compiler rules from `eslint-plugin-react-hooks` 7  
React Refresh rules

### React Native Configuration

Everything from React configuration  
React Native specific rules  
Platform-specific component rules
