import React from 'react';
import axios from 'axios';

class F1 extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }

    this.createAcct = this.createAcct.bind(this);
  }

  componentDidMount () {
    axios.get('/users')
    .then(results=>{
      if (results.data[0]) {
        this.setState({
          name: results.data[0].name,
          email: results.data[0].email,
          password: results.data[0].password
        })
      }
    })
    .catch(err=>console.log(err));
  }

  createAcct () {
    axios.post('/users',{
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    })
    .then(result=>console.log(result))
    .catch(err=>console.log(err));
  }

  render () {
    const {changePage} = this.props;

    return (
      <div>
        <p>Form 1: Account Creation</p>
        <b>Name: </b><input
          type="text" placeholder="Your name..." value={this.state.name} required
          onChange={(e)=>this.setState({name: e.target.value})}
        />
        <b>Email: </b><input
          type="email" placeholder="Your email..." value={this.state.email} required
          onChange={(e)=>this.setState({email: e.target.value})}
        />
        <b>Password: </b><input
          type="password" placeholder="Your password..." value={this.state.password} required
          onChange={(e)=>this.setState({password: e.target.value})}
        />
        <button onClick={()=>changePage('homepage')}>Prev Page</button>
        <button onClick={()=>{
          this.createAcct();
          changePage('f2');
        }}>Next Page</button>
      </div>
    )
  }
}

export default F1;