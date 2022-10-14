import { Page } from './templates/current-page-context'
import { Website } from './templates/website-context'
import {
  EnumChangefreq,
  SitemapItem,
  SitemapStream,
  streamToPromise
} from 'sitemap'
import { Readable } from 'stream'

export const createSitemap = async (pages: Page[], website: Website) => {
  const stream = new SitemapStream({ hostname: website.domain })
  const pageLinks: SitemapItem[] = pages
    .filter(
      (page) => !page.hidden && !page.isDraft && page.template !== 'bloglist'
    )
    .map((page) => ({
      url: page.src,
      lastmod: '',
      changefreq: EnumChangefreq.NEVER,
      priority: 0.5,
      img: [],
      links: [],
      video: []
    }))
  const latestChange = pages.reduce(
    (last, page) => (last < page.modified ? page.modified : last),
    0
  )
  const mainPage: SitemapItem = {
    url: '/',
    lastmod: new Date(latestChange).toISOString(),
    changefreq: EnumChangefreq.WEEKLY,
    priority: 0.3,
    img: [],
    links: [],
    video: []
  }
  return streamToPromise(
    Readable.from([mainPage, ...pageLinks]).pipe(stream)
  ).then((data) => data.toString())
}
