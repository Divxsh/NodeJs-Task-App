const { check } = require("express-validator");

const RegisterValidater = [
	// check("name").trim().isAlpha().withMessage("Nams should be Alphabets only."),

	check("username")
		.exists()
		.isAlphanumeric()
		.withMessage("Username should be alphanumeric character only")
		.trim()
		.isLength({ min: 6, max: 32 }),

	check("password", "password is required")
		.exists()
		.isLength({ min: 6, max: 30 })
		.trim(),

	check("email", "Email is required").exists().isEmail(),
];

const LoginValidator = [
	check("email", "Email is required").exists().isEmail(),

	check("password", "password is required")
		.exists()
		.isLength({ min: 6, max: 30 })
		.trim(),
];

module.exports = {
	RegisterValidater,
	LoginValidator,
};
