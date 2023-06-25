var express = require("express");
var cors = require("cors");
var app = express();
require("dotenv").config();

const authMiddleware = require("./middlewares/AuthMiddleware");
const { apiRoute, protectedRoute } = require("./routes/api");

console.log(process.env.MONGODB_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/", apiRoute);
app.use("/api/", authMiddleware, protectedRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is Listening at ${port}`));
