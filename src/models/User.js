module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    name: {
      type: Sequelize.STRING
    },
    age: {
      type: Sequelize.INTEGER
    }
  });
  return User;
};