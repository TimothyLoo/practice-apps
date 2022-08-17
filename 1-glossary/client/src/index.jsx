import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
// import { render } from "react-dom";
import Add from './components/Add.jsx';
import Search from './components/Search.jsx';
import WordList from './components/WordList.jsx';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      glossary: []
    }

    this.search = this.search.bind(this);
  }

  componentDidMount () {
    axios.get('/glossary')
    .then(glossary=>this.setState({glossary: glossary.data}))
    .catch(err=>console.log(err));
  }

  search (query) {
    axios.get('/glossary')
    .then(glossary=>glossary.data.filter(word=>
      word.word.toLowerCase().includes(query.toLowerCase()) || word.definition.toLowerCase().includes(query.toLowerCase())
    ))
    .then(filtered=>this.setState({glossary: filtered}))
    .catch(err=>console.log(err));
  }

  render () {
    return (
      <div>
        <h2>My Personal Glossary</h2>
        <Search search={this.search}/>
        <Add />
        <WordList glossary={this.state.glossary}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
// document.getElementById("root")