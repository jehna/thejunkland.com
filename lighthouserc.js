module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/blog/howtoget.html',
        'http://localhost:3000/blog/how-to-write-good-readme.html'
      ],
      startServerCommand: 'yarn start'
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
}
