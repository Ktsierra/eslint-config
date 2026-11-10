# Changelog

## 3.0.0

This release moves the config to ESLint 10. Projects that stay on ESLint 9 should keep using 2.x:

```bash
npm install -D @ktsierra/eslint-config@2
```

### Breaking

- ESLint 10 is required (`eslint ^10.0.0`). ESLint 9 projects stay on 2.x.
- Node.js `^20.19.0 || ^22.13.0 || >=24` is required.
- `@eslint/js` and `globals` are now dependencies of the config and install with it. They are no longer peer dependencies, so you do not need to install them yourself.
- `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser` are no longer peer dependencies. The `typescript-eslint` peer range is now `^8.56.0`.
- New ranges for the optional React peers: `eslint-plugin-react-hooks ^7.1.0` (was `^5.2.0`) and `eslint-plugin-react-refresh ^0.5.1` (was `^0.4.20`).
- `eslint-plugin-react` and `eslint-plugin-react-native` have no release for ESLint 10, so the config registers them wrapped with `fixupPluginRules` from `@eslint/compat`:
  - Do not register these two plugins under `react` or `react-native`, either yourself or through another preset that registers them (for example `eslint-plugin-react`'s own `configs.flat.*`). ESLint refuses to redefine a plugin name with a different plugin object.
  - Turning on more `react/*` or `react-native/*` rules in your own config still works.
  - Neither plugin declares support for ESLint 10: pnpm installs them and prints a peer dependency warning, and npm refuses to install them next to ESLint 10 and stops with `ERESOLVE`. See [Installing with npm](./README.md#installing-with-npm) in the README for the two ways through.

### Rule changes

- Added from ESLint 10's `eslint:recommended`, in every configuration, at `error`: `no-unassigned-vars`, `no-useless-assignment`, `preserve-caught-error`.
- Added for React and React Native projects, from `eslint-plugin-react-hooks` 7 (the React Compiler rules):
  - at `error`: `react-hooks/static-components`, `react-hooks/use-memo`, `react-hooks/preserve-manual-memoization`, `react-hooks/immutability`, `react-hooks/globals`, `react-hooks/refs`, `react-hooks/set-state-in-effect`, `react-hooks/error-boundaries`, `react-hooks/purity`, `react-hooks/set-state-in-render`, `react-hooks/config`, `react-hooks/gating`;
  - at `warn`: `react-hooks/incompatible-library`, `react-hooks/unsupported-syntax`.
- `eslint-plugin-react-refresh` 0.5 checks higher-order components more strictly, and `connect` is no longer special-cased. A project that needs it adds `connect` through the `extraHOCs` option of `react-refresh/only-export-components`.
- No rule was removed, and no rule changed level.

### Behavior that follows ESLint 10

- `no-shadow-restricted-names` now reports `globalThis`: its `reportGlobalThis` option defaults to `true` in ESLint 10.
- ESLint 10 tracks JSX references, so new reports may appear in files with JSX.
- See the [ESLint v10 migration guide](https://eslint.org/docs/latest/use/migrate-to-10.0.0) for everything else that changed in ESLint itself.

### Globals

`globals` moves from 16 to 17.

- `globals.node` adds `QuotaExceededError` and `Temporal`, and drops `AsyncDisposableStack`, `DisposableStack` and `SuppressedError`.
- `globals.browser` drops `AsyncDisposableStack`, `AudioWorkletGlobalScope`, `AudioWorkletProcessor`, `currentFrame`, `currentTime`, `DisposableStack`, `registerProcessor`, `sampleRate`, `SuppressedError` and `WorkletGlobalScope`, and adds 55 new names.
- A dropped name only matters to `no-undef` in plain JavaScript files. `no-undef` is off for TypeScript files.

### Fixed

- Under ESLint 10, the config could be handed `@eslint/js` 9 and silently run ESLint 9's recommended rules. `@eslint/js` 10 now ships with the config.

### Known issue

- With TypeScript 6, `eslint --fix-dry-run` can crash with `Cannot read properties of undefined (reading 'includes')`, and so can a script that lints the same file twice in one process when `CI=true`. It comes from typescript-eslint's single-run mode, not from this config. `eslint` and `eslint --fix` are not affected. The workaround is to set `TSESTREE_SINGLE_RUN=false` for that command.
