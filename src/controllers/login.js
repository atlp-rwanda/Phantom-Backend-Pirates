import { Employee, Role } from '../../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const login = (req, res) => {
  const { email, password } = req.body;
  // Responses for translations
  const responseAdmin = req.t('login_message.onSuccess.admin');
  const responseOperator = req.t('login_message.onSuccess.operator');
  const responseDriver = req.t('login_message.onSuccess.driver');
  const responseUnsuccessNonregistered = req.t(
    'login_message.onFailure.nonregistered'
  );
  const responseUnsuccessWrongPass = req.t(
    'login_message.onFailure.wrongpassword'
  );
  Employee.findOne({
    where: {
      email: email,
    },
    include: {
      model: Role,
    },
  })
    .then((found) => {
      if (!found) {
        res.status(400).json({
          error: `${responseUnsuccessNonregistered}`,
        });
      } else {
        const {firstname, lastname, email, id, Role: {role}} = found;
        const user = {firstname, lastname, email, id, role}
        if (
          bcrypt.compareSync(password, found.password) &&
          user.role === 'admin'
        ) {
          const adminToken = jwt.sign(
            { user: found },
            process.env.ADMIN_SECRET,
            {
              expiresIn: process.env.AUTH_EXPIRES,
            }
          );
          res.status(200).json({
            message: `${responseAdmin}`,
            user,
            adminToken,
          });
        } else if (
          bcrypt.compareSync(password, found.password) &&
          user.role === 'operator'
        ) {
          const operatorToken = jwt.sign(
            { user: found },
            process.env.OPERATOR_SECRET,
            {
              expiresIn: process.env.AUTH_EXPIRES,
            }
          );
          res.status(200).json({
            message: `${responseOperator}`,
            user,
            operatorToken,
          });
        } else if (
          bcrypt.compareSync(password, found.password) &&
          user.role === 'driver'
        ) {
          const driverToken = jwt.sign(
            { user: found },
            process.env.DRIVER_SECRET,
            {
              expiresIn: process.env.AUTH_EXPIRES,
            }
          );
          res.status(200).json({
            message: `${responseDriver}`,
            user,
            driverToken,
          });
        } else {
          res.status(401).json({
            error: `${responseUnsuccessWrongPass}`,
          });
        }
      }
    })
    .catch((err) => {
      res.status(501).json(err);
    });
};
export default login;
