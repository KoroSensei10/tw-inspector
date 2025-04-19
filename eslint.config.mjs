// eslint.config.js
import js from '@eslint/js';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
	globalIgnores([
		'node_modules/**/*'
	]),
	js.configs.recommended,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				// ...globals.node // Add this if you are using SvelteKit in non-SPA mode
			}
		},
		ignores: [
			'build/**/*',
			'.svelte-kit/**/*',
			'node_modules/**/*'
		],
		rules: {
			// Override some rules here if needed
			'no-console': 'warn',
			'no-unused-vars': 'warn',
			'no-undef': 'error',
			"indent": ["error", "tab"]
		}
	}
];