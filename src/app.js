import express from 'express'
import logger from 'morgan'
import { sequelize } from '../models/index'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import i18next from 'i18next'
import i18nextMiddleware from 'i18next-express-middleware'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

// Required Routes
import welcomeRoute from './routes/welcomeRoute'
import login from './routes/login'
import roleRouter from './routes/role'
import busRouter from './routes/bus'
import companyRouter from './routes/company'
import viewBus from './routes/viewbus'
import userRoute from './routes/route'
import registerEmployeesRoute from './routes/registerEmployeesRoute'
import forgotpassword from './routes/forgotpassword'
import resetPassword from './routes/resetPassword'
import logout from './routes/logout'

dotenv.config()
// Initialize express app
const app = express()

app.use(i18nextMiddleware.handle(i18next))
app.use(i18nextMiddleware.handle(i18next))
// Morgan for the logger in the console
if (app.get('env') === 'development') {
  app.use(logger('dev'))
  console.log('Morgan logger is enabled...')
}
app.all('*', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, DELETE, GET')
  res.header('Access-Control-Max-Age', '3600')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token'
  )
  next()
})

app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: 'true' }))
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(cookieParser())

// Port
const port = process.env.APP_PORT || 3000
// Swagger Info Object
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Phantom API Documentation',
      description: 'Phantom API Documentation',
      contact: {
        name: 'Callback-Pirates'
      },
      server: `http://localhost:${port}`
    }
  },
  components: {
    securitySchemes: {
      jwt: {
        type: 'http',
        scheme: 'bearer',
        in: 'header',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [{
    jwt: []
  }],
  apis: ['./src/routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

// Use routes
app.use(welcomeRoute)
app.use(busRouter)
app.use(companyRouter)
app.use(login)
app.use(roleRouter)
app.use(viewBus)
app.use(userRoute)
app.use('/api/role', roleRouter)
app.use(registerEmployeesRoute)
app.use(forgotpassword)
app.use(resetPassword)
app.use(viewBus)
app.use(logout)

// hostname
const hostname = process.env.HOST_NAME

// Listening to requests
app.listen(port, async () => {
  console.log(`Server running at http://${hostname}:${port}/..`)
  await sequelize.authenticate()
  console.log('Database connected successfully')
})
export { app }
