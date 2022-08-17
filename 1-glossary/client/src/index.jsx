import React from "react";
import axios from 'axios';
import { render } from "react-dom";
import Add from './components/Add.jsx';
import Search from './components/Search.jsx';
import WordList from './components/WordList.jsx';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      glossary: [],
      filtered: [],
      page: 0
    }

    this.search = this.search.bind(this);
    this.add = this.add.bind(this);
    this.deleteW = this.deleteW.bind(this);
    this.edit = this.edit.bind(this);
    this.turnPage = this.turnPage.bind(this);
  }

  componentDidMount () {
    axios.get('/glossary')
    .then(glossary=>this.setState({
      glossary: glossary.data,
      filtered: glossary.data.slice(0, 10)
    }))
    .catch(err=>console.log(err));
  }

  search (query) {
    if (!query.length) {this.setState({filtered: this.state.glossary.slice(0, 10)})}
    else {
      let filtered = this.state.glossary.filter(word=>
        word.word.toLowerCase().includes(query.toLowerCase()) ||
        word.definition.toLowerCase().includes(query.toLowerCase())
      );
      this.setState({filtered: filtered});
    }
  }

  add (word, def) {
    if (!word || !def) { return; }
    axios.post('/glossary', {word: word, definition: def})
    .then(qRes=>{
      console.log(qRes)
      return axios.get('/glossary')
    })
    .then(glossary=>{
      let start = this.state.page * 10;
      let end = this.state.page * 10 + 10;
      this.setState({
        glossary: glossary.data,
        filtered: glossary.data.slice(start, end)
      })
    })
    .catch(err=>console.log(err));
  }

  deleteW (word) {
    axios.delete('/glossary', {data: {word: word}})
    .then(qRes=>{
      console.log(qRes)
      return axios.get('/glossary')
    })
    .then(glossary=>{
      let start = this.state.page * 10;
      let end = this.state.page * 10 + 10;
      this.setState({
        glossary: glossary.data,
        filtered: glossary.data.slice(start, end)
      })
    })
    .catch(err=>console.log(err));
  }

  edit (word, newDef) {
    if (!newDef) { return; }
    axios.put('/glossary',{word: word, definition: newDef})
    .then(qRes=>{
      console.log(qRes)
      return axios.get('/glossary')
    })
    .then(glossary=>{
      let start = this.state.page * 10;
      let end = this.state.page * 10 + 10;
      this.setState({
        glossary: glossary.data,
        filtered: glossary.data.slice(start, end)
      })
    })
    .catch(err=>console.log(err));
  }

  turnPage (direction) {
    let start = (this.state.page + direction) * 10;
    let end = (this.state.page + direction) * 10 + 10;
    this.setState({
      page: this.state.page + direction,
      filtered: this.state.glossary.slice(start, end)
    })
  }

  render () {
    return (
      <div>
        <h2 className="appHeader">My Personal Glossary</h2>
        <Search search={this.search}/>
        <Add add={this.add}/>
        <WordList
          glossary={this.state.filtered}
          deleteW={this.deleteW}
          edit={this.edit}
          turnPage={this.turnPage}
          page={this.state.page}
          glossMax={this.state.glossary.length}/>
      </div>
    )
  }
}

render(<App />, document.getElementById("root"));