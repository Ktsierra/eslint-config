import type { Linter } from 'eslint';

/**
 * @param projectPaths - One or more tsconfig paths.
 * @returns An array of ESLint flat config objects.
 */
declare function baseConfig(projectPaths?: string | string[]): Linter.FlatConfig[];

export default baseConfig;