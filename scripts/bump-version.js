const inquirer = require('inquirer')
const semver = require('semver')
const currentVersion = require('../package.json').version

module.exports = async function bumpVersion () {
  console.log(`Current version: ${currentVersion}`)

  const bumps = ['patch', 'minor', 'major']
  const versions = {}
  bumps.forEach((b) => {
    versions[b] = semver.inc(currentVersion, b)
  })
  const bumpChoices = bumps.map(b => ({
    name: `${b} (${versions[b]})`,
    value: b,
  }))

  const { bump, customVersion } = await inquirer.prompt([
    {
      name: 'bump',
      message: 'Select release type:',
      type: 'list',
      choices: [...bumpChoices, { name: 'custom', value: 'custom' }],
    },
    {
      name: 'customVersion',
      message: 'Input version:',
      type: 'input',
      when: answers => answers.bump === 'custom',
    },
  ])

  const version = customVersion || versions[bump]

  const { isConfirm } = await inquirer.prompt([
    {
      name: 'isConfirm',
      message: `Confirm releasing ${version}?`,
      type: 'confirm',
    },
  ])
  if (isConfirm) process.env.VERSION = version

  return isConfirm
}
