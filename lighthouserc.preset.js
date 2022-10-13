module.exports = {
  ci: {
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        'legacy-javascript': 'off', // ga-lite
      },
    },
  },
}
