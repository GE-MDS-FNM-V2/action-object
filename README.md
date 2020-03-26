# GE-FNM Action Object (@ge-fnm/action-object)
This is the Action Object used within the GE FNM.

[![Coverage Status](https://coveralls.io/repos/github/GE-MDS-FNM-V2/action-object/badge.svg?branch=master)](https://coveralls.io/github/GE-MDS-FNM-V2/action-object?branch=master)

This library is mainly used within the communication-selector-module and the perform-action-module.

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
### Example Usage
Here is an example of how to use it in a browser

```js
import { v1, ActionTypeV1, CommunicationMethodV1 } from './action-object'

const obj = v1.create({
    actionType: ActionTypeV1.GET,
    commMethod: CommunicationMethodV1.JSONRPC,
    modifyingValue: 'test',
    path: ['hello', 'world'],
    response: undefined,
    uri: 'http://localhost:5000'
})

const serialized = obj.serialize()
const objAgain = v1.deserialize(serialized)
// objAgain now has all the same properties as obj except with an added 'id' property

// If you would like to initialize an ActionObject with a specific ID, you can do this:
// NOTE - unless for testing purposes you really shouldn't be doing this
const obj = v1.create({
    actionType: ActionTypeV1.GET,
    commMethod: CommunicationMethodV1.JSONRPC,
    modifyingValue: 'test',
    path: ['hello', 'world'],
    response: undefined,
    uri: 'http://localhost:5000'
}, "ThisIsAnOptionalID")
```

## Debugging
We've added in optional logging to this module. You can enable it by setting the environment variable DEBUG:
```sh
DEBUG=ge-fnm:action-object yarn #to enable logging for only the action-object module
-or-
DEBUG=ge-fnm:* yarn # for all logging related to ge-fnm
-or-
DEBUG=* yarn # enable logging for all installed node_modules that look for the env var DEBUG - please note, this is a lot. You probably dont want this

```
## I want to work on this project
Please see [CONTRIBUTING.md](CONTRIBUTING.md)