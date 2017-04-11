import React from 'react';
import { ThreeBounce } from 'better-react-spinkit';

const Loading = ({ isLoading, message }) => {
  if (isLoading) {
    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="panel panel-primary">
            <div className="panel-heading">{message}</div>
            <ThreeBounce />
          </div>
        </div>
      </div>
    )
  }
  else {
    return <div></div>
  }
}

Loading.propTypes = {
  isLoading: React.PropTypes.bool,
  message: React.PropTypes.string
}

Loading.defaultProps = {
  isLoading: false,
  message: ""
}

export default Loading