# Task Challenge node app

This project was developed with typescript, node.js, express, firebase.

## Dependencies

node.js  

## Run server dev mode
  
install dependencies with 
  

`yarn`


  
and run the server with command
  

`yarn dev`

  
Runs the app server in development mode and watches changes in code.
port 4000
  
  
## Run server production
  
install dependencies with 
  

`yarn`


build for production

`yarn build`
 

Runs the app server in development mode and watches changes in code.
port 4000

`yarn start`
  

  
## Run unit test

`yarn test`

## Rest API

#### Task endpoints

|HTTP Method|URL|Description|
|---|---|---|
|`POST`|http://localhost:4000/api/tasks | Create new task |
|`PUT`|http://localhost:4000/api/tasks/{taskId} | Update task by ID |
|`GET`|http://localhost:4000/api/tasks/{taskId} | Get task by ID |
|`DELETE`|http://localhost:4000/api/tasks/{taskId} | Delete task by ID |
|`GET`|http://localhost:4000/api/tasks | Get All tasks |
  

##  Demo running online

https://task-challenge-gvg6.onrender.com/



