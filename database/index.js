const { Sequelize } = require("sequelize");

const { DATABASE, DB_USER, PASSWORD, HOST, PORT } = require("../config/index");

const sequelize = new Sequelize(process.env.URI);

// connecting db on local
// const sequelize = new Sequelize(DATABASE, DB_USER, PASSWORD, {
//   HOST,
//   PORT,
//   dialect: "postgres",
// });

sequelize.sync();

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection with DB established");
  } catch (err) {
    console.error("Unable to connect with DB", err);
  }
})();

module.exports = sequelize;
