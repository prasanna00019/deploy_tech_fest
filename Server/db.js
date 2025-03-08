import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

db.connect(error => {
    if (error) {
      console.error('Error connecting to MySQL database:', error);
      return;
    }
    console.log('Successfully connected to MySQL database');
});

export default db;