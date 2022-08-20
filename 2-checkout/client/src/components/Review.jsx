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
      console.log('info', info)
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
    console.log('state', this.state)
    const {changePage} = this.props;

    return (
      <div>
        <b>Name: </b>
        <b>Email: </b>
        <b>Password: </b>
        <button onClick={()=>changePage('f1')}>Edit Form 1</button>
        <button onClick={()=>changePage('f2')}>Edit Form 2</button>
        <button onClick={()=>changePage('f3')}>Edit Form 3</button>
        <button onClick={()=>changePage('homepage')}>Purchase!</button>
      </div>
    )
  }
}

export default Review;