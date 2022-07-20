var express = require('express');
var cors = require('cors');
const authMiddleware = require('./middlewares/AuthMiddleware');
const { apiRoute, protectedRoute } = require('./routes/api');
const res = require('express/lib/response');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/',apiRoute);
app.use('/api/', protectedRoute)
app.get("/",(req,res)=>{res.send({msg: "Hello"})});
const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log(`Server is Listening at ${port}`))
