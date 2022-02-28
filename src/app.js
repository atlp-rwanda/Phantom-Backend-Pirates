import express from 'express'
import logger from 'morgan'
import { sequelize } from '../models/index'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import bodyParser from 'body-parser'
import dotenv from "dotenv"

dotenv.config();

// Required Routes
import welcomeRoute from './routes/welcomeRoute'
import userRoute from './routes/user'
import welcomeRoute from './routes/welcomeRoute'
import user from './routes/user'
import login from './routes/login'
import i18next from 'i18next'
import i18nextMiddleware from 'i18next-express-middleware'
// Initialize express app
const app = express()

// telling Express to use i18next's middleware
app.use(i18nextMiddleware.handle(i18next))
// Morgan for the logger in the console
if (app.get('env') === 'development') {
  app.use(logger('dev'))
  console.log('Morgan logger is enabled...')
}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> afe8fbb (setup project postgres)
app.all('*', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, DELETE, GET')
  res.header('Access-Control-Max-Age', '3600')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token')
  next()
})
<<<<<<< HEAD

app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: 'true' }))
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
=======
app.all('*', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Max-Age", "3600");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token");
  next();
});

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '50mb','extended': 'true'}));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
>>>>>>> a0086c9 (setup postgres PR review)
=======

app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: 'true' }))
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
>>>>>>> afe8fbb (setup project postgres)

// Swagger Info Object
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Phantom API Documentation',
      description: 'Phantom API Documentation',
      contact: {
        name: 'Callback-Pirates'
      },
      server: 'http://localhost:3000'
    }
  },
  apis: ['./src/routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

<<<<<<< HEAD
// Use routes
app.use(welcomeRoute)
app.use(user)
app.use(login)
// port & hostname
const port = process.env.APP_PORT || 3000
const hostname = 'localhost'
=======
// Custom Middleware
app.use(welcomeRoute)

// PORT
const port = process.env.APP_PORT || 3000
>>>>>>> a0086c9 (setup postgres PR review)

// Listening to requests
<<<<<<< HEAD
app.listen(port, async () => {
  console.log(`Server running at http://${hostname}:${port}/..`)
  await sequelize.authenticate()
  console.log('Databse connected successfully')
=======
app.listen(port, () => {
  console.log(`Server running on port ${port}..... `)
>>>>>>> afe8fbb (setup project postgres)
})

export { app }
