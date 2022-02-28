import jwt from 'jsonwebtoken';
import express from 'express';

const router = express.Router();

const user = {
  isAdmin: true,
  isOperator: false,
  isDriver: false,
};

router.post('/login', (req, res) => {
  if (user.isAdmin) {
    const adminToken = jwt.sign(
      { _id: 1 },
      `${process.env.ADMIN_SECRET_TOKEN}`
    );
    return res.header('authorization', adminToken).json({
      adminToken: adminToken,
      user,
    });
  } else if (user.isOperator) {
    const operatorToken = jwt.sign(
      { _id: 2 },
      `${process.env.OPERATOR_SECRET_TOKEN}`
    );
    return res.header('authorization', operatorToken).json({
      operatorToken: operatorToken,
      user,
    });
  } else if (user.isDriver) {
    const driverToken = jwt.sign(
      { _id: 3 },
      `${process.env.DRIVER_SECRET_TOKEN}`
    );
    return res.header('authorization', driverToken).json({
      driverToken: driverToken,
      user,
    });
  }
});

export default router;
