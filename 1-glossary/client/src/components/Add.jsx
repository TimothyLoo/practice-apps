import React from 'react';

class Add extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <input placeholder="New word..."/>
        <input placeholder="New word's definition..."/>
        <button>Add new word</button>
      </div>
    )
  }

}

export default Add;