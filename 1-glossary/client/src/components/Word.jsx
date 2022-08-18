import React from 'react';

class Word extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      hidden: true
    }
  }

  render () {
    const {word, deleteW, edit, flashCardMode} = this.props;

    return (
      <div className="word">
        <div className="wdAndDef">
          <b
            style={(flashCardMode) ? {cursor: 'pointer'} : null}
            onClick={()=>(flashCardMode) ? this.setState({hidden: !this.state.hidden}) : null}
          >{word.word} : </b>
          {(!flashCardMode) ? <em> {word.definition}</em> : (this.state.hidden) ? null : <em> {word.definition}</em>}
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
}

export default Word;