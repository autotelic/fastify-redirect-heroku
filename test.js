const { test } = require('tap')
const Fastify = require('fastify')

const redirect = require('.')

test('if host name starts with heroku app name, redirect to custom domain', async ({ equal, end }) => {
  const reqHost = 'http://example-api.herokuapp.com'
  const reqPath = '/foo'
  const authHost = 'http://example.com'

  const fastify = Fastify()

  fastify.register(redirect, {
    authHost: authHost,
    herokuAppName: 'example-api'
  })

  const response = await fastify.inject({
    method: 'GET',
    url: `${reqHost}${reqPath}`
  })

  equal(response.headers.location, `${authHost}${reqPath}`, 'response should redirect to custom domain')

  equal(response.statusCode, 301)

  end()
})

test('if host name does NOT start with heroku app name, do NOT redirect to custom domain', async ({ not, end }) => {
  const reqHost = 'http://example.com'
  const reqPath = '/foo'
  const authHost = 'http://example.com'

  const fastify = Fastify()

  fastify.register(redirect, {
    authHost: authHost,
    herokuAppName: 'example-api'
  })

  const response = await fastify.inject({
    method: 'GET',
    url: `${reqHost}${reqPath}`
  })

  not(response.statusCode, 301)

  end()
})
