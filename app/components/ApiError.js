import React from 'react';

const ApiError = ({error}) => {
   if (error != null) {
      return(
          <div className="panel panel-danger">
            <div className="panel-heading">{error.name}</div>
            <div className="panel-body">
              <p>{error.message}</p>
              <p>{error.reason}</p>
              <p>{error.action}</p>
            </div>
          </div>
      )
   }
   else {
      return <div></div>
   }
}

ApiError.propTypes = {
  error: React.PropTypes.oneOfType([React.PropTypes.oneOf([null]), React.PropTypes.object])
}

ApiError.defaultProps = {
   error: null
}

export default ApiError