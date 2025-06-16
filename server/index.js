import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mysql from 'mysql2';

dotenv.config();
const app = express();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
