import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = req.header('authorization');
  if (!token)
    return res
      .status(400)
      .json('Access Denied!, Only Admin can perform this task');

  try {
    const verified = jwt.verify(token, `${process.env.DRIVER_SECRET_TOKEN}`);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json('Invalid Token');
  }
};
