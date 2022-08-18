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
      glossMax: 0,
      page: 0,
      flashCardMode: false
    }

    this.search = this.search.bind(this);
    this.add = this.add.bind(this);
    this.deleteW = this.deleteW.bind(this);
    this.edit = this.edit.bind(this);
    this.turnPage = this.turnPage.bind(this);
  }

  componentDidMount () {
    axios.get('/glossary', {params: {skip: this.state.page}})
    .then(results=>{
      this.setState({
        glossary: results.data.array,
        glossMax: results.data.size
      })
    })
    .catch(err=>console.log(err));
  }

  search (query) {
    if (!query.length) {
      let start = this.state.page * 10;
      axios.get('/glossary', {params: {skip: start}})
      .then(results=>this.setState({glossary: results.data.array}))
      .catch(err=>console.log(err));
    } else {
      axios.get('/glossary')
      .then(results=>{
        let filtered = results.data.array.filter(word=>
          word.word.toLowerCase().includes(query.toLowerCase()) ||
          word.definition.toLowerCase().includes(query.toLowerCase())
        );
        this.setState({glossary: filtered})
      })
      .catch(err=>console.log(err));
    }
  }

  add (word, def) {
    if (!word || !def) { return; }
    axios.post('/glossary', {word: word, definition: def})
    .then(()=>{
      let start = this.state.page * 10;
      return axios.get('/glossary', {params: {skip: start}})
    })
    .then(results=>this.setState({
        glossary: results.data.array,
        glossMax: results.data.size
    }))
    .catch(err=>console.log(err));
  }

  deleteW (word) {
    axios.delete('/glossary', {data: {word: word}})
    .then(()=>{
      let start = this.state.page * 10;
      return axios.get('/glossary', {params: {skip: start}})
    })
    .then(results=>{this.setState({
        glossary: results.data.array,
        glossMax: results.data.size
      })})
    .catch(err=>console.log(err));
  }

  edit (word, newDef) {
    if (!newDef) { return; }
    axios.put('/glossary',{word: word, definition: newDef})
    .then(()=>{
      let start = this.state.page * 10;
      return axios.get('/glossary', {params: {skip: start}})
    })
    .then(results=>{this.setState({
        glossary: results.data.array,
      })})
    .catch(err=>console.log(err));
  }

  turnPage (direction) {
    let start = (this.state.page + direction) * 10;
    axios.get('/glossary', {params: {skip: start}})
    .then(results=>{
      this.setState({
        glossary: results.data.array,
        glossMax: results.data.size,
        page: this.state.page + direction
      })
    })
    .catch(err=>console.log(err));
  }

  render () {
    return (
      <div>
        <h2 className="appHeader">My Personal Glossary</h2>
        <button
          style={(this.state.flashCardMode) ? {backgroundColor: 'lightgreen'} : null}
          onClick={()=>this.setState({flashCardMode: !this.state.flashCardMode})}
        >Flash Card Mode</button>
        <Search search={this.search}/>
        <Add add={this.add}/>
        <WordList
          glossary={this.state.glossary}
          deleteW={this.deleteW}
          edit={this.edit}
          turnPage={this.turnPage}
          page={this.state.page}
          glossMax={this.state.glossMax}
          flashCardMode= {this.state.flashCardMode}
        />
      </div>
    )
  }
}

render(<App />, document.getElementById("root"));