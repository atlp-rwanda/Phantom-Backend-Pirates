import express from 'express'
import Roles from '../controllers/roleController'
import Employees from '../controllers/employeeController'

const router = express.Router()

// role schema
/**
 * @swagger
 * definitions:
 *   Role:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     tags:
 *       - Roles
 *     summary: Role API
 *     description: Returns all roles
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: All roles returned
 */

// View all employees by role id
/**
 * @swagger
 * /roles/employees:
 *   get:
 *     tags:
 *       - Employees in a role
 *     summary: Employees in role API
 *     description: Returns all employees in arole
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: view all Employees in a role
 */

// Create role
/**
 * @swagger
 * /createrole:
 *   post:
 *     tags:
 *       - Create Role API
 *     summary: Create Role API
 *     description: This API creates a new role
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: role
 *         description: Role
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Role'
 *     responses:
 *       200:
 *         description: Role created successfully
 */

// router.get('/roles', Roles.list) // view all roles
// router.get('/roles/employees', Roles.listEmployeesInRole) // view all Employees in a role
// router.post('/createrole', Roles.create) // add a new role

router.get('/roles/employees', Roles.listEmployeesInRole) // view all Employees in a role
router.get('/employeesInRole/:id', Employees.listEmployeeInRole)
router.get('/employees', Employees.list) // view all employees
router.get('/employees/:id', Employees.listOneEmployee) // view a single employee
router.get('/employees/roleInfo/:id', Employees.EmployeeroleInformation) // view employees role info

router.post('/employees/:roleId', Employees.create) // add a new employee
router.put('/employees/:id', Employees.updateEmployee) // update employee
router.delete('/employees/:id', Employees.delete) // delete employee

export default router
