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
    this.add = this.add.bind(this);
    this.deleteW = this.deleteW.bind(this);
    this.edit = this.edit.bind(this);
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

  add (word, def) {
    axios.post('/glossary', {word: word, definition: def})
    .then(qRes=>{
      console.log(qRes)
      return axios.get('/glossary')
    })
    .then(glossary=>this.setState({glossary: glossary.data}))
    .catch(err=>console.log(err));
  }

  deleteW (word) {
    axios.delete('/glossary', {data: {word: word}})
    .then(qRes=>{
      console.log(qRes)
      return axios.get('/glossary')
    })
    .then(glossary=>this.setState({glossary: glossary.data}))
    .catch(err=>console.log(err));
  }

  edit (word, newDef) {
    axios.put('/glossary',{word: word, definition: newDef})
    .then(qRes=>{
      console.log(qRes)
      return axios.get('/glossary')
    })
    .then(glossary=>this.setState({glossary: glossary.data}))
    .catch(err=>console.log(err));
  }

  render () {
    return (
      <div>
        <h2>My Personal Glossary</h2>
        <Search search={this.search}/>
        <Add add={this.add}/>
        <WordList
          glossary={this.state.glossary}
          deleteW={this.deleteW}
          edit={this.edit}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
// document.getElementById("root")