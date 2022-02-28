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
 *       - role
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
 *   summary: update role
 *   description: update role
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
 *       - role
 *     summary: delete a role
 *     description: Deletes a single role
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
 *         description: Successfully deleted
 */

router.post('/', verifyAdmin, Roles.createRole)
router.get('/', Roles.allRoles)
router.put('/:roleId', verifyAdmin, Roles.update)
router.get('/:roleId', Roles.getSingleRole)
router.delete('/:roleId', verifyAdmin, Roles.delete)

export default router
