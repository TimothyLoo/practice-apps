const mongoose = require("mongoose");

// 1. Use mongoose to establish a connection to MongoDB
// 2. Set up any schema and models needed by the app
// 3. Export the models
// 4. Import the models into any modules that need them

const wordSchema = new mongoose.Schema({
  word: String,
  definition: String
});

const Word = mongoose.model('Word', wordSchema);

// mongoose.createConnection('mongodb://localhost/glossary');

mongoose.connect('mongodb://localhost/glossary');

// models

module.exports = {
  getWords: (skip)=>{
    let count;
    return Word.estimatedDocumentCount()
    .then(totCount=>{
      count = totCount;
      return (skip === undefined) ? Word.find() : Word.find().skip(skip).limit(10)
    })
    .then(array=>{
      return {
        array: array,
        size: count
      }
    })
  },

  addWord: (wordObj)=>{
    return Word.replaceOne({word: wordObj.word}, wordObj, {upsert: true})
  },

  deleteWord: (word)=>{
    return Word.deleteOne(word)
  },

  editWord: (wordObj)=>{
    return Word.replaceOne({word: wordObj.word}, wordObj)
  }
}