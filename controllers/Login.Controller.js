const { validationResult } = require("express-validator");
const User = require("../models/User");
const StatusCode = require("../utils/constraint");
const jsonGenerator = require("../utils/helper");
const bcrypt = require("bcrypt");
const { tokenGenerator } = require("../utils/jwt");

const Login = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.send(
			jsonGenerator(StatusCode.UNPROCESSABLE_ENTITY, "Checks failed"),
		);
	} else {
		// destruct the req.body object
		const { email, password } = req.body;
		// Searching user in the database
		const searchUser = await User.findOne({ email });
		// const searchUser = await User.findOne({ username: username });

		if (!searchUser) {
			// if not username found.
			return res.send(
				jsonGenerator(StatusCode.UNPROCESSABLE_ENTITY, "user not found", null),
			);
		} else {
			// Password verification
			const verified = bcrypt.compareSync(password, searchUser.password);
			// if password is incorrect
			if (!verified) {
				res.send(
					jsonGenerator(
						StatusCode.UNPROCESSABLE_ENTITY,
						"password is incorrect",
						null,
					),
				);
			} else {
				// generatoring jwt token
				const token = tokenGenerator({ userId: searchUser._id });

				res.send(
					jsonGenerator(StatusCode.SUCCESS, "Login Successfull", {
						userId: searchUser._id,
						token: token,
					}),
				);
			}
		}
	}
};
module.exports = Login;
