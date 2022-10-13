import fs from 'fs/promises'
import path from 'path'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { compileStyles } from './compile-styles'
import { readPages } from './read-pages'
import { Render } from './render'
import { templates } from './templates/templates'
import { Website } from './templates/website-context'

const build = async () => {
  await fs.mkdir('build', { recursive: true })

  const styles = compileStyles()
  const pages = readPages()
  const website: Website = {
    pages,
    domain: JSON.parse(await fs.readFile('package.json', 'utf8')).website,
    inlineStyles: styles.inline
  }
  for (const page of pages) {
    const template = templates[page.template]
    if (!template) continue // TODO: error
    const content = renderToStaticMarkup(
      React.createElement(Render, { website, currentPage: page, template })
    )
    const fileName = `build/${page.src}`
    await fs.mkdir(path.dirname(fileName), { recursive: true })
    await fs.writeFile(fileName, `<!DOCTYPE html>${content}`)
  }

  await fs.cp('public', 'build', { recursive: true })
  await fs.cp(
    'node_modules/ga-lite/dist/ga-lite.min.js',
    'build/ga-lite.min.js'
  )
  await fs.writeFile('build/delayed.css', styles.delayed)
}
build()
