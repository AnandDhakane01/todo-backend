const { Sequelize } = require("sequelize");

const {
    sequelize_database,
    sequelize_username,
    sequelize_password,
    sequelize_dialect,
    sequelize_host,
    app_port,
} = require("../config");

// // heroku
// const Pool = require("pg").Pool;
// const isProduction = process.env.NODE_ENV === "production";
// const connectionString = `postgresql://${sequelize_username}:${sequelize_password}@${sequelize_host}:${app_port}/${sequelize_database}`;
// const pool = new Pool({
//     connectionString: isProduction
//         ? process.env.DATABASE_URL
//         : connectionString,
//     // If you want to run your application in development , comment out the ssl code block. as development server doesn’t support ssl.
//     ssl: {
//         rejectUnauthorized: false,
//     },
// });

const sequelize = new Sequelize(
    sequelize_database,
    sequelize_username,
    sequelize_password,
    {
        host: sequelize_host,
        dialect: sequelize_dialect,
    }
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
exports.Pool = Pool;
