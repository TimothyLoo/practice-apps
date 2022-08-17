import React from 'react';

var Word = (props) => {
  const {word} = props;
  return (
    <div>
      <b>{word.word}</b> : <em>{word.definition}</em>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  )
}

export default Word;