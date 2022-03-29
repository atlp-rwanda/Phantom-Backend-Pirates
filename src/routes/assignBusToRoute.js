import express from 'express';
import verifyUser from '../authorization/verifyUser';
import Buses from '../controllers/assignBusToRoute';

const router = express.Router();

/**
 * @swagger
 * definitions:
 *   AssignBusToRoute
 */

/**
 * @swagger
 * /api/routes/buses/{routeId}:
 *   get:
 *     tags:
 *       - Assign Buses to Route
 *     summary: get assigned buses to a specific route
 *     description: get assigned buses to a specific route
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: path
 *         required: true
 *         type: string
 *       - name: routeId
 *         description: route's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Buses assigned to route
 */

/**
 * @swagger
 * /api/routes/{routeId}/bus/{busId}:
 *  patch:
 *   tags:
 *    - Assign Buses to Route
 *   summary: Assign a bus to a Route
 *   description: Assign a bus to a Route
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - name: authorization
 *      in: header
 *      required: true
 *    - in: path
 *      name: routeId
 *      schema:
 *       type: integer
 *      required: true
 *      description: route id
 *      example: 1
 *    - in: path
 *      name: busId
 *      schema:
 *       type: integer
 *      required: true
 *      description: bus id
 *      example: 1
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json
 */

router.patch('/api/routes/:routeId/bus/:busId', verifyUser, Buses.assignBus);
router.get('/api/routes/buses/:routeId', Buses.busAssociatedToRoute);

export default router;
