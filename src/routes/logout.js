import express from 'express'
import logout from '../controllers/logout'
// import logoutAuth from '../middleware/logoutAuth'

const router = express.Router()

// Logout endpoint
/**
 * @swagger
 * /users/logout:
 *   get:
 *     tags:
 *       - Logout
 *     summary: Logout API
 *     description: Used to logout a user from their account
 *     responses:
 *       200:
 *         description: Successfully logged out of your Account
 */
router.get('/users/logout', logout)

export default router
