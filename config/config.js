require('dotenv').config()

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> afe8fbb (setup project postgres)
module.exports = {
  development: {
    url: process.env.DB_URL,
    dialect: 'postgres'
<<<<<<< HEAD
  },
  test: {
    url: process.env.DB_URL,
    dialect: 'postgres'
  },
  production: {
    url: process.env.DB_URL,
    dialect: 'postgres'
  }
}
=======
const env = process.env.NODE_ENV || 'dev';
=======
const env = process.env.NODE_ENV || 'dev'
>>>>>>> 44a261d (cheking if husky works)

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

<<<<<<< HEAD
module.exports = config[env];
>>>>>>> 2e7b401 (running test errors solved)
=======
module.exports = config[env]
>>>>>>> 44a261d (cheking if husky works)
=======
  },
  test: {
    url: process.env.DB_URL,
    dialect: 'postgres'
  },
  production: {
    url: process.env.DB_URL,
    dialect: 'postgres'
  }
}

>>>>>>> afe8fbb (setup project postgres)
