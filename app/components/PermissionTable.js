import React from 'react';
import R from 'ramda';
import PermissionRow from './PermissionRow';

const PermissionTable = ({ permissionsComplete, systemPermissions, projectPermissions, repoPermissions, branchPermissions, showValid }) => {
  let permissionsArray = [...systemPermissions, ...projectPermissions, ...repoPermissions, ...branchPermissions];
  let mapIndexed = R.addIndex(R.map);
  if (permissionsComplete) {
      return (
        <div className="row">
          <div className="col-xs-12">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Repo</th>
                  <th>Permission</th>
                  <th>Group</th>
                  <th>Valid?</th>
                </tr>
              </thead>
              <tbody>
                {
                  R.pipe(
                    R.sortWith([R.ascend(R.prop('project')), R.ascend(R.prop('repo'))]),
                    R.filter((element) => { return showValid ? true : !element.isValid }),
                    mapIndexed((permissionObj, index) => <PermissionRow permissionObj={permissionObj} key={index + 1} />)
                  )(permissionsArray)
                }
              </tbody>
            </table>
          </div>
        </div>
      )
    }
    return (<div></div>);
};

PermissionTable.propTypes = {
  permissionsComplete: React.PropTypes.bool,
  systemPermissions: React.PropTypes.array,
  projectPermissions: React.PropTypes.array,
  repoPermissions: React.PropTypes.array,
  branchPermissions: React.PropTypes.array,
  showValid: React.PropTypes.bool
};

PermissionTable.defaultProps = {
  permissionsComplete: false,
  systemPermissions: [{
    project: "-",
    repo: "-",
    permission: "-",
    group: "-",
    isValid: false
  }],
  projectPermissions: [],
  repoPermissions: [],
  branchPermissions: [],
  showValid: false
};


export default PermissionTable