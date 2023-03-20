import PropTypes from 'prop-types';
import React from "react";
import './Button.css';

function Button({ onClick}) { 
  return (
    <div className="Button-wrapper">
      <button className="Button" type="button" onClick={onClick}>Load more</button>
    </div>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;