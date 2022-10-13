import { BloglistTemplate } from './bloglist-template'
import { DefaultTemplate } from './default-template'

export const templates = {
  default: DefaultTemplate,
  bloglist: BloglistTemplate
} as const
