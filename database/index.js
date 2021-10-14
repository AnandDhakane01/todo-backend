const { Sequelize } = require("sequelize");
pg.defaults.ssl = true;

const {
    sequelize_database,
    sequelize_username,
    sequelize_password,
    sequelize_dialect,
    sequelize_host,
    app_port,
} = require("../config");

const sequelize = new Sequelize(process.env.DATABASE_URL);

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
