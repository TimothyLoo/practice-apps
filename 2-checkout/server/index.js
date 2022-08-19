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
app.get('/checkout', (req, res)=>{
  db.queryAsync(`SELECT * FROM responses`)
  .then(([rows, fields])=>{
    res.json(rows)
  })
  .catch(err=>res.send(err));
});

app.post('/checkout', (req, res)=>{
  console.log(req.body)
  db.queryAsync(
    `INSERT INTO responses
    (s_id, name, email, password) VALUES (?,?,?,?)`,
    [2,2,2,2])
  .then(result=>{
    console.log(result)
    res.send(result)
  })
  .catch(err=>res.send(err));
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
