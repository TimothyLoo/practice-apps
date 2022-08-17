import React from 'react';

var Search = (props) => {
  const {search} = props;
  return (
    <div className="search">
      <input
        className="searchBar"
        placeholder="Search for a word or definition..."
        onChange={(e)=>search(e.target.value)}
      />
    </div>
  )
}

export default Search;