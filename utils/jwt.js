const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");
// console.log(secret);

exports.tokenGenerator = (payload) => {
	const key = jwt.sign(payload, secret,{expiresIn:"240000"});
	// console.log(key);
	return key;
};

exports.tokenVerify = (token) => {
	const verify = jwt.verify(token, secret);
	return verify;
};


// "25920000000"
