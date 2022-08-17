import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
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
    .then(glossary=>{this.setState({glossary: glossary.data})})
    .catch(err=>console.log(err));
  }

  render () {
    return (
      <div>
        <h2>My Personal Glossary</h2>
        <WordList glossary={this.state.glossary}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
// document.getElementById("root")