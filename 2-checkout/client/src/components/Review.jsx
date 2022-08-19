import React from 'react';

class Review extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    const {changePage} = this.props;

    return (
      <div>
        <p>Review</p>
        <button onClick={()=>changePage('f1')}>Edit Form 1</button>
        <button onClick={()=>changePage('f2')}>Edit Form 2</button>
        <button onClick={()=>changePage('f3')}>Edit Form 3</button>
        <button onClick={()=>changePage('homepage')}>Purchase!</button>
      </div>
    )
  }
}

export default Review;