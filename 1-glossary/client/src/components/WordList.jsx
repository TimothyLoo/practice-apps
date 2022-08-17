import React from 'react';
import Word from './Word.jsx';

var WordList = (props) => {
  const {glossary, deleteW, edit} = props;
  return (
    <div>
      {glossary.map(word=>
        <Word word={word} key={word.word} deleteW={deleteW} edit={edit}/>
      )}
    </div>
  )
}

export default WordList;