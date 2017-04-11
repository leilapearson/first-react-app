import React from 'react';
import Filter from './Filter';
import Refresh from './Refresh';

const Actions = ({ showValid, onFilterClick, isRefreshing, isLoading, onRefreshClick }) => {
  return (!isLoading ? 
    <div className="row">
      <div className="col-sm-4">
        <Filter showValid={showValid} onFilterClick={onFilterClick} />
      </div>
      <div className="col-sm-4"></div>
      <div className="col-sm-4">
        <div className="text-right">
          <Refresh isRefreshing={isRefreshing} isLoading={isLoading} onRefreshClick={onRefreshClick} />
        </div>
      </div>
    </div>
   : <div></div>)
}

Actions.propTypes = {
  showValid: React.PropTypes.bool.isRequired,
  onFilterClick: React.PropTypes.func.isRequired,
  isRefreshing: React.PropTypes.bool.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  onRefreshClick: React.PropTypes.func.isRequired
}

Actions.defaultProps = {
  showValid: false,
  isRefreshing: false,
  isLoading: false,
  onFilterClick: f => f,
  onRefreshClick: f => f
}

export default Actions