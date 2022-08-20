import React from 'react';
import axios from 'axios';

class F2 extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      address_1: '',
      address_2: null,
      city: '',
      state: '',
      zip: ''
    }

    this.createShipInfo = this.createShipInfo.bind(this);
  }

  createShipInfo () {
    axios.post('/shippingInfo',{
      address_1: this.state.address_1,
      address_2: this.state.address_2,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip
    })
    .then(result=>console.log(result))
    .catch(err=>console.log(err));
  }

  render () {
    const {changePage} = this.props;

    return (
      <div>
        <p>Form 2: Shipping Info</p>
          <b>Address line 1: </b><input
            type="text" placeholder="Address line 1..." required
            onChange={(e)=>this.setState({address_1: e.target.value})}
          />
          <b>Address line 2: </b><input
            type="text" placeholder="Address line 2..."
            onChange={(e)=>this.setState({
              address_2: (e.target.value.length) ? e.target.value : null
            })}
          />
          <b>City: </b><input
            type="text" placeholder="City..." required
            onChange={(e)=>this.setState({city: e.target.value})}
          />
          <b>State: </b><input
            type="text" placeholder="State..." required
            onChange={(e)=>this.setState({state: e.target.value})}
          />
          <b>Zip Code: </b><input
            type="text" placeholder="Zip Code..." required
            onChange={(e)=>this.setState({zip: e.target.value})}
          />
        <button onClick={()=>changePage('f1')}>Prev Page</button>
        <button onClick={()=>{
          this.createShipInfo();
          changePage('f3');
        }}>Next Page</button>
      </div>
    )
  }
}

export default F2;