import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';
import React from 'react';
import { createRenderer } from 'react-addons-test-utils';

import PermissionRow from './PermissionRow';

const test = addAssertions(tape, { jsxEquals });
const renderer = createRenderer();

test('PermissionRow - No permission', (assert) => {
  renderer.render(<PermissionRow />);

  const message = 'PermissionRow is rendered correctly when no permission object is supplied.';
  const expected =
    <tr>
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td>no</td>
    </tr>;
  const actual = renderer.getRenderOutput();

  assert.jsxEquals(actual, expected, message);
  assert.end();
});

test('PermissionRow - With permission object', (assert) => {
  const testPermissionObj = {
    project: "myproj",
    repo: "myrepo",
    permission: "mypermission",
    group: "mygroup",
    isValid: true
  }
  renderer.render(<PermissionRow permissionObj={testPermissionObj} />);

  const message = 'PermissionRow is rendered correctly when a permission object is supplied.';
  const expected =
    <tr>
      <td>myproj</td>
      <td>myrepo</td>
      <td>mypermission</td>
      <td>mygroup</td>
      <td>yes</td>
    </tr>;
  const actual = renderer.getRenderOutput();

  assert.jsxEquals(actual, expected, message);
  assert.end();
});

test('PermissionRow - With permission object and key', (assert) => {
  const testPermissionObj = {
    project: "myproj",
    repo: "myrepo",
    permission: "mypermission",
    group: "mygroup",
    isValid: true
  }
  renderer.render(<PermissionRow permissionObj={testPermissionObj} key={200} />);

  const message = 'PermissionRow is rendered correctly when a permission object and id is supplied.';
  const expected =
    <tr>
      <td>myproj</td>
      <td>myrepo</td>
      <td>mypermission</td>
      <td>mygroup</td>
      <td>yes</td>
    </tr>;
  const actual = renderer.getRenderOutput();

  assert.jsxEquals(actual, expected, message);
  assert.end();
});
