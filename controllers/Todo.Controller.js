const { validationResult } = require("express-validator");
const Todo = require("../models/Todo");
const User = require("../models/User");
const StatusCode = require("../utils/constraint");
const jsonGenerator = require("../utils/helper");

exports.createTodo = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.json(
			jsonGenerator( StatusCode.VALIDATION_ERROR, "Todo is rquired.", errors.mapped()),
		);
	}
	const { desc, isCompleted } = req.body;
	try {
		// console.log(req.userId);
		const result = await Todo.create({
			userId: req.userId,
			desc: desc,
			isCompleted: isCompleted,
		});
		// console.log(result);

		if (result) {
			await User.findOneAndUpdate(
				{ _id: req.userId },
				{ $push: { todos: result } },
			);
			return res.json(
				jsonGenerator( StatusCode.SUCCESS, "Todo created Successfully", result),
			);
		}
	} catch (e) {
		return res.json(
			jsonGenerator( StatusCode.UNPROCESSABLE_ENTITY, "Something Went Wrong", e),
		);
	}
};

exports.getTodos = async (req, res) => {
	try {
		const list = await User.findById(req.userId)
			.select("-password")
			.populate("todos")
			.exec();

		return res.json(jsonGenerator(StatusCode.SUCCESS, "All todo list", list));
	} 
	catch (e) {
		return res.json(
			jsonGenerator( StatusCode.UNPROCESSABLE_ENTITY, "Error while fetching todos", e),
		);
	}
};


exports.updateTodo = async (req, res) => {
	// const error = validationResult(req);

	// if (!error.isEmpty()) {
	// 	return res.send(
	// 		jsonGenerator( StatusCode.UNPROCESSABLE_ENTITY, "TodoId is Requires", error.mapped() ),
	// 	);
	// }
	const { todoId } = req.params;
	if (!todoId) {
		return res.send(
			jsonGenerator( StatusCode.UNPROCESSABLE_ENTITY, "TodoId is Requires",null),
		);
	}
	try {
		// console.log(todoId);
		const todo = await Todo.findOneAndUpdate(
			{ _id: todoId, userId: req.userId },
			[
				{
					$set: {
						isCompleted: {
							$eq: [false, "$isCompleted"],
						},
					},
				},
			],
		);
		if (todo) {
			return res.send(jsonGenerator(StatusCode.SUCCESS, "Updated", todo));
		}
	} 
	catch (error) {
		return res.send(
			jsonGenerator( StatusCode.UNPROCESSABLE_ENTITY, "Could not update", error ),
		);
	}
};

exports.removeTodo = async (req, res) => {
	// const error = validationResult(req);

	// if (!error.isEmpty()) {
	// 	return res.send(
	// 		jsonGenerator( StatusCode.UNPROCESSABLE_ENTITY, "TodoId is Required", error.mapped() ),
	// 	);
	// }

    const { todoId } = req.params;
	if (!todoId) {
		return res.send(
			jsonGenerator( StatusCode.UNPROCESSABLE_ENTITY, "TodoId is Required",null),
		);
	}
	try {
		const result = await Todo.findOneAndDelete({
			_id: todoId,
			userId: req.userId,
		});

		if (result) {
			User.findByIdAndUpdate(
				{ _id: req.userId },
				{ $pull: { todos: todoId } },
			);
			return res.send(
				jsonGenerator(StatusCode.SUCCESS, "Todo Deleted",result),
			);
		}
	} 
	catch (error) {
		return res.send(
			jsonGenerator( StatusCode.UNPROCESSABLE_ENTITY, "Could not update", error),
		);
	}
};
