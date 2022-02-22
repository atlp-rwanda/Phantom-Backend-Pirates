# Phantom-Backend-Pirates


# node-sequelize-postgres-crud

Basic CRUD operation by using node.js and typeORM.

## Installation

- You need to create database in `postgres` with `YOUR_DATABASE_NAME`
- `git clone https://github.com/atlp-rwanda/Phantom-Backend-Pirates.git`
- `cd Phantom-Backend-Pirates`
- `npm install`

- Create .env file on root folder
- `touch .env`

- Enter line
LOCAL_PORT = your port 
- edit DB_URL basing on your database configuration
DB_URL = postgres://<username>:<your_password>@localhost:5432/<your_database>?sslmode=disable

- Go in `src/config/config.js` based on your database



```

- `npm run dev`

## Todo
get welcome page
`http://localhost:3000/`

get all user

`http://localhost:3000/api/user`

create user

with POST

`http://localhost:3000/api/user`

with DELETE

`http://localhost:3000/api/user/id`