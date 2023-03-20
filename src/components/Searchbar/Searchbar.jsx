import { useState } from "react";
import PropTypes from 'prop-types';
import { BiSearch } from "react-icons/bi";
import { IconContext } from "react-icons";
import './Searchbar.css'

function Searchbar({onSubmit}) { 
  const [search, setSearch] = useState('')
  
  const onInputChange = e => {
    setSearch(e.target.value);
  };
  
  const onFormSubmit = e => {
    e.preventDefault();
    
    onSubmit(search.toLocaleLowerCase());
    
    setSearch('')
  };
  
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onFormSubmit}>
        <button className="SearchForm-button" type="submit">
          <IconContext.Provider value={{ className: "Search-icon" }}>
            <BiSearch />
          </IconContext.Provider>
            
        </button>

        <label className="SearchForm-button-label">
          <input
            className="SearchForm-input"
            type="text"
            name='search'
            placeholder="Search images and photos"
            value={search}
            onChange={onInputChange}
          />
        </label>
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;