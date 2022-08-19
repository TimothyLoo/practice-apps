import React from 'react';

class F2 extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    const {changePage} = this.props;

    return (
      <div>
        <p>Form 2: Shipping Info</p>
        <form action="">
          <label>Address line 1: </label>
          <input type="text" placeholder="Address line 1..." required/>
          <label>Address line 2: </label>
          <input type="text" placeholder="Address line 2..."/>
          <label>City: </label>
          <input type="text" placeholder="City..." required/>
          <label>State: </label>
          <input type="text" placeholder="State..." required/>
          <label>Zip Code: </label>
          <input type="text" placeholder="Zip Code..." required/>
          <input type="submit" value="Submit"/>
        </form>
        <button onClick={()=>changePage('f1')}>Prev Page</button>
        <button onClick={()=>changePage('f3')}>Next Page</button>
      </div>
    )
  }
}

export default F2;