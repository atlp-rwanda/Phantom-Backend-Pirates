require('dotenv').config()

const env = process.env.NODE_ENV // 'dev' or 'test'

const dev = {
  app: {
    port: 3000
  },
  db: {
    host: 'localhost',
    port: 5432,
    user: 'postgress',
    name: 'phantom_dev',
    dialect: 'postgress',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
}

const test = {
  app: {
    port: 8080
  },
  db: {
    host: 'localhost',
    port: 27017,
    user: 'postgress',
    name: 'phantom_test',
    dialect: 'postgress',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
}

const config = {
  dev,
  test
}

export default config[env]
