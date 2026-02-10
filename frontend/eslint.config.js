import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
// Import the TypeScript tools you installed
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist']),

  // 1. The JavaScript Config (Your existing rules)
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },

  // 2. The TypeScript Config (The "Teacher")
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked, // Hard mode enabled
      ...tseslint.configs.stylisticTypeChecked, // Teaches good TS habits
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'], // Links ESLint to your TS rules
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // You can add specific TS overrides here
      '@typescript-eslint/no-explicit-any': 'error', // No "any" allowed!
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
])
