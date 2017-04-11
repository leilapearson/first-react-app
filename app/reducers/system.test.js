import tape from 'tape';
import {
  INIT_PENDING_SYSTEM_PERMISSIONS,
  GET_SYSTEM_PERMISSIONS,
  GET_SYSTEM_PERMISSIONS_SUCCESS,
  GET_SYSTEM_PERMISSIONS_ERROR
} from '../actions/index';
import { initialState, system } from './system';

const test = tape;

test('System - Invalid action type', (assert) => {
  const message = 'Invalid action type is handled correctly.';
  const expected = initialState;
  const actual = system(
    initialState,
    { type: 'INVALID_TYPE' }
  );
  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('System - Init pending parents success', (assert) => {
  const message = 'Init pending parents is handled correctly.';
  const expected = startState;
  const actual = system(
    initialState,
    {
      type: INIT_PENDING_SYSTEM_PERMISSIONS,
      pendingList: [{ projectKey: "", repoSlug: "" }]
    }
  );
  assert.deepEqual(actual, expected, message);
  assert.end();
});

// Note: Not bothering with multipage testing here as that is covered by basePager tests
const testJson = JSON.parse(`
{
  "size": 4,
  "limit": 25,
  "isLastPage": true,
  "values": [
    {
      "group": {
        "name": "stash-administrators"
      },
      "permission": "SYS_ADMIN"
    },
    {
      "group": {
        "name": "stash-users"
      },
      "permission": "LICENSED_USER"
    },
    {
      "group": {
        "name": "tool_git_system admins"
      },
      "permission": "SYS_ADMIN"
    },
    {
      "group": {
        "name": "tool_git_users"
      },
      "permission": "LICENSED_USER"
    }
  ],
  "start": 0
}`);

const testValues = [
  {
    group: "stash-administrators",
    permission: "SYS_ADMIN",
    project: "--NA--",
    repo: "--NA--",
    isValid: true
  },
  {
    group: "stash-users",
    permission: "LICENSED_USER",
    project: "--NA--",
    repo: "--NA--",
    isValid: true
  },
  {
    group: "tool_git_system admins",
    permission: "SYS_ADMIN",
    project: "--NA--",
    repo: "--NA--",
    isValid: true
  },
  {
    group: "tool_git_users",
    permission: "LICENSED_USER",
    project: "--NA--",
    repo: "--NA--",
    isValid: true
  }
];

const startState = {
  ...initialState,
  inProgress: true,
  complete: false,
  apiError: null,
  pending: [{ projectKey: "", repoSlug: "", nextPageStart: 0, page: 1 }],
  page: 1
};
const completedState = {
  ...initialState,
  inProgress: false,
  complete: true,
  apiError: null,
  results: [], // replace with actual expected values
  pending: [],
  page: 1
}

test('System - Get system permissions success', (assert) => {
  const message = 'Successful systems permissions get.';
  const expected = {
    ...completedState,
    results: testValues
  };
  const actual = system(
    startState,
    {
      type: GET_SYSTEM_PERMISSIONS_SUCCESS,
      error: false,
      payload: testJson,
      meta: {
        projectKey: "",
        repoSlug: ""
      }
    }
  );
  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('System - Get system permissions with error', (assert) => {
  const message = 'Get system permissions with error.';
  const expected = {
    ...startState,
    inProgress: false,
    complete: true,
    apiError: {
      action: 'Please contact your administrator', 
      name: 'System Permissions Error', 
      reason: 'Server not reachable or API call no longer valid.' }
  };
  const actual = system(
    startState, {
      type: GET_SYSTEM_PERMISSIONS,
      error: true,
      payload: {name: "error"}
    });
  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('System - Get system permissions error', (assert) => {
  const message = 'Get system permissions error.';
  const expected = {
    ...startState,
    inProgress: false,
    complete: true,
    apiError: {
      action: 'Please contact your administrator.', 
      name: 'System Permissions Error', 
      reason: 'API call returned an error.'
    }
  };
  const actual = system(
    startState, {
      type: GET_SYSTEM_PERMISSIONS_ERROR,
      error: true,
      payload: {name: "error"}
    });
  assert.deepEqual(actual, expected, message);
  assert.end();
});

const invalidGroupJson = JSON.parse(`
  {
  "size": 1,
  "limit": 25,
  "isLastPage": true,
  "values": [
    {
      "group": {
        "name": "invalid-group"
      },
      "permission": "SYS_ADMIN"
    }
  ],
  "start": 0
  }`);
const invalidGroupValues = [
  {
    group: "invalid-group",
    permission: "SYS_ADMIN",
    project: "--NA--",
    repo: "--NA--",
    isValid: false
  }
];

test('System - Get system permissions success - invalid group', (assert) => {
  const message = 'Successful systems permissions get - invalid group.';
  const expected = {
    ...completedState,
    results: invalidGroupValues
  };
  const actual = system(
    startState,
    {
      type: GET_SYSTEM_PERMISSIONS_SUCCESS,
      error: false,
      payload: invalidGroupJson,
      meta: {
        projectKey: "",
        repoSlug: ""
      }
    }
  );
  assert.deepEqual(actual, expected, message);
  assert.end();
});

const invalidPermissionJson = JSON.parse(`
  {
  "size": 1,
  "limit": 25,
  "isLastPage": true,
  "values": [
    {
      "group": {
        "name": "tool_git_system admins"
      },
      "permission": "SYS_BLAH"
    }
  ],
  "start": 0
  }`);
const invalidPermissionValues = [
  {
    group: "tool_git_system admins",
    permission: "SYS_BLAH",
    project: "--NA--",
    repo: "--NA--",
    isValid: false
  }
];

test('System - Get system permissions success - invalid permission', (assert) => {
  const message = 'Successful systems permissions get - invalid permission.';
  const expected = {
    ...completedState,
    results: invalidPermissionValues
  };
  const actual = system(
    startState,
    {
      type: GET_SYSTEM_PERMISSIONS_SUCCESS,
      error: false,
      payload: invalidPermissionJson,
      meta: {
        projectKey: "",
        repoSlug: ""
      }
    }
  );
  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('System - unknown action type', (assert) => {
  assert.deepEqual(system(initialState, { type: 'BAD_TYPE' }), initialState, "Unknown type returns state unchanged");
  assert.end();
});