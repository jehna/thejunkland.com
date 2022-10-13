module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/blog/howoget.html',
      ],
      startServerCommand: 'yarn start',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
