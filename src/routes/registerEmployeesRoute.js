import express from 'express'
import Roles from '../controllers/roleController'
import Employees from '../controllers/employeeController'

const router = express.Router()

/**
*  @swagger
*  tags:
*    name: Employee
*    description: API to manage your Employees.
*/

// Employee Schema
/**
 * @swagger
 * definitions:
 *   Employee:
 *     properties:
 *       firstname:
 *         type: string
 *       lastname:
 *         type: string
 *       email:
 *         type: string
 */

// EmployeeUpdate Schema
/**
 * @swagger
 * definitions:
 *   EmployeeUpdate:
 *     properties:
 *       firstname:
 *         type: string
 *       lastname:
 *         type: string
 *       email:
 *         type: string
 *       roleId:
 *         type: integer
 */

// View all employees by role id
/**
 * @swagger
 * /roles/employees:
 *   get:
 *     tags:
 *       - Employee
 *     summary: Employees in role API
 *     description: Returns all employees in arole
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: view all Employees in a role
 */

// Add employee

/**
 * @swagger
 * /employees/{id}:
 *   post:
 *     tags:
 *       - Employee
 *     summary: Add a new Employee
 *     description: Add a new employee
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: RoleId
 *         in: path
 *         required: true
 *         type: integer
 *       - name: Add employee
 *         description: Add Employee
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Employee'
 *     responses:
 *       200:
 *         description: Employee added successfully
 */

// UPDATE EMPLOYEE

/**
 * @swagger
 * /employees/{id}:
 *  put:
 *   tags:
 *    - Employee
 *   summary: update an Employee
 *   description: update employee
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
 *      description: employee ID
 *      example: 1
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *       $ref: '#/definitions/EmployeeUpdate'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/EmployeeUpdate'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/EmployeeUpdate'
 */

/**
 * @swagger
 * /employees:
 *   get:
 *     tags:
 *       - Employee
 *     summary: get all employees
 *     description: Returns all employees
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of employees
 */

// Get Employee by ID

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     tags:
 *       - Employee
 *     summary: Retrieve single Employee
 *     description: Returns a single Employee
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Employee's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single employee
 *         schema:
 *           $ref: '#/definitions/Employee'
 */

// DELETE Employee
/**
  * @swagger
  * /employees/{id}:
  *   delete:
  *     tags:
  *       - Employee
  *     summary: Delete an Employee API
  *     description: Deletes a single employee
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: id
  *         description: Employee's id
  *         in: path
  *         required: true
  *         type: integer
  *     responses:
  *       200:
  *         description: Employee deleted Successfully
  */

router.get('/roles/employees', Roles.listEmployeesInRole) // view all Employees in a role
router.get('/employeesInRole/:id', Employees.listEmployeeInRole)
router.get('/employees', Employees.list) // view all employees
router.get('/employees/:id', Employees.listOneEmployee) // view a single employee
router.get('/employees/roleInfo/:id', Employees.EmployeeroleInformation) // view employees role info

router.post('/employees/:roleId', Employees.create) // add a new employee
router.put('/employees/:id', Employees.updateEmployee) // update employee
router.delete('/employees/:id', Employees.delete) // delete employee

export default router
