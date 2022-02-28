module.exports = {
  secret: process.env.AUTH_SECRET,
  expires: process.env.AUTH_EXPIRES,
  rounds: process.env.AUTH_ROUNDS,
  adminSecret: process.env.ADMIN_SECRET,
  operatorSecret: process.env.OPERATOR_SECRET,
  driverSecret: process.env.DRIVER_SECRET
}
