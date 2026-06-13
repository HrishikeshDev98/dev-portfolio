import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1. React and Next.js
            ['^react$', '^react-dom(/.*)?$', '^next(/.*)?$'],
            // 2. Third-party packages (not react-icons) + CSS side effects
            ['^(?!react-icons)@?\\w', '^\\u0000'],
            // 3. Internal absolute imports (@/ — not image assets)
            ['^@/(?!static/images)'],
            // 4. Relative imports
            ['^\\.'],
            // 5. Image assets
            ['^@/static/images', '\\.(png|jpe?g|svg|webp|gif|ico)$'],
            // 6. Icon imports
            ['^react-icons'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/no-unescaped-entities': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
    },
  },
  {
    ignores: [
      '.next/',
      'src/app/(payload)/**',
      'src/payload.config.ts',
      'src/payload-types.ts',
      'src/collections/**',
    ],
  },
]

export default eslintConfig
