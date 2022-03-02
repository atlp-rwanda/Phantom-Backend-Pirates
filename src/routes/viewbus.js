import express from 'express'
import ViewBus from '../controllers/viewbuslist'
const route = express.Router()

// View Bus API

/**
*  @swagger
*  tags:
*    name: View
*    description: API to manage your Companies.
*/

/**
 * @swagger
 * definitions:
 *   View:
 *     properties:
 *       source:
 *         type: string
 *       destination:
 *         type: string
 */

/**
 * @swagger
 * /api/viewbus:
 *   post:
 *     tags:
 *       - View
 *     summary: Retrieve all bus in route
 *     description: Use can view all bus in route
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         description: body of the view bus
 *         schema:
 *           $ref: '#/definitions/View'
 *     resquestBody:
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/View'
 *     responses:
 *       200:
 *         description: Bus successfull retrieved
 *       500:
 *         description: error
 */
route.post('/api/viewbus', ViewBus.findbus)

export default route
