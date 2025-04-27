/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{js?(x),json,md}': ['prettier --write'],
  '*.{htm?(l),css,scss,sass,less}': ['prettier --write'],
  '*.{ts?(x),vue}': ['prettier --write', 'eslint']
}
