import { Client } from 'twitter-api-sdk'
import dotenv from 'dotenv'
import fs from 'fs/promises'

dotenv.config()

const client = new Client(process.env.TWITTER_BEARER_TOKEN!)

const tweetId = process.argv[2]
if (!tweetId)
  throw new Error('No tweet ID provided. Usage: node tweet-to-md.ts <tweetId>')
console.log('Fetching thread to tweet ID', tweetId)

const main = async () => {
  const firstTweet = await client.tweets.findTweetById(tweetId, {
    'tweet.fields': [
      'conversation_id',
      'author_id',
      'created_at',
      'entities',
      'text'
    ]
  })
  const user = firstTweet.data?.author_id!
  const nextTweets = await client.tweets.usersIdTweets(user, {
    since_id: tweetId,
    max_results: 100,
    'tweet.fields': [
      'conversation_id',
      'author_id',
      'created_at',
      'entities',
      'text',
      'in_reply_to_user_id'
    ],
    expansions: ['referenced_tweets.id']
  })

  const tweets = [firstTweet.data!]
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    const latest = tweets.at(-1)!
    const nextTweet = nextTweets.data?.find(
      (t) =>
        t.referenced_tweets?.some(
          (r) => r.type === 'replied_to' && r.id === latest.id
        ) &&
        t.author_id === latest.author_id &&
        t.conversation_id === latest.conversation_id
    )
    if (!nextTweet) {
      break
    }
    tweets.push(nextTweet)
  }

  const md = tweets.map((t) => t.text).join('\n\n')
  const title = firstTweet.data?.text.split('\n')[0]!
  const titleSlug = title.toLowerCase().replace(/[^\w]+/g, '-')
  const modified = new Date(firstTweet.data?.created_at!).getTime()
  const header = [
    '---',
    `title: ${title}`,
    `modified: ${modified}`,
    'draft: true',
    '---',
    ''
  ].join('\n')

  const filename = `content/blog/${titleSlug}.md`
  fs.writeFile(filename, header + md)
  console.log('Saved draft to: ' + filename)
}
main()
