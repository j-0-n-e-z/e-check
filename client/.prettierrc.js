/** @type {import('prettier').Config} */
module.exports = {
  tabWidth: 2,
  singleQuote: true,
  jsxSingleQuote: true,
  arrowParens: 'always',
  useTabs: false,
  printWidth: 100,
  trailingComma: 'none',
  semi: false,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx'],
  tailwindConfig: './tailwind.config.js',
}
