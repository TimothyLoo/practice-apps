import React from 'react';
import axios from 'axios';

class F3 extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      ccn: '',
      expDt: '',
      cvv: '',
      billZip: ''
    }

    this.createBillInfo = this.createBillInfo.bind(this);
  }

  componentDidMount () {
    axios.get('/billingInfo')
    .then(results=>{
      if (results.data[0]) {
        this.setState({
          ccn: results.data[0].ccn,
          expDt: results.data[0].expDt,
          cvv: results.data[0].cvv,
          billZip: results.data[0].bill_zip
        })
      }
    })
    .catch(err=>console.log(err));
  }

  createBillInfo () {
    axios.post('/billingInfo',{
      ccn: this.state.ccn,
      expDt: this.state.expDt,
      cvv: this.state.cvv,
      billZip: this.state.billZip
    })
    .then(result=>console.log(result))
    .catch(err=>console.log(err));
  }

  render () {
    const {changePage} = this.props;

    return (
      <div className="form">
        <p>Form 3: Billing Info</p>
          <b>Credit Card #: </b><input
            type="text" placeholder="Credit Card #..." value={this.state.ccn} required
            onChange={(e)=>this.setState({ccn: e.target.value})}
          />
          <b>Exp date: </b><input
            type="text" placeholder="Exp Date..." value={this.state.expDt} required
            onChange={(e)=>this.setState({expDt: e.target.value})}
          />
          <b>CVV: </b><input
            type="text" placeholder="CVV..." value={this.state.cvv} required
            onChange={(e)=>this.setState({cvv: e.target.value})}
          />
          <b>Billing Zip Code: </b><input
            type="text" placeholder="Billing Zip Code..." value={this.state.billZip} required
            onChange={(e)=>this.setState({billZip: e.target.value})}
          />
        <button onClick={()=>changePage('f2')}>Prev Page</button>
        <button onClick={()=>{
          this.createBillInfo();
          changePage('review');
        }}>Next Page</button>
      </div>
    )
  }
}

export default F3;