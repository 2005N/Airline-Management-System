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
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.post("/signup", (req, res) => {
  const { fname, mname, lname, phone, email, passport, password } = req.body;
  db.query(
    'INSERT INTO clients (fname, mname, lname, phone, email, passport, password) VALUES (?, ?, ?, ?, ?, ?, ?);',
    [fname, mname, lname, phone, email, passport, password],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ err: 'Database insert error' });
      }
      return res.status(200).send({ id: result.insertId });
    }
  );
});

app.get("/CustomerPanel/:id",(req,res)=>{
    const {id}=req.params;
    const sqlGet="select * from clients where client_id=?;"
    db.query(sqlGet,id,(err,result)=>{
        if(err)
        res.send({err: err});
        else
        res.send(result);
    })
})

app.post("/addreview/:id",(req,res)=>{
    const id=req.body.id;
    const review=req.body.review;
    //console.log(id,review)
    const sqlInsert="insert into customer_review values(?,?);"
    db.query(sqlInsert,[id,review],(err,result)=>{
        if(err)
        res.send({err: err});
        else
        res.send(result);
    })
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
