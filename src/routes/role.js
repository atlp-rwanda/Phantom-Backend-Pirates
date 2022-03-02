import Roles from '../controllers/roleController'
import express from 'express'
import verifyAdmin from '../authorization/verifyAdmin'

const router = express.Router()

// setting up swagger definition
/**
 * @swagger
 * definitions:
 *   Role:
 *     properties:
 *       role:
 *         type: string
 */

/**
 * @swagger
 * /api/role:
 *   post:
 *     tags:
 *       - Role
 *     summary: ccreate a role
 *     description: Admin is able to create a role
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         required: true
 *       - name: role
 *         description: role name
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Role'
 *     responses:
 *       200:
 *         description: Role created successfully
 */

/**
 * @swagger
 * /api/role:
 *   get:
 *     tags:
 *       - Role
 *     summary: get all roles
 *     description: Returns all roles
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of roles
 */

/**
 * @swagger
 * /api/role/{id}:
 *   get:
 *     tags:
 *       - Role
 *     summary: get role by id
 *     description: Returns a single role
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: role's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single role
 */

/**
 * @swagger
 * /api/role/{id}:
 *  put:
 *   tags:
 *    - Role
 *   summary: update role
 *   description: update role
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
 *      description: id of role
 *      example: 1
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *       $ref: '#/definitions/Role'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Role'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Role'
 */

/**
 * @swagger
 * /api/role/{id}:
 *   delete:
 *     tags:
 *       - Role
 *     summary: delete a role
 *     description: Deletes a single role
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         required: true
 *       - name: id
 *         description: role's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */

router.post('/api/role/', verifyAdmin, Roles.createRole)
router.get('/api/role/', Roles.allRoles)
router.put('/api/role/:roleId', verifyAdmin, Roles.update)
router.get('/api/role/:roleId', Roles.getSingleRole)
router.delete('/api/role/:roleId', verifyAdmin, Roles.delete)

export default router
