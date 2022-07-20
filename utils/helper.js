const jsonGenerator = (statusCode, msg, data) => {
	return {
		status:statusCode,
		message:msg,
		data : data,
	};
};

module.exports = jsonGenerator;