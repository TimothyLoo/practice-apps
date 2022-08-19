import React from 'react';

class F1 extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  render () {
    const {changePage} = this.props;

    return (
      <div>
        <p>Form 1: Account Creation</p>
        <form action="">
          <div>
            <label>Name: </label>
            <input type="text" placeholder="Your name..." required/>
          </div>
          <div>
            <label>Email: </label>
            <input type="email" placeholder="Your email..." required/>
          </div>
          <div>
            <label>Password: </label>
            <input type="password" placeholder="Your password..." required/>
          </div>
          <input type="submit" value="Submit"/>
        </form>
        <button onClick={()=>changePage('homepage')}>Prev Page</button>
        <button onClick={()=>changePage('f2')}>Next Page</button>
      </div>
    )
  }
}

export default F1;