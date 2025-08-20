import type { Linter } from 'eslint';

/**
 * @param projectPaths - One or more tsconfig paths.
 * @returns An array of ESLint flat config objects.
 */
export declare function reactBaseConfig(projectPaths?: string | string[]): Linter.FlatConfig[];

/**
 * @param projectPaths - One or more tsconfig paths.
 * @returns An array of ESLint flat config objects.
 */
declare function reactConfig(projectPaths?: string | string[]): Linter.FlatConfig[];

export default reactConfig;