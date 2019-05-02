const jwk = require('jwk-lite')
const jwk2pem = require("jwk-to-pem")
const jwt = require('jsonwebtoken')
const { compose, merge, omit } = require('ramda')
const uuid = require('uuid')
const alg = "ES512"

module.exports = Object.freeze({
  keys, sign, verify
})

/**
 * verify
 *
 * @param {string} token - JWT Token
 * @param {string} pem - Public Key
 * @param {object} options - contains issuer and audience for validation checks
 */

function verify(token, pem, options={}) {
  return new Promise(function (resolve, reject) {
    jwt.verify(token, pem, options, (err, result) => {
      if (err) { reject(err) }
      resolve(result)
    })
  })
}

const payloadDefaults = {
  iss: 'https://example.com',
  aud: 'https://example.com',
  exp: Math.round(Date.now() / 1000 + 7200), // default 2 hours
  iat: Math.round(Date.now() / 1000),
  sub: '1'
}

const headerDefaults = {
  alg,
  typ: 'JWT'
}

/**
 * sign
 *
 * @param {string} pem
 * @param {object} payload
 * @param {object} options
 */

function sign(pem='', payload=payloadDefaults, options={header: headerDefaults}) {
  return jwt.sign(payload, pem, options)
}

/**
 * keys
 *
 * generate ES512 public/private keys
 *
 */
async function keys() {
  const results = await jwk.generateKey(alg)
  const privateJwk = convert(await jwk.exportKey(results.privateKey))
  const publicJwk = convert(await jwk.exportKey(results.publicKey))
  const privKey = jwk2pem(privateJwk, { private: true })
  const pubKey = jwk2pem(publicJwk)

  return { pubKey, privKey }

}


function convert (k) {
  const core = { kid: uuid.v4(), alg, use: "sig" };
  const unneededKeys = ["ext", "key_ops"];
  return compose(merge(core), omit(unneededKeys))(k)
}
