import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';
import React from 'react';
import { createRenderer } from 'react-addons-test-utils';

import PermissionTable from './PermissionTable';
import PermissionRow from './PermissionRow';

const test = addAssertions(tape, { jsxEquals });
const renderer = createRenderer();

test('PermissionTable - Permissions not complete', (assert) => {
  renderer.render(<PermissionTable permissionsComplete={false} />);

  const message = 'PermissionTable is rendered correctly when no permissions are supplied.';
  const expected = <div></div>;

  const actual = renderer.getRenderOutput();

  assert.jsxEquals(actual, expected, message);
  assert.end();
});

test('PermissionTable - No permissions', (assert) => {
  renderer.render(<PermissionTable permissionsComplete={true} />);

  const message = 'PermissionTable is rendered correctly when no permissions are supplied.';
  const expected =
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
            <PermissionRow />
          </tbody>
        </table>
      </div>
    </div>;

  const actual = renderer.getRenderOutput();

  assert.jsxEquals(actual, expected, message);
  assert.end();
});

test('PermissionTable - Single permission', (assert) => {
  let permissions = [
    {
      project: "MyProj",
      repo: "MyRepo",
      permission: "MyPermission",
      group: "MyGroup",
      isValid: false
    }
  ];

  renderer.render(<PermissionTable systemPermissions={permissions} permissionsComplete={true} />);

  const message = 'PermissionTable is rendered correctly when one permission is supplied.';
  const expected =
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
            <PermissionRow permissionObj={permissions[0]} key="1" />
          </tbody>
        </table>
      </div>
    </div>;

  const actual = renderer.getRenderOutput();

  assert.jsxEquals(actual, expected, message);
  assert.end();
});

test('PermissionTable - Multiple permissions', (assert) => {
  let permissions = [
    {
      project: "MyProj",
      repo: "MyRepo",
      permission: "MyPermission",
      group: "MyGroup",
      isValid: false
    },
    {
      project: "MyProj2",
      repo: "MyRepo2",
      permission: "MyPermission2",
      group: "MyGroup2",
      isValid: false
    }
  ];

  renderer.render(<PermissionTable permissionsComplete={true} systemPermissions={permissions} />);

  const message = 'PermissionTable is rendered correctly when multiple permissions are supplied.';
  const expected =
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
            <PermissionRow permissionObj={permissions[0]} key="1" />
            <PermissionRow permissionObj={permissions[1]} key="2" />
          </tbody>
        </table>
      </div>
    </div>;

  const actual = renderer.getRenderOutput();

  assert.jsxEquals(actual, expected, message);
  assert.end();
});

test('PermissionTable - Multiple types of permissions', (assert) => {
  let systemPermissions = [
    {
      project: "MyProj",
      repo: "MyRepo",
      permission: "MyPermission",
      group: "MyGroup",
      isValid: false
    }
  ];
  let projectPermissions = [
    {
      project: "MyProj2",
      repo: "MyRepo2",
      permission: "MyPermission2",
      group: "MyGroup2",
      isValid: false
    }
  ];

  renderer.render(<PermissionTable permissionsComplete={true}
    systemPermissions={systemPermissions} projectPermissions={projectPermissions} />);

  const message = 'PermissionTable is rendered correctly when multiple permissions are supplied.';
  const expected =
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
            <PermissionRow permissionObj={systemPermissions[0]} />
            <PermissionRow permissionObj={projectPermissions[0]} />
          </tbody>
        </table>
      </div>
    </div>;

  const actual = renderer.getRenderOutput();

  assert.jsxEquals(actual, expected, message);
  assert.end();
});

test('PermissionTable - Multiple types of permissions with filtering on', (assert) => {
  let systemPermissions = [
    {
      project: "MyProj",
      repo: "MyRepo",
      permission: "MyPermission",
      group: "MyGroup",
      isValid: false
    }
  ];
  let projectPermissions = [
    {
      project: "MyProj2",
      repo: "MyRepo2",
      permission: "MyPermission2",
      group: "MyGroup2",
      isValid: true
    }
  ];

  renderer.render(<PermissionTable permissionsComplete={true}
    systemPermissions={systemPermissions} projectPermissions={projectPermissions} />);

  const message = 'PermissionTable is rendered correctly when multiple permissions are supplied.';
  const expected =
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
            <PermissionRow permissionObj={systemPermissions[0]} />
          </tbody>
        </table>
      </div>
    </div>;

  const actual = renderer.getRenderOutput();

  assert.jsxEquals(actual, expected, message);
  assert.end();
});

test('PermissionTable - Multiple types of permissions with filtering off', (assert) => {
  let systemPermissions = [
    {
      project: "MyProj",
      repo: "MyRepo",
      permission: "MyPermission",
      group: "MyGroup",
      isValid: true
    }
  ];
  let projectPermissions = [
    {
      project: "MyProj2",
      repo: "MyRepo2",
      permission: "MyPermission2",
      group: "MyGroup2",
      isValid: false
    }
  ];

  renderer.render(<PermissionTable permissionsComplete={true} showValid={true}
    systemPermissions={systemPermissions} projectPermissions={projectPermissions} />);

  const message = 'PermissionTable is rendered correctly when multiple permissions are supplied.';
  const expected =
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
            <PermissionRow permissionObj={systemPermissions[0]} />
            <PermissionRow permissionObj={projectPermissions[0]} />
          </tbody>
        </table>
      </div>
    </div>;

  const actual = renderer.getRenderOutput();

  assert.jsxEquals(actual, expected, message);
  assert.end();
});

test('PermissionTable - Multiple types of permissions with sorting', (assert) => {
  let systemPermissions = [
    {
      project: "BProj",
      repo: "BRepo",
      permission: "MyPermission",
      group: "MyGroup",
      isValid: true
    },
    {
      project: "BProj",
      repo: "ARepo",
      permission: "MyPermission",
      group: "MyGroup",
      isValid: true
    }
  ];
  let projectPermissions = [
    {
      project: "AProj",
      repo: "BRepo",
      permission: "MyPermission2",
      group: "MyGroup2",
      isValid: false
    },
    {
      project: "AProj",
      repo: "ARepo",
      permission: "MyPermission2",
      group: "MyGroup2",
      isValid: false
    },
  ];

  renderer.render(<PermissionTable permissionsComplete={true} showValid={true}
    systemPermissions={systemPermissions} projectPermissions={projectPermissions} />);

  const message = 'PermissionTable is rendered correctly when multiple permissions are supplied.';
  const expected =
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
            <PermissionRow permissionObj={projectPermissions[1]} />
            <PermissionRow permissionObj={projectPermissions[0]} />
            <PermissionRow permissionObj={systemPermissions[1]} />
            <PermissionRow permissionObj={systemPermissions[0]} />
          </tbody>
        </table>
      </div>
    </div>;

  const actual = renderer.getRenderOutput();

  assert.jsxEquals(actual, expected, message);
  assert.end();
});