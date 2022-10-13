import fs from 'fs/promises'
import { renderToStaticMarkup } from 'react-dom/server'
import { Index } from './index'

const build = async () => {
  await fs.mkdir('build', { recursive: true })

  const content = renderToStaticMarkup(Index())

  await fs.writeFile('build/index.html', `<!DOCTYPE html>${content}`)

  await fs.cp('public', 'build', { recursive: true })
}
build()
