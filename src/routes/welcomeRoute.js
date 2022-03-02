import express from 'express'
import welcomeController from '../controllers/welcomeController'

/* use of i18n */
import i18next from 'i18next'
import Backend from 'i18next-node-fs-backend'
import i18nextMiddleware from 'i18next-http-middleware'
import { join } from 'path'

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector) // setting up language detection
  .init({
    backend: {
      loadPath: join(__dirname, '../../resources/locales/{{lng}}/{{ns}}.json')
    },
    fallbackLng: 'en', // defines your default language
    preload: ['en', 'rw', 'fr'] // supported languages
  })

const router = express.Router()

// Welcome endpoint
/**
 * @swagger
 * /:
 *  get:
 *    description: Used to display the Welcome Page
 *    responses:
 *      '200':
 *        description: The Welcome Page was displayed successfully
 */
router.get('/', welcomeController)

export default router
