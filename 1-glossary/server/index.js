require("dotenv").config();
const express = require("express");
const path = require("path");
const models = require('./db.js');

const app = express();

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

// routes & controllers
app.get('/glossary',(req, res)=>{
  models.getWords()
  .then(qResults=>res.send(qResults))
  .catch(err=>res.send(err));
});

app.post('/glossary',(req, res)=>{
  models.addWord({word: 'Tim', definition: 'Used to swim'})
  .then(()=>res.send('Successful Post'))
  .catch(err=>res.send(err));
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
