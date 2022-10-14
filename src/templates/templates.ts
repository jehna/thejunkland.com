import { BloglistTemplate } from './bloglist-template'
import { DefaultTemplate } from './default-template'
import { ThankYouTemplate } from './thankyou-template'

export const templates = {
  default: DefaultTemplate,
  bloglist: BloglistTemplate,
  thankyou: ThankYouTemplate
} as const
