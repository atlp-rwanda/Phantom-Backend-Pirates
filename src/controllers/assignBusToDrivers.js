import model from '../../models'
import sendNotification from '../miscellaneous/sendDriversNotification'

const { Bus, Employee, Role } = model

class Buses {
  static async assign (req, res) {
    const emptyEmployee = req.t('assigning_bus_driver_message.missingEmployee')
    const employeeNotbeingADriver = req.t('assigning_bus_driver_messages.employeeNotBeingADriver')
    const driverHasbus = req.t('assigning_bus_driver_messages.driverExists')
    const busNotFound = req.t('assigning_bus_driver_messages.busNotFound')
    const busHasADriver = req.t('assigning_bus_driver_messages.busHasADriver')
    const success = req.t('assigning_bus_driver_messages.success')
    const busId = req.params.busId
    const employeeId = req.params.employeeId
    const foundEmployee = await Employee.findOne({
      where: { id: employeeId },
      include: {
        model: Role
      }
    })
    const driverExists = await Bus.findOne({ where: { employeeId } })
    if (!foundEmployee) {
      return res.status(404).json({
        message: `${emptyEmployee}`
      })
    }
    if (foundEmployee.Role.role !== 'driver') {
      return res.status(400).json({
        message: `${employeeNotbeingADriver}`
      })
    }
    if (driverExists) {
      return res.status(404).json({
        message: `${driverHasbus}`
      })
    }

    const findBus = await Bus.findByPk(busId)
    if (!findBus) {
      return res.status(400).json({
        message: `${busNotFound}`
      })
    }
    if (findBus.employeeId !== null) {
      return res.status(400).json({
        message: `${busHasADriver}`
      })
    }
    const assignBus = await findBus.update({ employeeId: employeeId })
    const message = `
        <div>
            <h5 font-weight='light'> Hello ${foundEmployee.firstname},<br> This is to inform you that a bus with a plate number of ${assignBus.plate} was assigned to you.</h5>
        </div>
  `
    sendNotification(message, foundEmployee.email)
    return res.status(200).json({
      message: `${success}`,
      assignBus
    })
  }

  // Driver associated to bus
  static findBusestoDrivers (req, res) {
    const Op = require('sequelize').Op

    if (Bus.employeeId !== null) {
      return Bus
        .findAll({
          where: {
            employeeId: { [Op.ne]: null }
          },
          attributes: {
            exclude: ['employeeId']
          },
          include: {
            model: Employee,
            attributes: ['id', 'firstname', 'lastname', 'email', 'roleId']

          }
        })
        .then(buses => res.status(200).send(buses))
    }
  }
}

export default Buses
