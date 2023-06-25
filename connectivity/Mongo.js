var mongoose = require("mongoose");

// M3nk7cHbXCFN24d9
let MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(
	MONGODB_URI,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (err) {
			console.log("Mongodb Connection Error");
		} else {
			console.log("Database connected");
		}
	},
);

// we can also listen for MongoDB connection events:
// let db = mongoose.connection;
// db.on('error',console.error("Mongodb connnection error", err));
// db.on('connection',() => console.log("Connected"));

module.exports = mongoose;
