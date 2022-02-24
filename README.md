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

[![CI](https://github.com/atlp-rwanda/Phantom-Backend-Pirates/actions/workflows/blank.yml/badge.svg)](https://github.com/atlp-rwanda/Phantom-Backend-Pirates/actions/workflows/blank.yml)


# Setup Continuous Integration & Quality Assurance pipeline

Testing using Mocha, Chai and Sinon. 
Setting up continuous integration using github actions and heroku pipeline for continuous deployment

## Installation

- `git pull this branch`
- `npm install`
- run `npm run test` you should see test passing

![runtest](https://user-images.githubusercontent.com/50244289/155469886-bff4a8d6-4af9-47dc-8bec-efa0a48a1500.png)
