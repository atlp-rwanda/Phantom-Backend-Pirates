import express from 'express';
import Buses from '../controllers/assignBusToDrivers';
import verifyUser from '../authorization/verifyUser';
const router = express.Router();

// Welcome endpoint

/**
 * @swagger
 * /api/drivers/buses:
 *   get:
 *     tags:
 *       - View list of buses assigned to drivers
 *     summary: get all buses assigned to a driver
 *     description: Returns all buses assigned to drivers
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of buses assigned to drivers
 */
/**
 * @swagger
 * /api/buses/{busId}/{employeeId}:
 *  patch:
 *   tags:
 *    - Assign buse to driver
 *   summary: Assign a bus to a driver
 *   description: Assign a bus to a driver
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - name: authorization
 *      in: header
 *      required: true
 *    - in: path
 *      name: busId
 *      schema:
 *       type: integer
 *      required: true
 *      description: bus id
 *      example: 1
 *    - in: path
 *      name: employeeId
 *      schema:
 *       type: integer
 *      required: true
 *      description: employee id
 *      example: 1
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json
 */

router.patch('/api/buses/:busId/:employeeId', Buses.assign);
router.get('/api/drivers/buses', Buses.findBusestoDrivers);

export default router;
