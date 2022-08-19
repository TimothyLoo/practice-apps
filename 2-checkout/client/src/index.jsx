import React from "react";
import { render } from "react-dom";
import F1 from './components/F1.jsx';
import F2 from './components/F2.jsx';
import F3 from './components/F3.jsx';
import Review from './components/Review.jsx';

class Homepage extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      page: 'homepage'
    }

    this.changePage = this.changePage.bind(this);
  }

  changePage (newPage) {
    this.setState({page: newPage})
  }


  render () {
    if (this.state.page === 'homepage') {
      return (
        <div>
          <button onClick={()=>this.changePage('f1')}>Checkout</button>
          <code>Page Cookie: {JSON.stringify(document.cookie, undefined, "\t")}</code>
        </div>
      )
    }

    if (this.state.page === 'f1') {
      return (
        <F1 changePage={this.changePage}/>
      )
    }

    if (this.state.page === 'f2') {
      return (
        <F2 changePage={this.changePage}/>
      )
    }

    if (this.state.page === 'f3') {
      return (
        <F3 changePage={this.changePage}/>
      )
    }

    if (this.state.page === 'review') {
      return (
        <Review changePage={this.changePage}/>
      )
    }
  }
}

render(<Homepage />, document.getElementById("root"));