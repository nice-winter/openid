import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pkg from './package.json' with { type: 'json' }
import { $ } from 'execa'
import { progressSpinner } from 'plop'
import chalk from 'chalk'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const resolve = (...p) => path.resolve(__dirname, ...p)

/** @param {import('plop').NodePlopAPI} plop */
export default function (plop) {
  plop.setGenerator('library', {
    description: 'Create a new library package',
    prompts: [
      {
        type: 'input',
        name: 'packageName',
        message: 'Library name (e.g. my-utils):',
        validate: (input) => {
          const regex = /^[a-z][a-z0-9_-]*[a-z0-9]$/

          if (!input) return 'Name is required'
          if (!regex.test(input)) return 'Invalid format'

          return true
        }
      },
      {
        type: 'confirm',
        name: 'installDeps',
        message: 'Run `pnpm install` to install dependencies?'
      }
    ],

    actions: (answers) => {
      /** @type {import('plop').PlopGeneratorConfig['actions']} */
      const acts = []

      acts.push({
        type: 'addMany',
        data: {
          projectName: pkg.name
        },
        destination: resolve('packages', '{{packageName}}'),
        templateFiles: 'templates/packages/library/**',
        base: 'templates/packages/library'
      })

      if (answers.installDeps) {
        acts.push(async (answers, config, plop) => {
          if (answers.installDeps) {
            try {
              progressSpinner.start(chalk.blue('Installing dependencies...'))

              await $({
                env: { FORCE_COLOR: 'true' }
              })`pnpm install`

              return 'done!'
            } catch (error) {
              console.error('\n', error.stdio[1])
              throw new Error('Failed to install dependencies!')
            }
          }

          return chalk.green('Install dependencies done!')
        })
      }

      acts.push(
        (answers, config, plop) =>
          `The library package has now been generated at /packages/${answers.packageName}.`
      )

      return acts
    }
  })
}
