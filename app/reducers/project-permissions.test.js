import tape from 'tape';

import { initialState, projectPermissions, groupIsValid } from './project-permissions';
import {
  INIT_PENDING_PROJECT_PERMISSIONS,
  GET_PROJECT_PERMISSIONS,
  GET_PROJECT_PERMISSIONS_SUCCESS,
  GET_PROJECT_PERMISSIONS_ERROR
} from '../actions/index';

const test = tape;

const projectPermissionsProj1Json = JSON.parse(`
{
  "size": 3,
  "limit": 25,
  "isLastPage": true,
  "values": [
    {
      "group": {
        "name": "tool_git_proj1_admin"
      },
      "permission": "PROJECT_ADMIN"
    },
    {
      "group": {
        "name": "tool_git_proj1_read"
      },
      "permission": "PROJECT_READ"
    },
    {
      "group": {
        "name": "tool_git_proj1_write"
      },
      "permission": "PROJECT_WRITE"
    }
  ],
  "start": 0
}`);

const projectPermissionsProj1JsonPage1 = JSON.parse(`
{
  "size": 1,
  "limit": 1,
  "isLastPage": false,
  "values": [
    {
      "group": {
        "name": "tool_git_proj1_admin"
      },
      "permission": "PROJECT_ADMIN"
    }
  ],
  "start": 0,
  "nextPageStart": 1
}
`);

const projectPermissionsProj1JsonPage2 = JSON.parse(`
{
  "size": 1,
  "limit": 1,
  "isLastPage": false,
  "values": [
    {
      "group": {
        "name": "tool_git_proj1_read"
      },
      "permission": "PROJECT_READ"
    }
  ],
  "start": 1,
  "nextPageStart": 2
}
`);

const projectPermissionsProj1JsonPage3 = JSON.parse(`
{
  "size": 1,
  "limit": 1,
  "isLastPage": true,
  "values": [
    {
      "group": {
        "name": "tool_git_proj1_write"
      },
      "permission": "PROJECT_WRITE"
    }
  ],
  "start": 2
}
`);

const projectPermissionsProj2Json = JSON.parse(`
{
  "size": 1,
  "limit": 1,
  "isLastPage": true,
  "values": [
    {
      "group": {
        "name": "tool_git_proj2_write"
      },
      "permission": "PROJECT_WRITE"
    }
  ],
  "start": 0
}
`);

const projectPermissionsValues = [
  {
    project: "proj1",
    repo: "--NA--",
    group: "tool_git_proj1_admin",
    permission: "PROJECT_ADMIN",
    isValid: true
  },
  {
    project: "proj2",
    repo: "--NA--",
    group: "tool_git_proj2_write",
    permission: "PROJECT_WRITE",
    isValid: true
  },
  {
    project: "proj1",
    repo: "--NA--",
    group: "tool_git_proj1_read",
    permission: "PROJECT_READ",
    isValid: true
  },
  {
    project: "proj1",
    repo: "--NA--",
    group: "tool_git_proj1_write",
    permission: "PROJECT_WRITE",
    isValid: true
  },
];

const projectPermissionsValuesProj1Page1 = projectPermissionsValues.slice(0, 1);
const projectPermissionsValuesPage1 = projectPermissionsValues.slice(0, 2);
const projectPermissionsValuesPage2 = projectPermissionsValues.slice(0, 3);
const projectPermissionsValuesPage3 = projectPermissionsValues.slice(0, 4);
const projectPermissionsValuesProj1 = projectPermissionsValues.filter((element) => (element.project === "proj1"));

const permissionsStateStart = {
  ...initialState,
  inProgress: true,
  complete: false,
  apiError: null,
  results: [],
  pending: [{ projectKey: "proj1", repoSlug: "", nextPageStart: 0, page: 1 }, { projectKey: "proj2", repoSlug: "", nextPageStart: 0, page: 1 }],
  page: 1
}

const permissionsStateProj1Page1Complete = {
  ...permissionsStateStart,
  inProgress: true,
  complete: false,
  apiError: null,
  results: projectPermissionsValuesProj1Page1,
  pending: [{ projectKey: "proj1", repoSlug: "", nextPageStart: 1, page: 2 }, { projectKey: "proj2", repoSlug: "", nextPageStart: 0, page: 1 }],
  page: 1
};

const permissionsStatePage1Complete = {
  ...permissionsStateStart,
  inProgress: true,
  complete: false,
  apiError: null,
  results: projectPermissionsValuesPage1,
  pending: [{ projectKey: "proj1", repoSlug: "", nextPageStart: 1, page: 2 }],
  page: 2
}

const permissionsStatePage2Complete = {
  ...permissionsStateStart,
  inProgress: true,
  complete: false,
  apiError: null,
  results: projectPermissionsValuesPage2,
  pending: [{ projectKey: "proj1", repoSlug: "", nextPageStart: 2, page: 3 }],
  page: 3
};

const permissionsStatePage3Complete = {
  ...permissionsStateStart,
  inProgress: false,
  complete: true,
  apiError: null,
  results: projectPermissionsValuesPage3,
  pending: [],
  page: 3
};

const permissionsStateProj1Complete = {
  ...permissionsStateStart,
  inProgress: true,
  complete: false,
  apiError: null,
  results: projectPermissionsValuesProj1,
  pending: [{ projectKey: "proj2", repoSlug: "", nextPageStart: 0, page: 1 }],
  page: 1
};

