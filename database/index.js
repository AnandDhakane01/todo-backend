const { Sequelize } = require("sequelize");
var pg = require("pg");
pg.defaults.ssl = true;

const {
    sequelize_database,
    sequelize_username,
    sequelize_password,
    sequelize_dialect,
    sequelize_host,
    app_port,
    URI,
} = require("../config");

// const sequelize = new Sequelize(URI);

const sequelize = new Sequelize({
    database: sequelize_database,
    username: sequelize_username,
    password: sequelize_password,
    host: sequelize_host,
    port: app_port,
    dialect: sequelize_dialect,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
        },
    },
});

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
