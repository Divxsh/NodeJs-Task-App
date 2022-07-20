require("dotenv").config();

module.exports = {
	database: process.env.sequelize_database,
	username: process.env.sequelize_username,
	password: process.env.sequelize_password,
	host: process.env.sequelize_host,
	dialects: process.env.sequelize_dialects,
	secret: process.env.secret,
};
