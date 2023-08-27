import { readdir } from './readdir'
import { loadFront } from 'yaml-front-matter'
import fs from 'fs'
import { Page } from './templates/current-page-context'
import { marked } from 'marked'
import sizeOf from 'image-size'
import highlight from 'highlight.js'

const renderer = new marked.Renderer()
renderer.image = (href, title, text) => {
  const { width, height } = loadImageSize('public' + href)
  return `<noscript class="lazyloadimage"><img src="${href}" alt="${text}" width="${width}" height="${height}"></noscript>`
}
export const readPages = (): Page[] => {
  const contentFiles = readdir('content')

  return contentFiles.map((file) => {
    const raw = fs.readFileSync(`content/${file}`, 'utf8')
    const { markdown, ...page } = loadFront(raw, {
      contentKeyName: 'markdown'
    })
    const src = file.replace(/\.md$/, '.html')
    return {
      content: marked(markdown, {
        gfm: true,
        renderer
      }),
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
}

const loadImageSize = (path: string) => {
  const size = sizeOf(path)
  return { width: size.width, height: size.height }
}

const highlightCustom = (code: string, lang: string) => {
  if (lang === '' || lang === 'nohighlight') {
    return code
  }
  if (lang === 'bash') {
    return code
      .split('\n')
      .map(function (c) {
        return '<span class="code-line">' + c + '</span>'
      })
      .join('\n')
  }
  return lang
    ? highlight.highlight(code, { language: lang }).value
    : highlight.highlightAuto(code).value
}
