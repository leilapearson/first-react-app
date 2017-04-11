import React from 'react';

const Filter = ({ showValid, onFilterClick }) => {
  return (
    <button className="btn btn-default" onClick={onFilterClick}>
      {showValid ? "Hide Valid" : "Show Valid"}
    </button>
  )
}

Filter.propTypes = {
  showValid: React.PropTypes.bool.isRequired,
  onFilterClick: React.PropTypes.func.isRequired
}

Filter.defaultProps = {
  showValid: false,
  onFilterClick: f => f
}

export default Filter