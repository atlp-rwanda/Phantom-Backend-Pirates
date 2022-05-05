import express from 'express';
import Buses from '../controllers/bus';
import verifyAdminOperator from '../authorization/verifyAdmnOperator';
import verifyUser from '../authorization/verifyUser';
const router = express.Router();

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
 *    - name: authorization
 *      in: header
 *      required: true
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
 *    - name: authorization
 *      in: header
 *      required: true
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
 *      schema:
 *       $ref: '#/definitions/Bus'
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
 *       - name: authorization
 *         in: header
 *         required: true
 *       - name: id
 *         description: Bus's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */

router.post('/api/buses/:cid/bus', verifyUser, Buses.create); // create bus
router.get('/api/buses', Buses.listAll); // list all bus
router.get('/api/buses/:id', Buses.findbus); // list 1 bus
router.put('/api/buses/:id', verifyUser, Buses.modify); // update bus
router.delete('/api/buses/:id', verifyUser, Buses.delete); // delete bus

export default router;