test('Project Permissions - Invalid action type', (assert) => {
  const message = 'Invalid action type is handled correctly.';
  const expected = initialState;
  const actual = projectPermissions(initialState, { type: 'INVALID_TYPE' });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Project Permissions - Init pending project permissions success', (assert) => {
  const message = 'Successful init pending project permissions';
  const expected = permissionsStateStart;
  const actual = projectPermissions(initialState, {
    type: INIT_PENDING_PROJECT_PERMISSIONS,
    pendingList: [{ projectKey: "proj1", repoSlug: "" }, { projectKey: "proj2", repoSlug: "" }]
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Project Permissions - Initial get with success', (assert) => {
  const message = 'Get with success for project permissions';
  const expected = permissionsStateStart;
  const actual = projectPermissions(permissionsStateStart, {
    type: GET_PROJECT_PERMISSIONS,
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Project Permissions - Initial get with error', (assert) => {
  const message = 'Error on initial get for project permissions';
  const expected = {
    ...permissionsStateStart,
    complete: true,
    inProgress: false,
    apiError: {action: 'Please contact your administrator', name: 'Project Permissions Error', reason: 'Server not reachable or API call no longer valid.'}
  };
  const actual = projectPermissions(permissionsStateStart, {
    type: GET_PROJECT_PERMISSIONS,
    error: true,
    payload: {name: "Error"}
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Project Permissions - Get all proj1 permissions success - no paging', (assert) => {
  const message = 'Successful get all proj1 permissions - no paging.';
  const expected = permissionsStateProj1Complete;
  const actual = projectPermissions(permissionsStateStart, {
    type: GET_PROJECT_PERMISSIONS_SUCCESS,
    error: false,
    meta: {
      projectKey: "proj1",
      repoSlug: ""
    },
    payload: projectPermissionsProj1Json
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Project Permissions - Get project 1 permissions success - Page 1', (assert) => {
  const message = 'Successful project 1 permissions get - Page 1';
  const expected = permissionsStateProj1Page1Complete;
  const actual = projectPermissions(permissionsStateStart, {
    type: GET_PROJECT_PERMISSIONS_SUCCESS,
    error: false,
    meta: {
      projectKey: "proj1",
      repoSlug: ""
    },
    payload: projectPermissionsProj1JsonPage1
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Project Permissions - Get all permissions success - Page 1', (assert) => {
  const message = 'Successful all permissions get - Page 1';
  const expected = permissionsStatePage1Complete;
  const actual = projectPermissions(permissionsStateProj1Page1Complete, {
    type: GET_PROJECT_PERMISSIONS_SUCCESS,
    error: false,
    meta: {
      projectKey: "proj2",
      repoSlug: ""
    },
    payload: projectPermissionsProj2Json
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Project Permissions - Get project permissions success - Page 2', (assert) => {
  const message = 'Successful project permissions get - Page 2';
  const expected = permissionsStatePage2Complete;
  const actual = projectPermissions(permissionsStatePage1Complete, {
    type: GET_PROJECT_PERMISSIONS_SUCCESS,
    error: false,
    meta: {
      projectKey: "proj1",
      repoSlug: ""
    },
    payload: projectPermissionsProj1JsonPage2
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Project Permissions - Get project permissions success - Page 3', (assert) => {
  const message = 'Successful project permissions get - Page 3';
  const expected = permissionsStatePage3Complete;
  const actual = projectPermissions(permissionsStatePage2Complete, {
    type: GET_PROJECT_PERMISSIONS_SUCCESS,
    error: false,
    meta: {
      projectKey: "proj1",
      repoSlug: ""
    },
    payload: projectPermissionsProj1JsonPage3
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Project Permissions - API payload error', (assert) => {
  const message = 'Error on initial get for project permissions';
  const expected = {
    ...permissionsStateStart,
    complete: true,
    inProgress: false,
    apiError: {action: 'Please contact your administrator.', name: 'Project Permissions Error', reason: 'API call returned an error.' }
  };
  const actual = projectPermissions(permissionsStateStart, {
    type: GET_PROJECT_PERMISSIONS_ERROR,
    error: true,
    payload: {name: "Error"}
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Project Permissions - Admin group is valid', (assert) => {
  const message = 'Valid admin group is handled correctly';
  const expected = true;
  const actual = groupIsValid("proj", "tool_git_proj_admin", "PROJECT_ADMIN");

  assert.equal(actual, expected, message);
  assert.end();
});

test('Project Permissions - Write group is valid', (assert) => {
  const message = 'Valid write group is handled correctly';
  const expected = true;
  const actual = groupIsValid("proj", "tool_git_proj_write", "PROJECT_WRITE");

  assert.equal(actual, expected, message);
  assert.end();
});

test('Project Permissions - Read group is valid', (assert) => {
  const message = 'Valid read group is handled correctly';
  const expected = true;
  const actual = groupIsValid("proj", "tool_git_proj_read", "PROJECT_READ");

  assert.equal(actual, expected, message);
  assert.end();
});

test('Project Permissions - Invalid Admin group', (assert) => {
  const message = 'Invalid admin group is handled correctly';
  const expected = false;
  const actual = groupIsValid("proj", "proj_admin", "PROJECT_ADMIN");

  assert.equal(actual, expected, message);
  assert.end();
});

test('Project Permissions - Project key with underscore', (assert) => {
  const message = 'Project key with underscore is handled correctly';
  const expected = true;
  const actual = groupIsValid("proj_example", "tool_git_proj^example_admin", "PROJECT_ADMIN");

  assert.equal(actual, expected, message);
  assert.end();
});

test('Project Permissions - Invalid permission', (assert) => {
  const message = 'Invalid permission is handled correctly';
  const expected = false;
  const actual = groupIsValid("proj", "tool_git_proj_write", "PROJECT_INVALID");

  assert.equal(actual, expected, message);
  assert.end();
});