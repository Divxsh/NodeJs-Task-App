const jwt = require("jsonwebtoken");

exports.tokenGenerator = (payload) => {
	const key = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: "240000000",
	});
	// console.log(key);
	return key;
};

exports.tokenVerify = (token) => {
	const verify = jwt.verify(token, process.env.JWT_SECRET);
	return verify;
};

// "25920000000"
