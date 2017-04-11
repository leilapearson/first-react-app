import React from 'react';

const Refresh = ({ isRefreshing, isLoading, onRefreshClick, onDisabledRefreshClick }) => {
  return (
    <button className={"btn btn-default" + ((isRefreshing || isLoading) ? " disabled" : "")}
      onClick={((isRefreshing || isLoading) ? onDisabledRefreshClick : onRefreshClick)}>
      <span className="glyphicon glyphicon-refresh"></span>Refresh
    </button>
  )
}

Refresh.propTypes = {
  isRefreshing: React.PropTypes.bool.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  onRefreshClick: React.PropTypes.func.isRequired,
  onDisabledRefreshClick: React.PropTypes.func.isRequired
}

Refresh.defaultProps = {
  isRefreshing: false,
  isLoading: false,
  onRefreshClick: f => f,
  onDisabledRefreshClick: f => f
}

export default Refresh