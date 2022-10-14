import { useContext } from 'react'
import { CurrentPageContext } from './current-page-context'
import { PageWrapper } from './page-wrapper'

export const ThankYouTemplate = () => {
  const page = useContext(CurrentPageContext)
  return (
    <PageWrapper>
      <header>
        <span>Subscribed!</span>
      </header>
      <main>
        <article dangerouslySetInnerHTML={{ __html: page.content }}></article>
      </main>
    </PageWrapper>
  )
}
