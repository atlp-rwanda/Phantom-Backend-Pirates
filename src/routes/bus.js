import express from 'express';
import Buses from '../controllers/bus';
import Companies from '../controllers/company';
const route = express.Router();

// Company API

/**
 *  @swagger
 *  tags:
 *    name: Company
 *    description: API to manage your Companies.
 */

/**
 * @swagger
 * definitions:
 *   Company:
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 */

route.post('/api/company', Companies.create);

// create new company Doc
/**
 * @swagger
 * /api/company:
 *   post:
 *     tags:
 *       - Company
 *     summary: Create company API
 *     description: Creates a new Company
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         description: body of the company
 *         schema:
 *           $ref: '#/definitions/Company'
 *     resquestBody:
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/Company'
 *     responses:
 *       200:
 *         description: Company Successfully created
 *       500:
 *         description: error
 */

route.get('/api/company', Companies.listAll);
// Get all company
/**
 * @swagger
 * /api/company:
 *   get:
 *     tags:
 *       - Company
 *     summary: Retrieve all company API
 *     description: Returns all companies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of all companies
 *         schema:
 *           $ref: '#/definitions/Company'
 */

route.get('/api/company/:id', Companies.list);
// Get company by ID

/**
 * @swagger
 * /api/company/{id}:
 *   get:
 *     tags:
 *       - Company
 *     summary: Retrieve single company API
 *     description: Returns a single company
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Company's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single company
 *         schema:
 *           $ref: '#/definitions/Company'
 */

route.put('/api/company/:id', Companies.modify);
/**
 * @swagger
 * /api/company/{id}:
 *  put:
 *   tags:
 *    - Company
 *   summary: update company API
 *   description: update company
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
 *      description: id of company
 *      example: 1
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *       $ref: '#/definitions/Company'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Company'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Company'
 */

route.delete('/api/company/:id', Companies.delete);

/**
 * @swagger
 * /api/company/{id}:
 *   delete:
 *     tags:
 *       - Company
 *     summary: Delete company API
 *     description: Deletes a single company
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Company's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */

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
route.post('/api/buses/:cid/bus', Buses.create);
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
route.get('/api/buses', Buses.listAll);

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
route.get('/api/buses/:id', Buses.list);

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
route.put('/api/buses/:id', Buses.modify);

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
 *       schema:
 *        $ref: '#/definitions/Bus'
 */

route.delete('/api/buses/:id', Buses.delete);

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

export default route;
