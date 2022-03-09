import login from '../controllers/login'
import express from 'express'

const router = express.Router()

// Login endpoint documentation
// Login Schema
/**
 * @swagger
 * definitions:
 *   Login:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 */
/**
// Documentation
/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - Login API
 *     summary: Phantom Login API
 *     description: This is the login API where a registered user should be able to login into Phantom Web app
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: login
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Login'
 *     responses:
 *       200:
 *         description: User successfully Logged in and the token was generated
 */

// End-point for user to login
router.post('/users/login', login)

export default router
