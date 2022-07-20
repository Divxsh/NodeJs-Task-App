var mongoose = require("../connectivity/Mongo");

const todoSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
        required: true,
	},
	desc: {
		type: String,
		required: true,
	},
	isCompleted: {
		type: Boolean,
		default: false,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Todo = mongoose.model("Todo", todoSchema);
