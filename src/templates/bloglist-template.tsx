import { useContext } from 'react'
import { CurrentPageContext } from './current-page-context'
import { PageWrapper } from './page-wrapper'
import { WebsiteContext } from './website-context'

export const BloglistTemplate = () => {
  const page = useContext(CurrentPageContext)
  const { pages } = useContext(WebsiteContext)
  const blogPosts = pages
    .filter((p) => p.isBlogPost && !p.isDraft)
    .sort((a, b) => b.modified - a.modified)

  return (
    <PageWrapper>
      <header>
        <span>thejunkland.com</span>
        <small>A blog and porfolio of Jesse Luoto</small>
      </header>

      <main>
        <article dangerouslySetInnerHTML={{ __html: page.content }}></article>

        <section>
          <nav>
            <ul>
              {blogPosts.map((post) => (
                <li key={post.src}>
                  <a href={`/${post.src}`}>{post.title}</a>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </main>
    </PageWrapper>
  )
}
