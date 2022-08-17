require("dotenv").config();
const express = require("express");
const path = require("path");
const models = require('./db.js');

const app = express();

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

// routes & controllers
app.get('/glossary',(req, res)=>{
  res.send('Successful Get')
});

app.post('/glossary',(req, res)=>{
  res.send('Successful Post')
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
