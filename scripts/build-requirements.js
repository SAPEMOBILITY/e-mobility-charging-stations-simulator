import chalk from 'chalk'
import { readFileSync } from 'node:fs'
import { exit, version } from 'node:process'
// eslint-disable-next-line n/no-unpublished-import
import { satisfies } from 'semver'

import { runtime, runtimes } from './runtime.js'

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'))

/**
 * Check if the current node version match the required engines version.
 */
export const checkNodeVersion = () => {
  const enginesNodeVersion = packageJson.engines.node
  if (satisfies(version, enginesNodeVersion) === false) {
    console.error(
      chalk.red(
        `Required node version ${enginesNodeVersion} not satisfied with current version ${version}`
      )
    )
    exit(1)
  }
}

switch (runtime) {
  case runtimes.node:
    checkNodeVersion()
    break
  case runtimes.bun:
  case runtimes.deno:
  case runtimes.workerd:
  case runtimes.browser:
  default:
    console.warn(chalk.yellow(`Unsupported '${runtime}' runtime detected`))
    break
}
