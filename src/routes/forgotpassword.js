import express from 'express'
import forgotpassword from '../controllers/forgotpassword'

const router = express.Router()
// forgotpassword endpoint documentation
// Forgot Schema
/**
 * @swagger
 * definitions:
 *   forgotpassword:
 *     properties:
 *       email:
 *         type: string
 */
/**
// Documentation
/**
 * @swagger
 * /forgotpassword:
 *   post:
 *     tags:
 *       - Forgotpassword API
 *     summary: Forgot Password
 *     description: This is the forgotpassword API where a registered user should be able to reset password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: Forgot Password
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/forgotpassword'
 *     responses:
 *       200:
 *         description: Please check your email to reset your password
 */

router.post('/forgotpassword', forgotpassword)

export default router
