import { BloglistTemplate } from './bloglist-template'
import { DefaultTemplate } from './default-template'
import { ThankYouTemplate } from './thankyou-template'

export const templates: Record<string, React.FC> = {
  default: DefaultTemplate,
  bloglist: BloglistTemplate,
  thankyou: ThankYouTemplate
}
