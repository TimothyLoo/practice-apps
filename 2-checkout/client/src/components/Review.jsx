import React from 'react';
import axios from 'axios';

class Review extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      name: '',
      email: '',
      password: '',
      address_1: '',
      address_2: null,
      city: '',
      state: '',
      zip: '',
      ccn: '',
      expDt: '',
      cvv: '',
      bill_zip: ''
    }
  }

  componentDidMount () {
    const info = {};
    axios.get('/users')
    .then(results=>{
      Object.assign(info, results.data[0]);
      return axios.get('/shippingInfo')
    })
    .then(results=>{
      Object.assign(info, results.data[0]);
      return axios.get('/billingInfo')
    })
    .then(results=>{
      Object.assign(info, results.data[0]);
      this.setState({
        name: info.name,
        email: info.email,
        password: info.password,
        address_1: info.address_1,
        address_2: info.address_2,
        city: info.city,
        state: info.state,
        zip: info.zip,
        ccn: info.ccn,
        expDt: info.expDt,
        cvv: info.cvv,
        bill_zip: info.bill_zip
      });
    })
    .catch(err=>console.log(err));

  }

  render () {
    const {changePage} = this.props;

    return (
      <div>
        <p><b>Name: </b><em>{this.state.name}</em></p>
        <p><b>Email: </b><em>{this.state.email}</em></p>
        <p><b>Password: </b><em>{this.state.password}</em></p>
        <br/>
        <button onClick={()=>changePage('f1')}>Edit Form 1</button>
        <br/>
        <p><b>Address 1: </b><em>{this.state.address_1}</em></p>
        <p><b>Address 2: </b><em>{this.state.address_2}</em></p>
        <p><b>City: </b><em>{this.state.city}</em></p>
        <p><b>State: </b><em>{this.state.state}</em></p>
        <p><b>Zip: </b><em>{this.state.zip}</em></p>
        <br/>
        <button onClick={()=>changePage('f2')}>Edit Form 2</button>
        <br/>
        <p><b>Credit Card Number: </b><em>{this.state.ccn}</em></p>
        <p><b>Exp Date: </b><em>{this.state.expDt}</em></p>
        <p><b>CVV: </b><em>{this.state.cvv}</em></p>
        <p><b>Billing Zip Code: </b><em>{this.state.bill_zip}</em></p>
        <br/>
        <button onClick={()=>changePage('f3')}>Edit Form 3</button>
        <br/>
        <button onClick={()=>changePage('homepage')}>Purchase!</button>
      </div>
    )
  }
}

export default Review;