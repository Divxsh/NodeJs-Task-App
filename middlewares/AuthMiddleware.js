const StatusCode = require("../utils/constraint");
const jsonGenerator = require("../utils/helper");
const { tokenVerify } = require("../utils/jwt");

const authMiddleware = (req, res, next) => {
	const token = req.headers["auth"];
	// console.log(token);
	if (token == undefined) {
		return res.send(
			jsonGenerator(StatusCode.AUTH_ERROR, "Access Denied", "Please login or register."),
		);
	} 
	else {
		try {
			const data = tokenVerify(token);
			// console.log(data);
			req.userId = data.userId;
			next();
		} 
		catch (e) { // if token is incorrect
			return res.send(
				jsonGenerator(
					StatusCode.UNPROCESSABLE_ENTITY,
					"invalid Token",
					null,
				),
			);
		}
	}
};

module.exports = authMiddleware;
