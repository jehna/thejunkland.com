import { Fragment, useContext } from 'react'
import { CurrentPageContext } from './current-page-context'
import { WebsiteContext } from './website-context'

interface Props {
  children: React.ReactNode
}

export const PageWrapper: React.FC<Props> = ({ children }) => {
  const { pages, inlineStyles } = useContext(WebsiteContext)
  const currentPage = useContext(CurrentPageContext)

  const menuPages = pages
    .filter((page) => page.showInMainMenu)
    .sort((a, b) => a.menuOrder - b.menuOrder)
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <style dangerouslySetInnerHTML={{ __html: inlineStyles }} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>{currentPage.title}</title>
        {currentPage.description && (
          <meta name="description" content="<%= doc.description %>" />
        )}
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className={currentPage.isDraft ? 'draft' : undefined}>
        {children}
        <footer>
          <p>This site was made with &#9825; by Jesse Luoto.</p>
          <p>
            Header font is{' '}
            <a href="https://www.google.com/fonts/specimen/Oswald">
              Oswald Regular
            </a>{' '}
            from Google Fonts
          </p>
          <nav>
            {menuPages.map((page) => (
              <Fragment key={page.src}>
                <a
                  href={page.path}
                  className={
                    currentPage.src === page.src ? 'active' : undefined
                  }
                >
                  {page.menuTitle ?? page.title}
                </a>{' '}
              </Fragment>
            ))}
          </nav>
        </footer>

        <script
          src="/scripts.js"
          nonce="nonce-local-script"
          async
          type="module"
        ></script>
      </body>
    </html>
  )
}
