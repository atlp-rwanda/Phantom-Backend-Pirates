import Sequelize from 'sequelize';
import dotenv from "dotenv";

dotenv.config();
const db_con = process.env.DB_URL;
export const sequelize = new Sequelize(
    db_con,
     {
        host: 'localhost',
        dialect: 'postgres',
   pool:{
         max:5,
         min:0,
         idle:10000
   },
   logging: false
 });
sequelize.authenticate().then(() => {
     console.log('Connection has been established successfully.');
}).catch(err => {
     console.error('Unable to connect to the database:', err);
});