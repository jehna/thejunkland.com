# thejunkland.com
> A personal blog and portfolio of Jesse Luoto

This site is built on top of Grunt.

## Getting Started
Install the project by running:

```
npm install
```

This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.
Once you're familiar with that process, you may compile this project using:

```bash
grunt
```

This compiles the project to `build/` folder and starts a local web server that
autoreloads files as you change them.

### Setup
To use the project as your own website, you might want to change the following
parameters from `package.json` file.

#### website
Type: `String`  
Template: `<%= site.pkg.website %>`

Defines the base URL for your website. Used, where the full, absolute URL is
needed.


#### scp
Type: `String`  
Format: `username@domain:path`

The SCP configuration for the `grunt deploy` task. All the built files will be
copied to the destination path on the server.

### Deploying
You can deploy the project straight to your web server (using SCP) by entering
the following command:

```
grunt deploy
```

Note that after the clean build, this command will prompt for the SCP password
for the user defined in the `package.json` file.

## Contributions
If you find a bug (or even a typo), please open an issue. You are free to
improve the site via pull requests.

You also may use an issue or a pull request to request a quest blogging.

## Licensing
The code in this project is licensed under MIT license (see LICENSE-MIT file).

The content (texts in `content/*.md` files, images) is licensed under a
Creative Commons Attribution-NonCommercial 2.5 License (see LICENSE-CC file).
