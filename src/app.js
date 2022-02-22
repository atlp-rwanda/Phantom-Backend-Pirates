import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import dotenv from "dotenv";
import db from './models/user';
import "@babel/polyfill";
dotenv.config();
// Required Routes
import welcomeRoute from './routes/welcomeRoute';
import UserRoutes from './routes/user';

db.sequelize.sync();
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

//middlewares
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

// Custom Middleware
app.use(welcomeRoute);
app.use('/api/user', UserRoutes)


// PORT
const port = process.env.PORT || 3000

// Listening to requests
app.listen(port, () => {
  console.log(`Server running on port ${port}..... `)
})

export default app
