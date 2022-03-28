import { Employee, Role } from '../../models'
import generatePassword from '../miscellaneous/generatepassword'
import sendNotification from '../miscellaneous/sendEmailNotification'

const bcrypt = require('bcrypt')

class Employees {
  static create (req, res) {
    const { firstname, lastname, email } = req.body
    const { roleId } = req.params
    const invalidFirstName = req.t(
      'field_error_message.first_name_message.invalid_first_name'
    )
    const empytFirstName = req.t(
      'field_error_message.first_name_message.empty_first_name'
    )
    const invalidLastName = req.t(
      'field_error_message.last_name_message.invalid_last_name'
    )
    const empytLastName = req.t(
      'field_error_message.last_name_message.empty_last_name'
    )
    const invalidEmail = req.t(
      'field_error_message.email_message.invalid_email'
    )
    const emptyEmail = req.t('field_error_message.email_message.empty_email')
    const allFieldsMessage = req.t('field_error_message.all_fields_message')
    const registrationSuccess = req.t('registration_message.success')

    let password = generatePassword()
    console.log(password)
    const unhashedPassword = password
    password = bcrypt.hashSync(
      password,
      Number.parseInt(process.env.SALT_ROUNDS)
    )

    if (firstname.length === 0) {
      return res.status(400).send({
        message: `${empytFirstName}`
      })
    }

    if (!/^[A-Za-z]+$/.test(firstname)) {
      return res.status(400).send({
        message: `${invalidFirstName}`
      })
    }

    if (lastname.length === 0) {
      return res.status(400).send({
        message: `${empytLastName}`
      })
    }
    if (!/^[A-Za-z]+$/.test(lastname)) {
      return res.status(400).send({
        message: `${invalidLastName}`
      })
    }
    if (email.length === 0) {
      return res.status(400).send({
        message: `${emptyEmail}`
      })
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      return res.status(400).send({
        message: `${invalidEmail}`
      })
    }
    if (
      firstname.length === '' ||
      lastname.length === '' ||
      email.length === '' ||
      password.length === ''
    ) {
      return res.status(400).json({
        message: `${allFieldsMessage}`
      })
    }
    return Employee.create({
      firstname,
      lastname,
      email,
      password,
      roleId
    })
      .then((employeeData) => {
        const message = `
              <div>
                  <h1 font-weight='light'> Thank you ${employeeData.firstname} &nbsp; ${employeeData.lastname} Your password is ${unhashedPassword} you can 
                  <button style="background-color: turquoise; border: none; border-radius: 5px; color: #333; /* Dark grey */ padding: 15px 32px">Click here</button> to change it</h1>
              </div>
        `
        // sendNotification(message, employeeData.email);
        res
          .status(201)
          .send({
            success: true,
            message: `${registrationSuccess}`,
            employeeData: {
              firstname: employeeData.firstname,
              lastname: employeeData.lastname,
              email: employeeData.email.Employee,
              roleId: employeeData.roleId,
              password
            }
          })
          .catch((error) => res.status(400).json(error))
      })
      .catch((error) => res.status(400).send(error))
  }

  static updateEmployee (req, res) {
    const { firstname, lastname, email, roleId } = req.body
    const updateSuccess = req.t('update_messages.success')
    return Employee.findByPk(req.params.id)
      .then((employee) => {
        employee
          .update({
            firstname: firstname || employee.firstname,
            lastname: lastname || employee.lastname,
            email: email || employee.email,
            roleId: roleId || employee.roleId
          })
          .then((updatedEmployee) => {
            res.status(200).send({
              message: `${updateSuccess}`,
              data: {
                firstname: firstname || updatedEmployee.employee.firstname,
                lastname: lastname || updatedEmployee.employee.lastname,
                email: email || updatedEmployee.employee.email,
                roleId: roleId || updatedEmployee.roleId
              }
            })
          })
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  }

  static delete (req, res) {
    const employeeNotFoundResponse = req.t('delete_employee_messages.failure')
    const employeeDeletedResponse = req.t('delete_employee_messages.success')
    return Employee.findByPk(req.params.id)
      .then((Employee) => {
        if (!Employee) {
          return res.status(400).json({
            message: `${employeeNotFoundResponse}`
          })
        }
        return Employee.destroy()
          .then(() =>
            res.status(200).json({
              message: `${employeeDeletedResponse}`,
              Employee: {
                firstname: Employee.firstname,
                lastname: Employee.lastname,
                email: Employee.email,
                roleId: Employee.roleId
              }
            })
          )
          .catch((error) => res.status(400).json(error))
      })
      .catch((error) => res.status(400).json(error))
  }

  static list (req, res) {
    return Employee.findAll({ attributes: { exclude: ['password'] } }).then(
      (employees) => res.status(200).send(employees)
    )
  }

  static listOneEmployee (req, res) {
    return Employee.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ['password'] }
    }).then((employee) => res.status(200).send(employee))
  }

  static listEmployeeInRole (req, res) {
    return Employee.findAll({
      where: { roleId: req.params.id },
      attributes: { exclude: ['password'] }
    }).then((employees) => res.status(200).send(employees))
  }

  static EmployeeroleInformation (req, res) {
    return Employee.findAll({
      where: {
        id: req.params.id
      },
      attributes: {
        exclude: ['email', 'password', 'createAt', 'updatedAt']
      },
      include: {
        model: Role,
        attributes: ['id', 'role']
      }
    }).then((employee) => {
      res.status(200).send(employee)
    })
  }
}

export default Employees
