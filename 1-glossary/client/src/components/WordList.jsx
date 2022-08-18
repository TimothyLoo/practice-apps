import React from 'react';
import Word from './Word.jsx';

class WordList extends React.Component{
  constructor (props) {
    super(props);
  }

  render () {
  const {glossary, deleteW, edit, turnPage, page, glossMax, flashCardMode} = this.props;

  return (
      <div>
        {glossary.map(word=>
          <Word
            word={word}
            key={word.word}
            deleteW={deleteW}
            edit={edit}
            flashCardMode={flashCardMode}
          />
        )}
        <br/>
        <br/>
        <br/>
        <button
          onClick={()=>turnPage(-1)}
          disabled={(!page) ? "disabled" : ""}
        >Prev Page</button>
        <em> Page {page} </em>
        <button
          onClick={()=>turnPage(1)}
          disabled={(page * 10 + 10 >= glossMax) ? "disabled" : ""}
        >Next Page</button>
      </div>
    )
  }
}

export default WordList;