import React from 'react';
import axios from 'axios';

class F2 extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      zip: ''
    }

    this.createShipInfo = this.createShipInfo.bind(this);
  }

  componentDidMount () {
    axios.get('/shippingInfo')
    .then(results=>{
      if (results.data[0]) {
        this.setState({
          address_1: results.data[0].address_1,
          address_2: results.data[0].address_2,
          city: results.data[0].city,
          state: results.data[0].state,
          zip: results.data[0].zip
        })
      }
    })
    .catch(err=>console.log(err));
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
            type="text" placeholder="Address line 1..." value={this.state.address_1} required
            onChange={(e)=>this.setState({address_1: e.target.value})}
          />
          <b>Address line 2: </b><input
            type="text" placeholder="Address line 2..." value={this.state.address_2}
            onChange={(e)=>this.setState({
              address_2: (e.target.value.length) ? e.target.value : null
            })}
          />
          <b>City: </b><input
            type="text" placeholder="City..." value={this.state.city} required
            onChange={(e)=>this.setState({city: e.target.value})}
          />
          <b>State: </b><input
            type="text" placeholder="State..." value={this.state.state} required
            onChange={(e)=>this.setState({state: e.target.value})}
          />
          <b>Zip Code: </b><input
            type="text" placeholder="Zip Code..." value={this.state.zip} required
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