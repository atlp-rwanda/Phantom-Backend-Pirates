import express from 'express'
import resetPassword from '../controllers/resetPassword'
import resetAuth from '../middleware/resetAuth'

const router = express.Router()

// Reset password endpoint documentation
// Resetpassword Schema
/**
 * @swagger
 * definitions:
 *   Reset:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       passwordConfirm:
 *          type: string
 */
/**
// Documentation
/**
 * @swagger
 * /reset/{token}:
 *   post:
 *     tags:
 *       - Reset Password API
 *     summary: Phantom Reset Password API
 *     description: This is the reset API where a registered user should be able to rest password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: Token
 *         in: path
 *         required: true
 *         type: string
 *       - name: reset password body
 *         description: Reset Password
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Reset'
 *     responses:
 *       200:
 *         description: User successfully reset password
 */

router.post('/reset/:token', resetAuth, resetPassword)

export default router
