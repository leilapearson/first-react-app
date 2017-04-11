import React from 'react';

const PermissionRow = ({ permissionObj }) => {
  return (
    <tr>
      <td>{permissionObj.project}</td>
      <td>{permissionObj.repo}</td>
      <td>{permissionObj.permission}</td>
      <td>{permissionObj.group}</td>
      <td>{permissionObj.isValid ? "yes" : "no"}</td>
    </tr>
  )
}

PermissionRow.propTypes = {
  permissionObj: React.PropTypes.object,
}

PermissionRow.defaultProps = {
  permissionObj: {
    project: "-",
    repo: "-",
    permission: "-",
    group: "-",
    isValid: false
  }
}

export default PermissionRow