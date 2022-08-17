import React from 'react';

class Add extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      newWord: '',
      newDef: ''
    }
  }

  render () {
    const {add} = this.props;

    return (
      <div>
        <input placeholder="New word..." onChange={(e)=>this.setState({newWord: e.target.value})}/>
        <input placeholder="New word's definition..." onChange={(e)=>{this.setState({newDef: e.target.value})}}/>
        <button onClick={()=>add(this.state.newWord, this.state.newDef)}>Add new word</button>
      </div>
    )
  }

}

export default Add;