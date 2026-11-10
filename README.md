# @ktsierra/eslint-config

My personal ESLint configurations for TypeScript projects.

## Requirements

- ESLint 10
- Node.js `^20.19.0 || ^22.13.0 || >=24`
- TypeScript: a version that `typescript-eslint` supports. `typescript-eslint` 8.72 supports TypeScript 4.8.4 up to, but not including, 6.1. TypeScript 7 is not supported.

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

npm 7 and later and pnpm install the required peers (`eslint` and `typescript-eslint`) on their own when they are missing. The optional peers, the React plugins, are never installed for you. Listing the required peers in the install line is still worth doing, because it puts their versions in your own `package.json`. `@eslint/js` and `globals` come with the config, so you do not install them yourself.

The install lines leave out `typescript` on purpose: a bare `typescript` installs TypeScript 7 today, and ESLint then fails to load the config. If your project has no TypeScript yet, add a supported version yourself, for example `typescript@6.0`.

### Base

`eslint` and `typescript-eslint`.

pnpm:

```bash
pnpm add -D eslint typescript-eslint
```

npm:

```bash
npm install --save-dev eslint typescript-eslint
```

yarn:

```bash
yarn add -D eslint typescript-eslint
```

### React

The base two, plus `eslint-plugin-react`, `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`.

pnpm:

```bash
pnpm add -D eslint typescript-eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
```

npm (read [Installing with npm](#installing-with-npm) first):

```bash
npm install --save-dev eslint typescript-eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
```

yarn:

```bash
yarn add -D eslint typescript-eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
```

### React Native

The React five, plus `eslint-plugin-react-native`. The React Native configuration imports the React configuration, so it needs all the React plugins too, including `eslint-plugin-react-refresh`.

pnpm:

```bash
pnpm add -D eslint typescript-eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-react-native
```

npm (read [Installing with npm](#installing-with-npm) first):

```bash
npm install --save-dev eslint typescript-eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-react-native
```

yarn:

```bash
yarn add -D eslint typescript-eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-react-native
```

## Wrapped plugins

`eslint-plugin-react` and `eslint-plugin-react-native` have no release for ESLint 10. The config wraps them with `fixupPluginRules` from `@eslint/compat` so they run on ESLint 10.

- Neither plugin declares support for ESLint 10. pnpm installs them and prints a peer dependency warning. npm refuses to install them next to ESLint 10 and stops with `ERESOLVE`; see [Installing with npm](#installing-with-npm). The config itself works on ESLint 10.
- Do not register these two plugins under `react` or `react-native`, either yourself or through another preset that registers them (for example `eslint-plugin-react`'s own `configs.flat.*`). The config already registers them, and ESLint refuses to redefine a plugin name with a different plugin object.
- You can still turn on more `react/*` or `react-native/*` rules in your own config.

### Installing with npm

npm stops with `ERESOLVE` because `eslint-plugin-react` and `eslint-plugin-react-native` declare ESLint 9 at most. There are two ways through:

- Before installing, add `overrides` to your `package.json`, with an entry for each of the two plugins your project installs (a React project only needs the `eslint-plugin-react` entry):

  ```json
  {
    "overrides": {
      "eslint-plugin-react": { "eslint": "$eslint" },
      "eslint-plugin-react-native": { "eslint": "$eslint" }
    }
  }
  ```

  `$eslint` means "the version of `eslint` this project depends on", so `eslint` must be in your project's own dependencies. The install lines above put it there.

- Or pass `--legacy-peer-deps` on every install.

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
