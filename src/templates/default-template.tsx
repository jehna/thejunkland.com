import { useContext } from 'react'
import { CurrentPageContext } from './current-page-context'
import { PageWrapper } from './page-wrapper'
import { TwitterShare } from './twitter-share'

export const DefaultTemplate: React.FC = () => {
  const page = useContext(CurrentPageContext)

  return (
    <PageWrapper>
      <header>
        <span>{page.title}</span>
        {page.isBlogPost && <small>A blog post by Jesse Luoto</small>}
      </header>

      <main>
        <article>
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
          {page.isBlogPost && (
            <>
              <TwitterShare />
              <form
                action="https://script.google.com/macros/s/AKfycbxRbnrX_4N2LPp7P2DIYuVA9BqnZeJPKHZaNedhjakItb9Rxm83/exec"
                method="POST"
              >
                <h3>Be the first to know from new&nbsp;blog&nbsp;posts</h3>
                <p>
                  Subscribe to the mailing list to get priority access to new
                  blog posts!
                </p>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    aria-label="Your email address"
                  />
                </div>
                <button type="submit">Subscribe!</button>
              </form>
            </>
          )}
        </article>
      </main>
    </PageWrapper>
  )
}
