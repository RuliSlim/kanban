# Kanban
Ini adalah API untuk membuat kanban menggunakan Express, Sequelize, Postgres
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

# Available route
___________ 
|Method|route|USAGE|
|-----|------|-----|
|GET|localhost:3000/task|Get all task|
|POST|localhost:3000/task|Create new task|
|PUT|localhost:3000/task/:id|Update one task|
|DELETE|localhost:3000/task/:id|Delete task|

___
## API
1. Google Sign In
2. [voicerss](http://www.voicerss.org/)
___
## Framework
1. Materialize

___
## RESTful endpoints
___

### POST /user/register
##### register new user
___
_Request Body_
```json
{
  "username": "jokocuy",
	"email": "joko@gmail.com",
	"password":"password"
}
```
_Response ( 201 - Succes)_
```json
{
  "access_token": "token",
  "username": "jokocuy"
}
```
_Response (400 - Validation error)_
```json
{
  "message": [
      "User.username cannot be null",
      "User.password cannot be null"
  ]
}
```
_Response (400 - Bad Request)_
```json
{
  "message": "User already exists"
}
```
_Response (500 - Server Error)_
```json
{
  "message": "Internal Server Error"
}
```
___
### POST user/login
##### login existing user
___

_Request Body_
```json
{
	"email": "joko@gmail.com",
	"password":"password"
}
```

_Response ( 201 )_
```json
{
  "access_token": "token",
  "username": "jokocuy"
}
```

_Error Response ( 400 - email or password wrong)_
```json
{
  "message": "Email or Password does not match"
}
```

_Error Response ( 404 - user not found )_
```json
{
  "message": "User not found"
}
```
_Response (500 - Server Error)_
```json
{
    "message": "Internal Server Error"
}
```
___
### GET /tasks
##### get all tasks craeted by user
___

_Request Header_
```json
{
  "access_token": "token"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
[
  {
      "id": 2,
      "title": "judul task 2",
      "description": null,
      "status": false,
      "UserId": "04e37673-d3cb-432e-9eb6-e4c45b901bdc",
      "CategoryId": 1,
      "organization": "Hacktiv8",
      "createdAt": "2020-04-07T12:06:36.639Z",
      "updatedAt": "2020-04-07T12:06:36.639Z",
      "User": {
          "id": "04e37673-d3cb-432e-9eb6-e4c45b901bdc",
          "username": "jokocuy",
          "email": "joko@email.com",
          "password": "$2b$10$MZBJJMKWc26ukg7xh/hiO.2jmbCsMYs8IMNNZtROqMtG2PerpwwKy",
          "organization": "Hacktiv8",
          "createdAt": "2020-04-07T11:33:55.347Z",
          "updatedAt": "2020-04-07T11:33:55.347Z"
      },
      "Category": {
          "id": 1,
          "name": "Backlog",
          "createdAt": "2020-04-07T12:08:21.961Z",
          "updatedAt": "2020-04-07T12:08:21.961Z"
      }
  },
  {
      "id": 1,
      "title": "judul task",
      "description": null,
      "status": false,
      "UserId": "04e37673-d3cb-432e-9eb6-e4c45b901bdc",
      "CategoryId": 3,
      "organization": "Hacktiv8",
      "createdAt": "2020-04-07T11:34:06.931Z",
      "updatedAt": "2020-04-07T12:36:56.565Z",
      "User": {
          "id": "04e37673-d3cb-432e-9eb6-e4c45b901bdc",
          "username": "jokocuy",
          "email": "joko@email.com",
          "password": "$2b$10$MZBJJMKWc26ukg7xh/hiO.2jmbCsMYs8IMNNZtROqMtG2PerpwwKy",
          "organization": "Hacktiv8",
          "createdAt": "2020-04-07T11:33:55.347Z",
          "updatedAt": "2020-04-07T11:33:55.347Z"
      },
      "Category": {
          "id": 3,
          "name": "Product",
          "createdAt": "2020-04-07T12:08:21.961Z",
          "updatedAt": "2020-04-07T12:08:21.961Z"
      }
  }
]
```
_Response (500 - Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

___
### POST /tasks
##### create new task
___

_Request Header_
```json
{
  "access_token": "token"
}
```

_Request Body_
```json
{
	"title" : "judul task 2",
  "description" : "ini deskripsi pake category",
  "CategoryId": 2
    
}
```

_Response (200)_
```json
{
  "id": 3,
  "title": "judul task 2",
  "CategoryId": 2,
  "organization": "Hacktiv8",
  "UserId": "04e37673-d3cb-432e-9eb6-e4c45b901bdc",
  "updatedAt": "2020-04-07T13:00:41.786Z",
  "createdAt": "2020-04-07T13:00:41.786Z",
  "status": false,
  "description": null
}
```

_Response (400 - Bad Request)_
```json
{
  "message": [
    "Task.title cannot be null",
    "Task.CategoryId cannot be null"
  ]
}
```
_Response (500 - Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

____________
### GET /tasks/:id
##### get one task by id
____________
_Request Header_
```json
{
  "access_token": "token"
}
```

_Request Body_
```json
not needed
```

_Response (200)_
```json
{
  "id": 3,
  "title": "judul task 2",
  "CategoryId": 2,
  "organization": "Hacktiv8",
  "UserId": "04e37673-d3cb-432e-9eb6-e4c45b901bdc",
  "updatedAt": "2020-04-07T13:00:41.786Z",
  "createdAt": "2020-04-07T13:00:41.786Z",
  "status": false,
  "description": null
}
```
_Response (404 - Not Found)_
```json
{
  "message": "Task not found"
}
```
_Response (500 - Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

_________
### PUT /tasks/:id
##### update existing task
_________
_Request Header_
```json
{
  "access_token": "token"
}
```

_Request Body_
```json
{
  "title" : "Ganti Title",
  "description": "Description",
  "status": true,
  "CategoryId": 3
}
```

_Response (200)_
```json
[
  1,
  [
    {
        "id": 3,
        "title": "judul task 2",
        "description": "Description",
        "status": true,
        "UserId": "04e37673-d3cb-432e-9eb6-e4c45b901bdc",
        "CategoryId": 3,
        "organization": "Hacktiv8",
        "createdAt": "2020-04-07T13:00:41.786Z",
        "updatedAt": "2020-04-07T13:06:37.902Z"
    }
  ]
]
```
_Response (404 - Not Found)_
```json
{
  "message": "Task not found"
}
```
_Response (403 - Authorization)_
```json
{
  "message": "You are not authorized"
}
```
_Response (500 - Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

_______________
### DELETE /tasks/:id
##### delete existing task by id
_______________
_Request Header_
```json
{
  "access_token": "token"
}
```
_Request Params_
```json
{
  "id": 3
}
```

_Request Body_
```
not needed
```
_Response (200)_
```json
{
  "id": 3,
  "title": "judul task 2",
  "description": "Description",
  "status": true,
  "UserId": "04e37673-d3cb-432e-9eb6-e4c45b901bdc",
  "CategoryId": 3,
  "organization": "Hacktiv8",
  "createdAt": "2020-04-07T13:00:41.786Z",
  "updatedAt": "2020-04-07T13:06:37.902Z"
}
```
_Response (404 - Not Found)_
```json
{
    "message": "Task not found"
}
```
_Response (403 - Authorization)_
```json
{
  "message": "You are not authorized"
}
```
_Response (500 - Server Error)_
```json
{
  "message": "Internal Server Error"
}
```