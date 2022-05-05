import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(400).json({
      message: 'Access Denied!, you can not perform this task',
    });
  }

  try {
    const verified = jwt.verify(token, `${process.env.ADMIN_SECRET}`);
    req.user = verified;
    next();
  } catch (error) {
    try {
      const verified = jwt.verify(token, `${process.env.OPERATOR_SECRET}`);
      req.user = verified;
      next();
    } catch (error) {
      try {
        const verified = jwt.verify(token, `${process.env.DRIVER_SECRET}`);
        req.user = verified;
        next();
      } catch (error) {
        res.status(400).json({
          message: 'Invalid Token',
        });
      }
    }
  }
};
