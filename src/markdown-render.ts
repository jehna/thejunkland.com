import { Marked } from 'marked'
import highlight from 'highlight.js'
import { markedHighlight } from 'marked-highlight'
import sizeOf from 'image-size'

const loadImageSize = (path: string) => {
  const size = sizeOf(path)
  return { width: size.width, height: size.height }
}

const marked = new Marked(
  markedHighlight({
    highlight: (code, lang) => {
      if (lang === '' || lang === 'nohighlight' || !lang) {
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
  })
)
const renderer = new marked.Renderer()
renderer.image = (href, title, text) => {
  const { width, height } = loadImageSize('public' + href)
  return `<noscript class="lazyloadimage"><img src="${href}" alt="${text}" width="${width}" height="${height}"></noscript>`
}
renderer.code = (code) => `<pre class="hljs">${code}</pre>`
renderer.codespan = (code) => `<code class="hljs">${code}</code>`

export const parseWithMarkdown = async (markdown: string) => {
  const result = await marked.parse(markdown, {
    gfm: true,
    renderer
  })
  return result ? result : markdown
}
