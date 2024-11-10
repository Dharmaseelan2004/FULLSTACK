import React, { useState,useEffect,useRef } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const inputRef = useRef();

  const handleSearch = () => {
    console.log({query,type})
    onSearch({query,type});
    inputRef.current.focus()
  };

  useEffect(()=>{
    inputRef.current.focus()
  },[])

  return (
    <div className="search-bar-container" align='center'>
      <input
        type="text"
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
        ref={inputRef}
      />
      <select value={type} onChange={(e) => setType(e.target.value)} className="type-select">
        <option value="">All Types</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
        <option value="Dessert">Dessert</option>
        <option value="Appetizer">Appetizer</option>
        <option value="Soups">Soups</option>
        <option value="Beverages">Beverages</option>
        <option value="Other">Other</option>
      </select>
      <button onClick={handleSearch}  className="search-button">Search</button>
    </div>
  );
};

export default SearchBar;