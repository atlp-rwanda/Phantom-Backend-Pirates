import express from 'express'
import changePassword from '../controllers/changePassword'
import changePasswordAuth from '../middleware/changePasswordAuth'

const router = express.Router()

// Change password endpoint documentation
// Change Password Schema
/**
 * @swagger
 * definitions:
 *   changepassword:
 *     properties:
 *       email:
 *         type: string
 *       oldPassword:
 *         type: string
 *       newPassword:
 *         type: string
 *       passwordConfirm:
 *         type: string
 */
/**
// Documentation
/**
 * @swagger
 * /changepassword:
 *   post:
 *     tags:
 *       - Change Password API
 *     summary: Change Password
 *     description: This is the change password API where a registered user should be able to change password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: Change Password
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/changepassword'
 *     responses:
 *       200:
 *         description: Your password was successfully changed
 */

router.post('/changepassword', changePasswordAuth, changePassword)

export default router
