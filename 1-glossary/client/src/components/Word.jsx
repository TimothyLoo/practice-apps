import React from 'react';

var Word = (props) => {
  const {word} = props;
  return (
    <div>
      <b>{word.word}</b> : <em>{word.definition}</em>
    </div>
  )
}

export default Word;