const test = require('tape')
const fs = require('fs')
const { keys, sign, verify } = require('../')

const key = fs.readFileSync(__dirname + '/key', 'utf-8')
const pubKey = fs.readFileSync(__dirname + '/key.pub', 'utf-8')

test('verify token', async t => {
  try {
    const token = sign(key)
    const result = await verify(token, pubKey, {
      audience: 'https://example.com',
      issuer: 'https://example.com'
    })
    t.ok(result)
  } catch (err) {
    t.ok(false)
  }
  t.end()
})


test('sign token', t => {
  const token = sign(key)
  t.ok(token)
  t.end()
})


test('create keys', async t => {
  const { pubKey, privKey } = await keys()
  t.ok(pubKey)
  t.ok(privKey)
  t.ok(/BEGIN PUBLIC KEY/.test(pubKey))
  t.ok(/BEGIN PRIVATE KEY/.test(privKey))
  t.end()
})

