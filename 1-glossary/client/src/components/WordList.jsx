import React from 'react';
import Word from './Word.jsx';

var WordList = (props) => {
  const {glossary} = props;
  return (
    <div>
      {glossary.map(word=>
        <Word word={word} key={word.word}/>
      )}
    </div>
  )
}

export default WordList;