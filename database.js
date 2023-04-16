const mysql = require('mysql');
const dotenv =require('dotenv');
const { Sequelize, DataTypes } = require('sequelize');
dotenv.config();

const connection=mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
});

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT
});

connection.connect((err) => {
  if(err){
    console.log(err.message);
  }
  console.log('db' + connection.state);
})

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING, 
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users'
});

console.log(User);

module.exports = { sequelize, User };


