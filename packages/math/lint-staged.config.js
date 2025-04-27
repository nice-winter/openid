/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{js?(x),json,md}': ['prettier --write'],
  '*.ts?(x)': ['eslint', 'prettier --parser=typescript --write']
}
