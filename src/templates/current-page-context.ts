import { createContext } from 'react'
import { templates } from './templates'

export interface Page {
  showInMainMenu: boolean
  menuOrder: number
  src: string
  path: string
  title: string
  menuTitle?: string
  isBlogPost: boolean
  content: string
  isDraft: boolean
  description?: string
  template: keyof typeof templates
  modified: number
  hidden: boolean
}

export const CurrentPageContext = createContext<Page>(null as never)
