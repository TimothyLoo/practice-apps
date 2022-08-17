import React from "react";
import ReactDOM from 'react-dom';
// import { render } from "react-dom";
import WordList from './components/WordList.jsx';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      glossary: []
    }
  }

  componentDidMount () {
    axios.get('/glossary')
    .then()
    .catch()
  }

  render () {
    return (
      <div>
        <WordList />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
// document.getElementById("root")