# Phantom-Backend-Pirates

# node-sequelize-postgres-crud

Basic CRUD operation by using node.js and typeORM.

## Installation

- You need to create database in `mysql` with `YOUR_DATABASE_NAME`
- `git clone https://github.com/atlp-rwanda/Phantom-Backend-Pirates.git`
- `cd Phantom-Backend-Pirates`
- `npm install`
- create `src/config/config.js` based on your database

```js

module.exports = {
   HOST: "localhost",
   USER: "YOUR_USER_NAME",
   PASSWORD: "YOUR_PASSWORD",
   DB: "YOUR_DATABASE_NAME",
   dialect: "postgres",
   pool: {
     max: 5,
     min: 0,
     acquire: 30000,
     idle: 10000
   }
 };

```

- `npm start`

## Todo
get welcome page
`http://localhost:3000/`

get all user

`http://localhost:3000/api/user`

create user

with POST

`http://localhost:3000/api/user`

with DELETE

`http://localhost:3000/api/user/:id`

with PUT to update

`http://localhost:3000/api/user/:id`