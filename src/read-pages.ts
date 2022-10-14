import { readdir } from './readdir'
import { loadFront } from 'yaml-front-matter'
import fs from 'fs'
import { Page } from './templates/current-page-context'
import { marked } from 'marked'

const renderer = new marked.Renderer()
renderer.image = (href, title, text) =>
  `<noscript class="lazyloadimage"><img src="${href}" alt="${text}"></noscript>`

export const readPages = (): Page[] => {
  const contentFiles = readdir('content')

  return contentFiles.map((file) => {
    const raw = fs.readFileSync(`content/${file}`, 'utf8')
    const { markdown, ...page } = loadFront(raw, {
      contentKeyName: 'markdown'
    })
    return {
      content: marked(markdown, { gfm: true, renderer }),
      isBlogPost: file.startsWith('blog/'),
      isDraft: page.isDraft ?? false,
      menuOrder: page.menuOrder ?? 0,
      menuTitle: page.menuTitle,
      showInMainMenu: page.showInMainMenu ?? false,
      src: file.replace(/\.md$/, '.html'),
      title: page.title,
      description: page.description,
      template: page.template ?? 'default',
      modified: page.modified,
      hidden: page.hidden ?? false
    }
  })
}
