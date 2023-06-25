const StatusCode = require("../utils/constraint");
const jsonGenerator = require("../utils/helper");
const { tokenVerify } = require("../utils/jwt");

const authMiddleware = (req, res, next) => {
	const token = req.headers["authorization"];
	// console.log(req.headers);

	if (token == undefined) {
		return res.send(
			jsonGenerator(StatusCode.AUTH_ERROR, "Please login or register."),
		);
	} else {
		try {
			const data = tokenVerify(token.split(" ")[1]);
			// console.log(data);
			req.userId = data.userId;
			next();
		} catch (e) {
			// if token is incorrect
			return res.send(
				jsonGenerator(StatusCode.UNPROCESSABLE_ENTITY, "invalid Token", null),
			);
		}
	}
};

module.exports = authMiddleware;
