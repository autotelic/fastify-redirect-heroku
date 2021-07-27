# Fastify Redirect Heroku

> A Fastify plugin to redirect away from a Heroku domain to an authorized host.

## Usage

```sh
npm i @autotelic/fastify-redirect-heroku
```

```js
const redirectHeroku = require('@autotelic/fastify-redirect-heroku')

module.exports = async function (fastify, options) {
  fastify.register(redirectHeroku, {
    authHost: 'https://example.com/',
    herokuAppName: 'example-api'
  })
}
```

#### API

### `Options`

| Name | Status | Type | Default | Description |
| ------- | :---: | :---: | :---: | --- |
| `authHost` | **Required** | String | - | The authorized host to redirect to |
| `herokuAppName` | **Required** | String | - | The name of the heroku app to redirect away from |
