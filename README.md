# Phantom-Backend-Pirates


# node-sequelize-postgres-crud

Basic CRUD operation by using node.js and typeORM.

## Installation

- You need to create database in `postgres` with `YOUR_DATABASE_NAME`
- `git pull this branch`
- `npm install`

- Create .env file on root folder
- `touch .env`

- Enter line
LOCAL_PORT = your port 
- edit DB_URL basing on your database configuration
DB_URL = postgres://<username>:<your_password>@localhost:5432/<your_database>?sslmode=disable

- run migration to create database

- npx sequelize-cli  db:migrate

```

- `npm run dev`

## Todo
get welcome page
`http://localhost:your post/`

get all user

`http://localhost:your post/api/user`

create user

with POST

`http://localhost:your post/api/user`

with DELETE

`http://localhost:your post/api/user/id`
