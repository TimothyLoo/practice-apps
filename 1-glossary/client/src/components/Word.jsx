import React from 'react';

var Word = (props) => {
  const {word, deleteW, edit} = props;
  return (
    <div className="word">
      <div className="wdAndDef">
        <b>{word.word}</b> : <em>{word.definition}</em>
      </div>
      <div className="wordBut">
        <button onClick={()=>{
          let newDef = prompt(`What is the new definition for ${word.word}?`);
          edit(word.word, newDef);
        }}>Edit</button>
        <button onClick={()=>deleteW(word.word)}>Delete</button>
      </div>
    </div>
  )
}

export default Word;