# Simple to-do list app's backend with following things-

- User authentication using JWT.
- A todo endpoint which can add, delete, update and list all todos for a specific user.
- Todo endpoint will be only for signedin users.

## Tech Stack

- Node.js and express
- MongoDB

# REST API Docs

## For register a new user

### Method & Endpoint

    `POST /api/register/`

### Body

```javascript 
{
    username:"divash1",
    email:"divash11@gmail.com",
    password:123456,
}
```

### Response

```javascript
{
    "status": 200,
    "message": "User Created",
    "data": {
        "_id": "64982997561fe7c1cba9677f",
        "username": "divash5",
        "email": "divash15@gmail.com",
        "date": "2023-06-25T11:48:39.386Z"
    }
}
```

## For login an existing user

### Method & Endpoint

    `POST /api/login`

### Body
```javascript
{
    email:divash11@gmail.com
    password:123456
}
```

### Response
```javascript
{
    "status": 201,
    "message": "Login Successfull",
    "data": {
        "userId": "64982997561fe7c1cba9677f",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDk4Mjk5NzU2MWZlN2MxY2JhOTY3N2YiLCJpYXQiOjE2ODc2OTM4MzksImV4cCI6MTY4NzkzMzgzOX0.Atu7sUlvWqUhtWZn6nWdF9kq2UjD2POxfDBzs7Smy34"
    }
}
```

## Create a new todo item

### Method & Endpoint

    `POST /api/create`

### Body
```javascript
{
    desc:just checking1
    isCompleted:false
}
```

### Response
```javascript
{
    "status": 201,
    "message": "Todo created Successfully"
}
```

## List all todos of the current user

### Method & Endpoint

    `GET /api/get`

### Response
```javascript
{
    "status": 200,
    "message": "All todo list",
    "data": [
        {
            "_id": "64982b36847ca54f6cc60fa0",
            "userId": "64982997561fe7c1cba9677f",
            "desc": "just checking1",
            "isCompleted": false,
            "date": "2023-06-25T11:55:34.806Z",
            "__v": 0
        }
    ]
}
```

## Update an existing todo

### Method & Endpoint

    `PUT /api/todos/:id`

### Body
```javascript
{
    "isCompleted":true
}
```

### Response
```javascript
{
    "status": 200,
    "message": "Updated"
}
```

## Delete an existing todo

### Method & Endpoint

    `DELETE /api/todos/:id`

### Response

```javascript
{
    "status": 200,
    "message": "Todo Deleted",
    "data": {
        "_id": "64982b36847ca54f6cc60fa0",
        "userId": "64982997561fe7c1cba9677f",
        "desc": "just checking1",
        "isCompleted": false,
        "date": "2023-06-25T11:55:34.806Z",
        "__v": 0
    }
}
````
