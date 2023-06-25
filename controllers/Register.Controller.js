const { validationResult } = require("express-validator");
const StatusCode = require("../utils/constraint");
const jsonGenerator = require("../utils/helper");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const Register = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		res.send(
			jsonGenerator(
				StatusCode.VALIDATION_ERROR,
				"Validation Error",
				errors.mapped(),
			),
		);
	} else {
		// Destructuring the data from req.body object
		// const { name, username, email, password } = req.body;
		const { username, email, password } = req.body;

		// Save to database
		// Got a error because maine await use nahi kiya tha.
		const userExist = await User.findOne({
			$or: [{ email: email }, { username: username }],
		});
		// console.log(userExist);
		if (userExist) {
			return res.json(
				jsonGenerator(
					StatusCode.CONFLICT,
					"User or Email already exists",
					null,
				),
			);
		} else {
			// Hashing the password
			const salt = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(password, salt);
			try {
				const result = await User.create({
					username,
					email,
					password: hashPassword,
				});
				console.log("result.toObject();", result.toObject());
				const {
					username: userName,
					email: userEmail,
					_id: userId,
					date,
				} = result.toObject();

				return res.json(
					jsonGenerator(StatusCode.CREATED, "User Created", {
						_id: userId,
						username: userName,
						email: userEmail,
						date,
					}),
				);
			} catch (error) {
				console.log(error);
				return res.json(
					jsonGenerator(
						StatusCode.SERVER_ERROR,
						"Something went wrong.",
						"Register",
					),
				);
			}
		}
	}
};

module.exports = Register;
