const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "postgresql://postgres:65ejzEIL3gRMLZcUdWAD@containers-us-west-19.railway.app:6958/railway"
);

sequelize.sync();

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection with DB established");
    } catch (err) {
        console.error("Unable to connect with DB");
    }
})();

module.exports = sequelize;
