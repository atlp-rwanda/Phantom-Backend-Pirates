import model from '../../models';
import nodemailer from 'nodemailer';
import Helper from '../utils/helper';

const helper = new Helper();
// Setting a transporter
const transporter = nodemailer.createTransport({
  // host and port for MailHog
  host: process.env.TRANSPORTER_HOST,
  port: process.env.TRANSPORTER_PORT,
});

const { Bus, Employee } = model;

class Buses {
  static async unassign(req, res) {
    const busId = req.params.busId;
    const findBus = await Bus.findByPk(busId);
    if (!findBus) {
      return res.status(400).json({
        message: 'Bus not found',
      });
    } else if (findBus.employeeId === null) {
      return res.status(400).json({
        message: 'Bus has no driver assigned to it',
      });
    } else {
      helper
        .checkPermission(req.user.user.roleId, 'unassign a driver to bus')
        .then(async (results) => {
          if (results) {
            const findEmployeeId = await findBus.employeeId;
            const findEmployee = await Employee.findByPk(findEmployeeId);
            const unassignBus = await findBus.update({ employeeId: null });

            // Email
            transporter.sendMail({
              from: process.env.EMAIL,
              to: findEmployee.email,
              subject: 'You are unassigned a bus',
              html: ` Hello ${findEmployee.firstname}.This is to inform you that you have been unassigned from a bus with ${findBus.plate} plate number`,
            });

            return res.status(200).json({
              message: 'Bus unassigned a driver',
              unassignBus,
            });
          }
        });
    }
  }
}

export default Buses;
