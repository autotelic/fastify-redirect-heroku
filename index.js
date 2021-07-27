'use strict'

const fp = require('fastify-plugin')

async function redirectHeroku (fastify, opts) {
  const { authHost, herokuAppName } = opts
  await fastify.addHook('onRequest', redirect)

  async function redirect (req, reply) {
    const { hostname, url } = req
    if (hostname.startsWith(herokuAppName)) {
      await reply.redirect(301, `${authHost}${url}`)
    }
  }
}

module.exports = fp(redirectHeroku, { name: 'fastify-redirect-heroku' })
