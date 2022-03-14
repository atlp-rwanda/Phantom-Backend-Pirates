import express from 'express'
import Companies from '../controllers/company'
import verifyAdminOperator from '../authorization/verifyAdmnOperator'
const route = express.Router()

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

route.post('/api/company', verifyAdminOperator, Companies.create) // create company route
route.get('/api/company', Companies.listAll) // list all company
route.get('/api/company/:id', Companies.list) // List 1 company
route.put('/api/company/:id', verifyAdminOperator, Companies.modify) // update company
route.delete('/api/company/:id', verifyAdminOperator, Companies.delete) // delete company

export default route
