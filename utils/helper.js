const jsonGenerator = (statusCode, msg, data) => {
	return {
		status:statusCode,
		message:msg,
		...data,
	};
};

module.exports = jsonGenerator;