import { readdir } from './readdir'
import { loadFront } from 'yaml-front-matter'
import fs from 'fs'
import { Page } from './templates/current-page-context'
import { parseWithMarkdown } from './markdown-render'

export const readPages = async (): Promise<Page[]> => {
  const contentFiles = readdir('content')

  return Promise.all(
    contentFiles.map(async (file) => {
      const raw = fs.readFileSync(`content/${file}`, 'utf8')
      const { markdown, ...page } = loadFront(raw, {
        contentKeyName: 'markdown'
      })
      const src = file.replace(/\.md$/, '.html')
      return {
        content: await parseWithMarkdown(markdown),
        isBlogPost: file.startsWith('blog/'),
        isDraft: page.isDraft ?? false,
        menuOrder: page.menuOrder ?? 0,
        menuTitle: page.menuTitle,
        showInMainMenu: page.showInMainMenu ?? false,
        src,
        path: '/' + src.replace('index.html', ''),
        title: page.title,
        description: page.description,
        template: page.template ?? 'default',
        modified: page.modified,
        hidden: page.hidden ?? false,
        socialMediaImage: page.socialMediaImage
      }
    })
  )
}
