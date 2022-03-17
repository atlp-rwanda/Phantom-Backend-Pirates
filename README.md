# Phantom-Backend-Pirates

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
- npx sequelize-cli db:seed:all
```

- `npm run dev`

## Todo
get welcome page
`http://localhost:your post/`
