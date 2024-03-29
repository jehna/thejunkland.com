# thejunkland.com
> A personal blog and portfolio of Jesse Luoto

A blog since 2010!

## Getting Started

Install the project's dependencies by running:

```
yarn
```

And then build & run the development server:

```
yarn build
yarn start
```

You can run the watch mode for development:

```
yarn watch
```

This watches all files in the project directory for changes and reuilds the site
when something changes. Note that watch mode does not run image minifications,
so Lighthouse tests may fail.

### Setup
To use the project as your own website, you might want to change the following
parameters from `package.json` file.

#### website
Type: `String`

Defines the base URL for your website. Used, where the full, absolute URL is
needed.


### Deploying

This site is automatically deployed using [Netlify](https://www.netlify.com/).

## Contributions

If you find a bug (or even a typo), please open an issue. You are free to
improve the site via pull requests.

You also may use an issue or a pull request to request a quest blogging.

## Licensing

The code in this project is licensed under MIT license (see LICENSE-MIT file).

The content (texts in `content/*.md` files, images) is licensed under a
Creative Commons Attribution-NonCommercial 2.5 License (see LICENSE-CC file).
