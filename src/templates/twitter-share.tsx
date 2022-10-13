import { useContext } from 'react'
import { CurrentPageContext } from './current-page-context'
import { WebsiteContext } from './website-context'

export const TwitterShare = () => {
  const page = useContext(CurrentPageContext)
  const website = useContext(WebsiteContext)
  const fullUrl = `${website.domain}${page.src}`
  const tweet = `"${page.title}" by @luotojesse ${fullUrl}`
  const tweetUrl =
    'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweet)

  return (
    <p>
      <a
        href={tweetUrl}
        className="twittershare"
        target="_blank"
        rel="noopener"
      >
        Tweet
      </a>
    </p>
  )
}
