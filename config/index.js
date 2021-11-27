require("dotenv").config();

module.exports = {
  URI: process.env.URI,
  DB_USER: process.env.DB_USER,
  HOST: process.env.HOST,
  DATABASE: process.env.DATABASE,
  PASSWORD: process.env.PASSWORD,
  PORT: process.env.PORT,
};
