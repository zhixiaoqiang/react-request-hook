const chalk = require('chalk')
const execa = require('execa')
const bumpVersion = require('./bump-version')

const [ type ] = process.argv.slice(2)

;(async () => {
  console.log('publish start...')
  const isConfirm = await bumpVersion()
  const stdio = { stdio: 'inherit' }
  if (isConfirm) {
    await execa('yarn', ['release'], stdio)
    if (type === 'tag') {
      const version = process.env.VERSION
      await execa('yarn', ['publish', '--tag', version], stdio)
    } else {
      await execa('yarn', ['publish'], stdio)
    }
    console.log(chalk.green('publish successful.'))
  }
})().catch((err) => {
  console.log(err)
  err.stderr && console.error(err.stderr)
  err.stdout && console.error(err.stdout)
  process.exit(1)
})
