require("dotenv").config();
const express = require("express");
const path = require("path");
const models = require('./db.js');

const app = express();
app.use(express.json());

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

// routes & controllers
app.get('/glossary',(req, res)=>{
  models.getWords()
  .then(qResults=>res.send(qResults))
  .catch(err=>res.send(err));
});

app.post('/glossary',(req, res)=>{
  models.addWord(req.body)
  .then((qRes)=>res.send(qRes))
  .catch(err=>res.send(err));
});

app.delete('/glossary', (req, res)=>{
  models.deleteWord(req.body)
  .then((qRes)=>res.send(qRes))
  .catch(err=>res.send(err));
});

app.put('/glossary', (req, res)=>{
  models.editWord(req.body)
  .then((qRes)=>res.send(qRes))
  .catch(err=>res.send(err));
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
