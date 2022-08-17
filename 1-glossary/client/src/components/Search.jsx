import React from 'react';

var Search = (props) => {
  const {search} = props;
  return (
    <div>
      <input
        placeholder="Search for a word or definition..."
        onChange={(e)=>search(e.target.value)}
      />
    </div>
  )
}

export default Search;