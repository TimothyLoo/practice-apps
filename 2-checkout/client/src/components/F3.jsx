import React from 'react';

class F3 extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    const {changePage} = this.props;

    return (
      <div>
        <p>Form 3: Billing Info</p>
        <form action="">
          <label>Credit Card #: </label>
          <input type="text" placeholder="Credit Card #..." required/>
          <label>Exp date: </label>
          <input type="text" placeholder="Exp Date..." required/>
          <label>CVV: </label>
          <input type="text" placeholder="CVV..." required/>
          <label>Billing Zip Code: </label>
          <input type="text" placeholder="Billing Zip Code..." required/>
          <input type="submit" value="Submit"/>
        </form>
        <button onClick={()=>changePage('f2')}>Prev Page</button>
        <button onClick={()=>changePage('review')}>Next Page</button>
      </div>
    )
  }
}

export default F3;