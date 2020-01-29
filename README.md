# GE-FNM Data Model (@ge-fnm/action-object)
The internal data model and plain-text -> internal data model parsers for the GE Field Network Manager

[![Coverage Status](https://coveralls.io/repos/github/GE-MDS-FNM-V2/action-object/badge.svg?branch=master)](https://coveralls.io/github/GE-MDS-FNM-V2/action-object?branch=master)

## I would like to use the library in my app
To get started with the repository in your project install it like this
### Install with yarn
```
yarn add @ge-fnm/action-object
```
### Install with npm
```
npm i @ge-fnm/action-object
```

### I am using this in a node.js application

Here is an example node application using the action-object
```js
const GE = require("@ge-fnm/action-object")
```

### I am using this in a browser

Here is an example of how to use it in a browser
```js
import GE from "@ge-fnm/action-object"
```

### Documentation
Documentation can be found here - https://ge-mds-fnm-v2.github.io/action-object/

## I want to work on this project
Please see [CONTRIBUTING.md](CONTRIBUTING.md)


### Excluding peerDependencies

On library development, one might want to set some peer dependencies, and thus remove those from the final bundle. You can see in [Rollup docs](https://rollupjs.org/#peer-dependencies) how to do that.

Good news: the setup is here for you, you must only include the dependency name in `external` property within `rollup.config.js`. For example, if you want to exclude `lodash`, just write there `external: ['lodash']`.
