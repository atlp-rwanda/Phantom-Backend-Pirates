import express from 'express'
import logger from 'morgan'
import { sequelize } from '../models/index'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import i18next from 'i18next'
import i18nextMiddleware from 'i18next-express-middleware'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { Server } from 'socket.io'

// Required Routes
import welcomeRoute from './routes/welcomeRoute'
import login from './routes/login'
import roleRouter from './routes/role'
import busRouter from './routes/bus'
import companyRouter from './routes/company'
import viewBus from './routes/viewbus'
import userRoute from './routes/route'
import assignDriver from './routes/assignDriversToBuses'
import unassignDriver from './routes/unassignBusFromDriver'
import registerEmployeesRoute from './routes/registerEmployeesRoute'
import forgotpassword from './routes/forgotpassword'
import resetPassword from './routes/resetPassword'
import logout from './routes/logout'
import assignBusRoute from './routes/assignBusToRoute'
import changePassword from './routes/changePassword'

dotenv.config()
// Initialize express app
const app = express()

app.use(i18nextMiddleware.handle(i18next))
// Morgan for the logger in the console
if (app.get('env') === 'development') {
  app.use(logger('dev'))
}

app.all('*', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, PATCH, DELETE, GET')
  res.header('Access-Control-Max-Age', '3600')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers,Access-Control-Allow-Origin, Authorization, X-Requested-With, x-access-token'
  )
  next()
})

app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: 'true' }))
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

// Port & hostname
const port = process.env.APP_PORT || 3000
const hostname = process.env.HOST_NAME
// Swagger Info Object
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Phantom API Documentation',
      description: 'Phantom API Documentation',
      contact: {
        name: 'Callback-Pirates'
      },
      server: `http://${hostname}:${port}`
    }
  },

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
app.use(roleRouter)
app.use(registerEmployeesRoute)
app.use(forgotpassword)
app.use(resetPassword)
app.use(assignBusRoute)
app.use(logout)
app.use(changePassword)
app.use(unassignDriver)
app.use(assignDriver)

// Listening to requests
const serverApp = app.listen(port, async () => {
  console.log(`Server running at http://${hostname}:${port}/..`)
  await sequelize.authenticate()
})

const frontedUrl = process.env.REACT_APP_URL

const io = Server(serverApp, {
  cors: {
    origin: frontedUrl,
    methods: ['GET', 'POST']
  }
})

io.on('connection', (client) => {
  client.on('START', (data) => {
    client.broadcast.emit('START', data)
  })
  client.on('PAUSE', (data) => {
    client.broadcast.emit('PAUSE', data)
  })
})
export { app }
