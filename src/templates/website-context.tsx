import { createContext } from 'react'
import { Page } from './current-page-context'

export interface Website {
  domain: string // full domain, including protocol
  pages: Page[]
  inlineStyles: string
}

export const WebsiteContext = createContext<Website>(null as never)
