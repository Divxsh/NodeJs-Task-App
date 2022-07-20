var mongoose = require("mongoose");
// var mongodb = "mongodb://localhost:27017/todo";
var mongodb = "mongodb+srv://Divash:Divash1234@todo.xi1me.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err){
        console.log("Mongodb Connection Error");
    }
    else{
        console.log("Database connected");
    }
});

// var db = mongoose.connection;

// // db.on('connection',() => console.log("Connected"))
// db.on('error',console.error.bind(console,"Mongodb connnection error"))

module.exports = mongoose;