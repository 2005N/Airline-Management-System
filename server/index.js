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

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT client_id, password FROM clients WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      return res.json({ err: "Database error" });
    }
    if (results.length === 0) {
      return res.json({ err: "User not found" });
    }
    const user = results[0];

    if (user.password !== password) {
      return res.json({ err: "Invalid password" });
    }

    res.json({ id: user.client_id });
  });
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

app.get("/SearchFlights",(req,res)=>{
    const sqlGet="select fb_id,departure,arrival,departureDate, returnDate, class,price from FlightBooking order by fb_id desc;"
    db.query(sqlGet,(err,result)=>{
        if(err)
        res.send({err: err});
        else
        res.send(result);
    })
})

app.post('/BookTicket',(req,res)=>{
    const departure=req.body.departure;
    const arrival=req.body.arrival;
    const departureDate=req.body.departureDate;
    const returnDate=req.body.returnDate;
    const classs=req.body.class;
    const price=req.body.price;
    const sqlInsert='insert into FlightBooking (departure,arrival,departureDate,returnDate,class,price) values (?,?,?,?,?,?)';
    db.query(sqlInsert,[departure,arrival,departureDate,returnDate,classs,price],(err,result)=>{
        if(err)
        res.send({err:err});
    })
})

app.post("/AvailableFlights", (req, res) => {
    console.log(req.body);
    const { departureDate, returnDate, fares, departure, arrival } = req.body;

    // Convert "2025-08-03" to "3-Aug-2025" format to match your database
    const formatDateForDB = (dateStr) => {
        const date = new Date(dateStr);
        const day = date.getDate();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const dbDepartureDate = formatDateForDB(departureDate);
    const dbReturnDate = formatDateForDB(returnDate);

    // Debug: Log the converted values
    console.log('Original dates:', { departureDate, returnDate, fares });
    console.log('Converted dates:', { dbDepartureDate, dbReturnDate });
    console.log('Search patterns:', [`${dbDepartureDate}%`, `${dbReturnDate}%`, fares]);

    // Use LIKE to match the date part of your datetime strings
    const sqlGet = `
    SELECT f.flight_no, s.schedule_id, f.airplane_id, a.max_seats,
           s.departure_time, s.arrival_time, fs.status, f.fares 
    FROM Flight f
    INNER JOIN schedule s ON s.schedule_id = f.schedule_id
    INNER JOIN FlightStatus fs ON fs.flightStatus_id = f.flightStatus_id
    INNER JOIN airplane a ON a.airplane_id = f.airplane_id
    WHERE s.departure_time LIKE ?
      AND s.arrival_time LIKE ?
      AND f.fares <= ?
    `;

    // console.log('Executing SQL:', sqlGet);
    // console.log('With parameters:', [`${dbDepartureDate}%`, `${dbReturnDate}%`, fares]);

    db.query(sqlGet, [`${dbDepartureDate}%`, `${dbReturnDate}%`, fares], (err, result) => {
        if (err) {
            console.error('SQL Error:', err);
            return res.status(500).json({ error: err.message });
        }
        console.log('Query result:', result);
        console.log('Result length:', result.length);
        res.json(result);
    });
});

app.get("/invoice/:id",(req,res)=>{
    const {id}=req.params;
    const sqlGet="select fname,lname from clients where client_id=?;"
    db.query(sqlGet,id,(err,result)=>{
        if(err)
        res.send({err: err});
        else
        res.send(result);
    })
})

app.get("/invoicefares",(req,res)=>{
    const sqlGet="select flight_no,departure,price,arrival from FlightBooking LIMIT 1;"
    db.query(sqlGet,(err,result)=>{
        if(err)
        res.send({err: err});
        else{
          res.send(result);
        }
    })
})


app.post("/UpdateFlightBooking",(req,res)=>{
    const {id, price}=req.body;
    console.log("inside flight booking:",req.body);

    const sqlUpdate = `
        UPDATE FlightBooking 
        SET flight_no = (
            SELECT f.flight_no 
            FROM Flight f 
            INNER JOIN Schedule s ON s.schedule_id = f.schedule_id 
            WHERE s.schedule_id = ? AND f.fares = ?
            LIMIT 1
        )
        WHERE flight_no IS NULL;
    `;

    db.query(sqlUpdate,[id,price],(err,result)=>{
        if(err)
        res.send({err: err});
        else
        res.send(result);
    })
})

app.post("/invoiceconfirm", (req, res) => {
    const client_id = req.body.client_id;
    const schedule_id = req.body.schedule_id;
    const airport_code = req.body.airport_code;
    console.log(client_id,schedule_id,airport_code);
    // const client_id=57;
    // const schedule_id=56;
    // const airport_code='DEL';

    const sqlInsertTicket = `
        INSERT INTO ticket (seat_no, departure_time, gate_no, airport_code)
        SELECT t.nm, s.departure_time, a.gate_no, a.airport_code
        FROM schedule s, tempseatgen t, airport a
        WHERE s.schedule_id = ? AND a.airport_code = ?
        ORDER BY rand()
        LIMIT 1;
    `;

    db.query(sqlInsertTicket, [schedule_id, airport_code], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        const ticket_id = result.insertId;
        console.log("ticket id: ",ticket_id);

        const sqlGetFlight = `
            SELECT flight_no, fares FROM Flight WHERE schedule_id = ? order by flight_no desc LIMIT 1;
        `;

        db.query(sqlGetFlight, [schedule_id], (err, flightResult) => {
            if (err || flightResult.length === 0) {
                return res.status(500).json({ error: "Flight not found" });
            }

            const flight_no = flightResult[0].flight_no;
            const fares = flightResult[0].fares;
            console.log(flight_no,fares);

            const sqlInsertBooking = `
                INSERT INTO booking (client_id, flight_no, ticket_id, airport_code, fares)
                VALUES (?, ?, ?, ?, ?)
            `;

            db.query(sqlInsertBooking, [client_id, flight_no, ticket_id, airport_code, fares], (err, bookingResult) => {
                if (err) return res.status(500).json({ error: err.message });

                res.json({
                    success: true,
                    client_id,
                    ticket_id,
                    flight_no,
                    airport_code,
                    fares
                });
            });
        });
    });
});


app.get("/showPass/:id",(req,res)=>{
    const {id}=req.params;
    const sqlGet=`select c.fname,c.lname,b.airport_code,
    b.flight_no,a.gate_no, t.seat_no,t.departure_time 
    from booking b inner join clients c on c.client_id=b.client_id 
    inner join airport a on a.airport_code=b.airport_code 
    inner join ticket t on t.ticket_id=b.ticket_id 
    where c.client_id=?;`
    db.query(sqlGet,id,(err,result)=>{
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
