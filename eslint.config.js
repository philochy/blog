import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import astro from 'eslint-plugin-astro';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import tailwindcss from 'eslint-plugin-tailwindcss';
import globals from 'globals';
import ts from 'typescript-eslint';
export default ts.config(
  {
    // https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores
    ignores: ['dist/', '.astro/', '.local/', 'src/pages/search/index.astro'],
  },
  {
    // https://eslint.org/docs/latest/use/configure/language-options
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  // https://eslint.org/docs/latest/use/configure/configuration-files#using-predefined-configurations
  js.configs.recommended,
  ...ts.configs.recommended,
  ...ts.configs.stylistic,
  ...astro.configs.recommended,
  ...astro.configs['jsx-a11y-recommended'],
  prettier,
  {
    plugins: {
      import: importPlugin,
      tailwindcss: tailwindcss,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      // https://typescript-eslint.io/rules/no-unused-vars/
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'off',
      'semi': ['error', 'always'],
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-arrow-callback': 'error',
      'no-var': 'error',
      // https://typescript-eslint.io/rules/triple-slash-reference/
      '@typescript-eslint/triple-slash-reference': [
        'error',
        { path: 'always' },
      ],
      // https://eslint.org/docs/latest/rules/no-unused-expressions
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowTernary: true },
      ],
      'import/order': [
        'error',
        {
          'groups': [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'pathGroups': [
            {
              pattern: 'astro*',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '@/components/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/layouts/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/pages/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/utils/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/libs/**',
              group: 'internal',
              position: 'after',
            },
          ],
          'pathGroupsExcludedImportTypes': ['astro'],
          'newlines-between': 'always',
          'alphabetize': {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  }
);
