import express from 'express';
import Buses from '../controllers/unassigningBustoDriver';
import verifyAdminOperator from '../authorization/verifyAdmnOperator';
import verifyUser from '../authorization/verifyUser';

const router = express.Router();

/**
 * @swagger
 * /api/buses/unassign/{busId}:
 *  patch:
 *   tags:
 *    - Unassign buses from driver
 *   summary: Unassign a bus from a driver
 *   description: Unassign a bus from a driver
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
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json
 */

router.patch('/api/buses/unassign/:busId', verifyUser, Buses.unassign);

export default router;
