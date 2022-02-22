require('dotenv').config()

const env = process.env.NODE_ENV // 'dev' or 'test'

const dev = {
  app: {
    port: parseInt(process.env.APP_PORT)
  },
  db: {
    host: process.env.HOST,
    port: parseInt(process.env.DB_PORT_DEV),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME_DEV
  }
}

const test = {
  app: {
    port: process.env.APP_PORT
  },
  db: {
    host: process.env.HOST,
    port: parseInt(process.env.DB_PORT_TEST),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME_TEST
  }
}

const config = {
  dev,
  test
}

module.exports = config[env]
