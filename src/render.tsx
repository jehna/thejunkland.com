import { CurrentPageContext, Page } from './templates/current-page-context'
import { Website, WebsiteContext } from './templates/website-context'

interface Props {
  website: Website
  currentPage: Page
  template: React.FC
}

export const Render: React.FC<Props> = ({
  website,
  currentPage,
  template: Template
}) => {
  return (
    <WebsiteContext.Provider value={website}>
      <CurrentPageContext.Provider value={currentPage}>
        <Template />
      </CurrentPageContext.Provider>
    </WebsiteContext.Provider>
  )
}
