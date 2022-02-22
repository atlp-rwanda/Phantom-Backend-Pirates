import Sequelize from 'sequelize';
import { sequelize } from '../config/config'

const User = sequelize.define('users', {
name:{
    type: Sequelize.STRING
},
email:{
    type: Sequelize.STRING,
    unique: true
},
phone:{
   type: Sequelize.STRING,
   unique: true
}
},{
   timestamps:false
});

export default User;