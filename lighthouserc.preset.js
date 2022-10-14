module.exports = {
  ci: {
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        'legacy-javascript': 'off', // ga-lite
        'modern-image-formats': 'off', // handled by Cloudflare automagically
        'uses-responsive-images': 'off' // TODO
      }
    }
  }
}
