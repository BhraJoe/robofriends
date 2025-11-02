import React from 'react';
import './index.css';

const SearchBox = ({ searchChange }) => {
  return (
    <div className="search-container">
      <input
        className="search-box"
        type="search"
        placeholder="search robots"
        onChange={searchChange}
      />
    </div>
  );
}

export default SearchBox;