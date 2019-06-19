<p align="center">
  <a href="https://axier.io/">
    <img width="200" height="85" src="https://i.imgur.com/Nevc4Gq.png" alt="axier logo">
  </a>
</p>

<h1 align="center">Angular JS & Auth0 Boilerplate</h1>

<p align="center">
  <b>A small Angular JS boilerplate project with Auth0 integration</b></br>
</p>

<p align="center">
  <sub>Made with ❤️ by <a href="https://www.linkedin.com/in/iestyn-d-24765273/">Iestyn Dalli</a></sub>
</p>

## ❯ Why

I cycled through a couple of AngularJS boilerplates for a commercial project I was working on.  None of them really seemed to fit the bill so I decided to start from scratch and this is the result.

Try it! I am happy to hear your feedback, and star if you like it ⭐

## Features

* Hot reload when changes are saved
* Desktop notification if breaking changes are introduced
* Auth0 integration
* Bundling and minification using Gulp
* Scalable and neat app directory structure using [John Papa's Angular JS Styleguide](https://github.com/johnpapa/angular-styleguide)

## Requirements

For development, you will only need Node.js on your environment.

You will need an Auth0 account to have the authentication/authorization aspect to work.  [Here](https://auth0.com/docs/getting-started/the-basics) is a basic guide to explain the process of setting up a auth0 client.

Also you would need to create a `.js` file named `auth0.variables.js` under `./src/app`

```
./
+--src
|   +--app
|   |   ---auth0.variables.js
```

##### auth0.variables.js

```javascript
var AUTH0_AUDIENCE = '';
var AUTH0_CLIENT_ID = '';
var AUTH0_DOMAIN = '';
var AUTH0_CALLBACK_URL = '';
```

### Node

[Node](http://nodejs.org/) is really easy to install
You should be able to run the following commands after the installation procedure
below.

    $ node --version
    v8.11.2

    $ npm --version
    v5.6.0

## Getting started

1. Clone
* $ `git clone git@github.com:iestyn02/AngularJS-Boilerplate.git`

2. Build
  * $ `cd angularjs-boilerplate`
  * $ `npm i`
  * $ `npm start`

## Scripts

* `npm build` or `npm run build` - produces production version of your library under the `lib` folder
* `npm run dev` - produces development version of your library and runs a watcher

## Build & Serve

* $ cd es6-technical
* $ npm run build
* $ library is now bundled, you can import the module like this `const lib = require('../lib/field-aware-technical');`

## Live Demo

[Live Demo](https://angular.axier.io/)

## License

MIT
