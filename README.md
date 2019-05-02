# ec-auth 

ECDSA uses private public key pairs to generate JWTs. This module creates an api wrapper around the process of generating a pub/priv key pair and signing a JWT and validating a JWT with a pub key.

## ES512

Currently the module defaults to ES512, if you need to use differnt alg, 
check out jwk-lite, jwk-to-pem, and jsonwebtoken.

## Methods

* keys()
* sign(pub, private, data)
* valid(jwt, pub)

## Install

```
npm install @twilson63/ec-auth
```

## Usage

> keys and verify are promises

```
const { keys, sign, verify } = require('ec-auth')

const { pubKey, privKey } = await keys()
const jwt = sign(pubKey, privKey, { hello: "world" })
console.log(await verify(jwt, pubKey))
```

## License

MIT

## Contributions

pull request welcome

## Thanks

* CryptoGods!
