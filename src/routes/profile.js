import express from 'express'
import Profiles from '../controllers/profileController'
import profileAuth from '../middleware/profileAuth'
import verifyAdmin from '../authorization/verifyAdmin'

const router = express.Router()

/**
*  @swagger
*  tags:
*    name: Profile
*    description: API to manage Employee's profiles.
*/

// Profile Schema
/**
 * @swagger
 * definitions:
 *   Profile:
 *     properties:
 *       telephone:
 *         type: string
 *       firstname:
 *         type: string
 *       lastname:
 *         type: string
 *       profilePic:
 *         type: string
 *       address:
 *         type: object
 *       dateOfBirth:
 *         type: string
 *       gender:
 *         type: string
 */

// ProfileUpdate Schema
/**
 * @swagger
 * definitions:
 *   ProfileUpdate:
 *     properties:
 *       telephone:
 *         type: string
 *       profilePic:
 *         type: string
 *       address:
 *         type: object
 */

// Add Profile

/**
 * @swagger
 * /profiles/{id}:
 *   post:
 *     tags:
 *       - Profile
 *     summary: Add a new Profile
 *     description: Add a new profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: employeeId
 *         in: path
 *         required: true
 *         type: integer
 *       - name: Add profile
 *         description: Add Profile
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Profile'
 *     responses:
 *       200:
 *         description: Profile added successfully
 */

// UPDATE PROFILE

/**
 * @swagger
 * /profiles/{id}:
 *  put:
 *   tags:
 *    - Profile
 *   summary: update an Employee's profile
 *   description: update employee's profile
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
 *      description: profile ID
 *      example: 1
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *       $ref: '#/definitions/ProfileUpdate'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/ProfileUpdate'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/ProfileUpdate'
 */

// Get all profiles

/**
 * @swagger
 * /profiles:
 *   get:
 *     tags:
 *       - Profile
 *     summary: get all profiles
 *     description: Returns all profiles
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of profiles
 */

// Get Profile by ID

/**
 * @swagger
 * /profiles/{id}:
 *   get:
 *     tags:
 *       - Profile
 *     summary: Retrieve single Profile
 *     description: Returns a single Profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Profile's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single profile
 *         schema:
 *           $ref: '#/definitions/Profile'
 */

// View all an Employee's Profile
/**
 * @swagger
 * /profiles/employeeProfiles/{id}:
 *   get:
 *     tags:
 *       - Profile
 *     summary: Employee's profile
 *     description: Returns all an Employee's profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Profile's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: view an Employee's profile
 */

// DELETE Profile
/**
  * @swagger
  * /profiles/{id}:
  *   delete:
  *     tags:
  *       - Profile
  *     summary: Delete a Profile API
  *     description: Deletes a single profile
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: id
  *         description: Profile's id
  *         in: path
  *         required: true
  *         type: integer
  *     responses:
  *       200:
  *         description: Profile deleted Successfully
  */

router.post('/profiles/:employeeId', profileAuth, Profiles.create) // Create a new profile
router.get('/profiles', Profiles.list) // Get all Profiles
router.get('/profiles/:id', Profiles.listOne) // Get a single profile
router.get('/profiles/employeeProfiles/:id', Profiles.EmployeeProfile) // Get all an employee's
router.put('/profiles/:id', profileAuth, Profiles.update) // Update an Employee's profile
router.delete('/profiles/:id',verifyAdmin, Profiles.delete) // Delete an Employee's profile

export default router
