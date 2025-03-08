import mysql from "mysql2";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config();

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port:process.env.DB_PORT,
    ssl: {
      ca: Buffer.from(process.env.MYSQL_CA_CERT, "base64").toString("utf-8")
  }
});

db.connect(error => {
    if (error) {
      console.error('Error connecting to MySQL database:', error);
      return;
    }
    console.log('Successfully connected to MySQL database');
});

export default db;