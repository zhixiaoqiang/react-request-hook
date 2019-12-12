const execa = require('execa')
const dayJS = require('dayjs')

;(async () => {
  console.log('release prod start')
  const version = process.env.VERSION

  await execa('git', ['add', '-A'], { stdout: 'inherit' })
  await execa(
    'git',
    ['commit', '-am', `build: build production v${version} at ${dayJS().format('YYYY-MM-DD hh:mm:ss')}`],
    { stdout: 'inherit' }
  )

  await execa(
    'npm',
    ['version', version, '-m', `chore: update version with tag v${version}`],
    { stdout: 'inherit' }
  )
  await execa('git', ['push', 'origin', `v${version}`], { stdout: 'inherit' })
  await execa('git', ['push', 'origin', 'master'], {
    stdout: 'inherit',
  })

  console.log('release prod end')
})().catch((err) => {
  console.log(err)
  console.error(err.stderr)
  console.error(err.stdout)
  process.exit(1)
})
