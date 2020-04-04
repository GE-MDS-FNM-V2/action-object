# GE-FNM Action Object (@ge-fnm/action-object)

This is the Action Object used within the GE FNM.

[![Coverage Status](https://coveralls.io/repos/github/GE-MDS-FNM-V2/action-object/badge.svg?branch=master)](https://coveralls.io/github/GE-MDS-FNM-V2/action-object?branch=master)

This library is a common interface between all modules. It contains a standard format for transmitting data, as well as a standard error format.
If _any_ data is going to be transmitted between any module, or any consumer and CSM, use this object.

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

### ActionObject Creation and Serialization

Responding with a simple string
```js
import { v1, ActionTypeV1, CommunicationMethodV1 } from '@ge-fnm/action-object'

const obj = v1.create({
  version: 1,
  actionType: ActionTypeV1.GET,
  commData: {
    commMethod: CommunicationMethodV1.HTTP,
    protocol: ProtocolV1.JSONRPC,
    username: 'john',
    password: 'adams'
  },
  modifyingValue: 'test',
  path: ['hello', 'world'],
  response: {
    data: 'hello world',
    error: null // note that if error exists, it must be a serialized GEError
  },
  uri: 'http://localhost:5000'
})
```

Responding with an Error
```js

import { v1, ActionTypeV1, CommunicationMethodV1, GEErrors } from '@ge-fnm/action-object'
const GEPAMError = GEErrors.GEPAMError
const GEPAMErrorCodes = GEErrors.GEPAMErrorCodes
throw 
const obj = v1.create({
  version: 1,
  actionType: ActionTypeV1.GET,
  commData: {
    commMethod: CommunicationMethodV1.HTTP,
    protocol: ProtocolV1.JSONRPC,
    username: 'john',
    password: 'adams'
  },
  modifyingValue: 'test',
  path: ['hello', 'world'],
  response: {
    error: new GEPAMError('test message', GEPAMErrorCodes.ADD_CLIENT_ERROR) // note that if error exists, it MUST be a serialized GEError
  },
  uri: 'http://localhost:5000'
})
```

const serialized = obj.serialize()
const objAgain = v1.deserialize(serialized)
// objAgain now has all the same properties as obj except with an added 'id' property

// If you would like to initialize an ActionObject with a specific ID, you can do this:
// NOTE - unless for testing purposes you really shouldn't be doing this
const obj = v1.create(
  {
    ...information
  },
  'ThisIsAnOptionalID'
)
```

### GEError creation and serialization

```js
// for PAM
import { GEErrors } from '@ge-fnm/action-object'
const GEPAMError = GEErrors.GEPAMError
const GEPAMErrorCodes = GEErrors.GEPAMErrorCodes
throw new GEPAMError('test message', GEPAMErrorCodes.ADD_CLIENT_ERROR)

// for CSM
import { GEErrors } from '@ge-fnm/action-object'
const GECSMError = GEErrors.GECSMError
const GECSMErrorCodes = GEErrors.GECSMErrorCodes
throw new GECSMError('test message', GECSMErrorCodes.NO_FORWARDING_ADDRESS)

// for ActionObject itself - you really shouldnt consume this outside of this repo
import { GEErrors } from '@ge-fnm/action-object'
const GEActionObjectError = GEErrors.GEActionObjectError
const GEActionObjectErrorCodes = GEErrors.GEActionObjectErrorCodes
throw new GEActionObjectError('test message', GEActionObjectErrorCodes.DESERIALIZATION_ERROR)

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
