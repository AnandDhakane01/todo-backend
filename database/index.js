const { Sequelize } = require("sequelize");

const { URI } = require("../config/index");

const sequelize = new Sequelize(process.env.URI);

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
