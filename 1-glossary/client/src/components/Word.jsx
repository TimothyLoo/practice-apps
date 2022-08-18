import React from 'react';

var Word = (props) => {
  const {word, deleteW, edit, flashCardMode} = props;
  let hidden = flashCardMode;

  return (
    <div className="word">
      <div className="wdAndDef">
        <b onClick={()=>{hidden = !hidden; console.log(hidden);}}>{word.word}</b> :
        {(flashCardMode) ? null : <em> {word.definition}</em>}
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