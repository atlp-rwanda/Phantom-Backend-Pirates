import express from 'express'
import logger from 'morgan'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import config from '../config/config.js'

// Required Routes
import welcomeRoute from './routes/welcomeRoute'

// Initialize express app
const app = express()

// Morgan for the logger in the console
if (app.get('env') === 'development') {
  app.use(logger('dev'))
  console.log('Morgan logger is enabled...')
}

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

// Custom Middleware
app.use(welcomeRoute)

// PORT
const port = config.app.port

// Listening to requests
app.listen(port, () => {
  console.log(`Server running on port ${port}..... `)
})

export default app
