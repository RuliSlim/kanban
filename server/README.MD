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
      "name": "Development",
      "Tasks": [
          {
              "id": 1,
              "title": "judul task 1",
              "description": "ini deskripsi pake category",
              "status": false,
              "UserId": "ae0e5b5b-4dba-4a23-a5af-8a13a0cb5c9a",
              "CategoryId": 2,
              "organization": "Hacktiv8",
              "createdAt": "2020-04-07T16:05:31.609Z",
              "updatedAt": "2020-04-07T16:05:31.609Z",
              "User": {
                  "username": "jokocuy",
                  "organization": "Hacktiv8"
              }
          },
          {
              "id": 2,
              "title": "judul task 2",
              "description": "ini deskripsi pake category",
              "status": false,
              "UserId": "ae0e5b5b-4dba-4a23-a5af-8a13a0cb5c9a",
              "CategoryId": 2,
              "organization": "Hacktiv8",
              "createdAt": "2020-04-07T16:05:33.149Z",
              "updatedAt": "2020-04-07T16:05:33.149Z",
              "User": {
                  "username": "jokocuy",
                  "organization": "Hacktiv8"
              }
          }
      ]
  },
  {
      "id": 3,
      "name": "Product",
      "Tasks": [
          {
              "id": 5,
              "title": "judul task 5",
              "description": "ini deskripsi pake category",
              "status": false,
              "UserId": "ae0e5b5b-4dba-4a23-a5af-8a13a0cb5c9a",
              "CategoryId": 3,
              "organization": "Hacktiv8",
              "createdAt": "2020-04-07T16:46:38.161Z",
              "updatedAt": "2020-04-07T16:46:38.161Z",
              "User": {
                  "username": "jokocuy",
                  "organization": "Hacktiv8"
              }
          }
      ]
  },
  {
      "id": 1,
      "name": "Backlog",
      "Tasks": [
          {
              "id": 6,
              "title": "judul task 6",
              "description": "ini deskripsi pake category",
              "status": false,
              "UserId": "ae0e5b5b-4dba-4a23-a5af-8a13a0cb5c9a",
              "CategoryId": 1,
              "organization": "Hacktiv8",
              "createdAt": "2020-04-07T16:46:43.703Z",
              "updatedAt": "2020-04-07T16:46:43.703Z",
              "User": {
                  "username": "jokocuy",
                  "organization": "Hacktiv8"
              }
          },
          {
              "id": 7,
              "title": "judul task 7",
              "description": "ini deskripsi pake category",
              "status": false,
              "UserId": "ae0e5b5b-4dba-4a23-a5af-8a13a0cb5c9a",
              "CategoryId": 1,
              "organization": "Hacktiv8",
              "createdAt": "2020-04-07T16:46:46.565Z",
              "updatedAt": "2020-04-07T16:46:46.565Z",
              "User": {
                  "username": "jokocuy",
                  "organization": "Hacktiv8"
              }
          }
      ]
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