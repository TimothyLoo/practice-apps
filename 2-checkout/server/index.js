require("dotenv").config();
const express = require("express");
const path = require("path");
const sessionHandler = require("./middleware/session-handler");
const logger = require("./middleware/logger");

// Establishes connection to the database on server start
const db = require("./db");

const app = express();
app.use(express.json());

// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
app.use(sessionHandler);

// Logs the time, session_id, method, and url of incoming requests.
app.use(logger);

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

// Routes, Controllers & Models
// GETS
app.get('/users', (req, res)=>{
  const s_id = req.session_id;
  db.queryAsync(`SELECT * FROM users WHERE s_id = ?`, [s_id])
  .then(([rows, fields])=>res.json(rows))
  .catch(err=>res.send(err));
});

app.get('/shippingInfo', (req, res)=>{
  const s_id = req.session_id;
  db.queryAsync(`SELECT * FROM shipping_info WHERE s_id = ?`, [s_id])
  .then(([rows, fields])=>res.json(rows))
  .catch(err=>res.send(err));
});

app.get('/billingInfo', (req, res)=>{
  const s_id = req.session_id;
  db.queryAsync(`SELECT * FROM billing_info WHERE s_id = ?`, [s_id])
  .then(([rows, fields])=>res.json(rows))
  .catch(err=>res.send(err));
});

// POSTS
app.post('/users', (req, res)=>{
  const {name, email, password} = req.body;
  const s_id = req.session_id;

  db.queryAsync(`SELECT s_id FROM users`)
  .then(([rows, fields])=>{
    rows = rows.map(row=>row = row.s_id);
    if (rows.includes(s_id)) {
      return db.queryAsync(`UPDATE users
        SET name = ?, email = ?, password = ?
        WHERE s_id = ?`,
        [name, email, password, s_id])
    } else {
      return db.queryAsync(`INSERT INTO users
        (s_id, name, email, password) VALUES (?,?,?,?)`,
        [s_id,name,email,password])
    }
  })
  .then(result=>res.send(result))
  .catch(err=>res.send(err));
});

app.post('/shippingInfo', (req, res)=>{
  const {address_1, address_2, city, state, zip} = req.body;
  const s_id = req.session_id;

  db.queryAsync(`SELECT s_id FROM shipping_info`)
  .then(([rows, fields])=>{
    rows = rows.map(row=>row = row.s_id);
    if (rows.includes(s_id)) {
      return db.queryAsync(`UPDATE shipping_info
        SET address_1 = ?, address_2 = ?, city = ?, state = ?, zip = ?
        WHERE s_id = ?`,
        [address_1, address_2, city, state, zip, s_id])
    } else {
      return db.queryAsync(`INSERT INTO shipping_info
        (s_id, address_1, address_2, city, state, zip) VALUES (?,?,?,?,?,?)`,
        [s_id, address_1, address_2, city, state, zip])
    }
  })
  .then(result=>res.send(result))
  .catch(err=>res.send(err));
});

app.post('/billingInfo', (req, res)=>{
  console.log(req.body)
  const {ccn, expDt, cvv, billZip} = req.body;
  const s_id = req.session_id;

  db.queryAsync(`SELECT s_id FROM billing_info`)
  .then(([rows, fields])=>{
    rows = rows.map(row=>row = row.s_id);
    if (rows.includes(s_id)) {
      return db.queryAsync(`UPDATE billing_info
        SET ccn = ?, expDt = ?, cvv = ?, bill_zip = ?
        WHERE s_id = ?`,
        [ccn, expDt, cvv, billZip, s_id])
    } else {
      return db.queryAsync(`INSERT INTO billing_info
        (s_id, ccn, expDt, cvv, bill_zip) VALUES (?,?,?,?,?)`,
        [s_id, ccn, expDt, cvv, billZip])
    }
  })
  .then(result=>res.send(result))
  .catch(err=>res.send(err));
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
