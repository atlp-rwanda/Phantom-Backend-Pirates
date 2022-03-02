import express from 'express'
import Buses from '../controllers/bus'
import verifyAdminOperator from '../authorization/verifyAdmnOperator'
const route = express.Router()

// Buses API

/**
*  @swagger
*  tags:
*    name: Bus
*    description: API to manage your Buses.
*/
/**
 * @swagger
 * definitions:
 *   Bus:
 *     properties:
 *       plate:
 *         type: string
 *       category:
 *         type: string
 *       seat:
 *         type: integer
 *       status:
 *         type: string
 *       rout_id:
 *         type: integer
 *       cid:
 *         type: integer
 */
// create new company Doc
/**
 * @swagger
 * /api/buses/{cid}/bus:
 *  post:
 *   tags:
 *    - Bus
 *   summary: create bus API
 *   description: create bus
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: cid
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of company
 *      example: 1
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *       $ref: '#/definitions/Bus'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Bus'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Bus'
 */

/**
 * @swagger
 * /api/buses:
 *   get:
 *     tags:
 *       - Bus
 *     summary: Retrieve all buses API
 *     description: Returns all Buses
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of all buses
 *         schema:
 *           $ref: '#/definitions/Bus'
 */

/**
 * @swagger
 * /api/buses/{id}:
 *   get:
 *     tags:
 *       - Bus
 *     summary: Retrieve single bus API
 *     description: Returns a single bus
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Bus's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single bus
 *         schema:
 *           $ref: '#/definitions/Bus'
 */

/**
 * @swagger
 * /api/buses/{id}:
 *  put:
 *   tags:
 *    - Bus
 *   summary: update bus API
 *   description: update bus
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of bus
 *      example: 1
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *       $ref: '#/definitions/Bus'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Bus'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Bus'
 */

/**
  * @swagger
  * /api/buses/{id}:
  *   delete:
  *     tags:
  *       - Bus
  *     summary: Delete bus API
  *     description: Deletes a single bus
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: id
  *         description: Bus's id
  *         in: path
  *         required: true
  *         type: integer
  *     responses:
  *       200:
  *         description: Successfully deleted
  */

route.post('/api/buses/:cid/bus', verifyAdminOperator, Buses.create) // create bus
route.get('/api/buses', Buses.listAll) // list all bus
route.get('/api/buses/:id', Buses.list) // list 1 bus
route.put('/api/buses/:id', verifyAdminOperator, Buses.modify) // update bus
route.delete('/api/buses/:id', verifyAdminOperator, Buses.delete) // delete bus

export default route
