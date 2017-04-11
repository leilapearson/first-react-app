import tape from 'tape';

import { initialState, branchPermissions } from './branch-permissions';
import {
  INIT_PENDING_BRANCH_PERMISSIONS,
  GET_BRANCH_PERMISSIONS,
  GET_BRANCH_PERMISSIONS_SUCCESS,
  GET_BRANCH_PERMISSIONS_ERROR,
} from '../actions/index';

const test = tape;

const branchPermissionsJson = JSON.parse(`
{
  "size": 12,
  "limit": 25,
  "isLastPage": true,
  "values": [
    {
      "id": 686,
      "type": "read-only",
      "matcher": {
        "id": "**",
        "displayId": "**",
        "type": {
          "id": "PATTERN",
          "name": "Pattern"
        },
        "active": true
      },
      "users": [],
      "groups": [
        "TOOL_Git_PROJ1_client_##_Write"
      ],
      "accessKeys": []
    },
    {
      "id": 687,
      "type": "fast-forward-only",
      "matcher": {
        "id": "bugfix/**",
        "displayId": "bugfix/**",
        "type": {
          "id": "PATTERN",
          "name": "Pattern"
        },
        "active": true
      },
      "users": [],
      "groups": [],
      "accessKeys": []
    },
    {
      "id": 688,
      "type": "read-only",
      "matcher": {
        "id": "bugfix/**",
        "displayId": "bugfix/**",
        "type": {
          "id": "PATTERN",
          "name": "Pattern"
        },
        "active": true
      },
      "users": [],
      "groups": [
        "TOOL_Git_PROJ1_client_bugfix%##_Write"
      ],
      "accessKeys": []
    },
    {
      "id": 690,
      "type": "fast-forward-only",
      "matcher": {
        "id": "feature/**",
        "displayId": "feature/**",
        "type": {
          "id": "PATTERN",
          "name": "Pattern"
        },
        "active": true
      },
      "users": [],
      "groups": [],
      "accessKeys": []
    },
    {
      "id": 689,
      "type": "read-only",
      "matcher": {
        "id": "feature/**",
        "displayId": "feature/**",
        "type": {
          "id": "PATTERN",
          "name": "Pattern"
        },
        "active": true
      },
      "users": [],
      "groups": [
        "TOOL_Git_PROJ1_client_feature%##_Write"
      ],
      "accessKeys": []
    },
    {
      "id": 691,
      "type": "fast-forward-only",
      "matcher": {
        "id": "master",
        "displayId": "master",
        "type": {
          "id": "PATTERN",
          "name": "Pattern"
        },
        "active": true
      },
      "users": [],
      "groups": [],
      "accessKeys": []
    },
    {
      "id": 693,
      "type": "no-deletes",
      "matcher": {
        "id": "master",
        "displayId": "master",
        "type": {
          "id": "PATTERN",
          "name": "Pattern"
        },
        "active": true
      },
      "users": [],
      "groups": [],
      "accessKeys": []
    },
    {
      "id": 692,
      "type": "read-only",
      "matcher": {
        "id": "master",
        "displayId": "master",
        "type": {
          "id": "PATTERN",
          "name": "Pattern"
        },
        "active": true
      },
      "users": [],
      "groups": [
        "TOOL_Git_PROJ1_client_master_Write"
      ],
      "accessKeys": []
    },
    {
      "id": 699,
      "type": "fast-forward-only",
      "matcher": {
        "id": "release/**",
        "displayId": "release/**",
        "type": {
          "id": "PATTERN",
          "name": "Pattern"
        },
        "active": true
      },
      "users": [],
      "groups": [],
      "accessKeys": []
    },
    {
      "id": 701,
      "type": "no-deletes",
      "matcher": {
        "id": "release/**",
        "displayId": "release/**",
        "type": {
          "id": "PATTERN",
          "name": "Pattern"
        },
        "active": true
      },
      "users": [],
      "groups": [],
      "accessKeys": []
    },
    {
      "id": 700,
      "type": "read-only",
      "matcher": {
        "id": "release/**",
        "displayId": "release/**",
        "type": {
          "id": "PATTERN",
          "name": "Pattern"
        },
        "active": true
      },
      "users": [],
      "groups": [
        "TOOL_Git_PROJ1_client_release%##_Write"
      ],
      "accessKeys": []
    },
    {
      "id": 702,
      "type": "read-only",
      "matcher": {
        "id": "remote-run/*/*",
        "displayId": "remote-run/*/*",
        "type": {
          "id": "PATTERN",
          "name": "Pattern"
        },
        "active": true
      },
      "users": [],
      "groups": [
        "TOOL_Git_PROJ1_client_remote-run%#%#_Write"
      ],
      "accessKeys": []
    }
  ],
  "start": 0
}`);

const branchPermissionsValues = [
  {
    project: "PROJ1",
    repo: "client",
    group: "TOOL_Git_PROJ1_client_##_Write",
    permission: "READ-ONLY: **",
    isValid: true
  },
  {
    project: "PROJ1",
    repo: "client",
    group: "TOOL_Git_PROJ1_client_bugfix%##_Write",
    permission: "READ-ONLY: bugfix/**",
    isValid: true
  },
  {
    project: "PROJ1",
    repo: "client",
    group: "TOOL_Git_PROJ1_client_feature%##_Write",
    permission: "READ-ONLY: feature/**",
    isValid: true
  },
  {
    project: "PROJ1",
    repo: "client",
    group: "TOOL_Git_PROJ1_client_master_Write",
    permission: "READ-ONLY: master",
    isValid: true
  },
  {
    project: "PROJ1",
    repo: "client",
    group: "TOOL_Git_PROJ1_client_release%##_Write",
    permission: "READ-ONLY: release/**",
    isValid: true
  },
  {
    project: "PROJ1",
    repo: "client",
    group: "TOOL_Git_PROJ1_client_remote-run%#%#_Write",
    permission: "READ-ONLY: remote-run/*/*",
    isValid: true
  }
];

const startState = {
  ...initialState,
  inProgress: true,
  complete: false,
  apiError: null,
  results: [],
  pending: [{ projectKey: "PROJ1", repoSlug: "client", nextPageStart: 0, page: 1 }],
  page: 1
}

const completeState = {
  ...startState,
  inProgress: false,
  complete: true,
  apiError: null,
  results: branchPermissionsValues,
  pending: [],
  page: 1
}

test('branchPermissions - Init pending branch groups success', (assert) => {
  const message = 'Successful init pending branch groups';
  const expected = startState;
  const actual = branchPermissions(initialState, {
    type: INIT_PENDING_BRANCH_PERMISSIONS,
    pendingList: [{ projectKey: "PROJ1", repoSlug: "client" }]
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('branchPermissions - Initial get with success', (assert) => {
  const message = 'Get with success for branch groups';
  const expected = startState;
  const actual = branchPermissions(startState, {
    type: GET_BRANCH_PERMISSIONS,
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('branchPermissions - Get with error', (assert) => {
  const message = 'Error on initial get for branch groups';
  const expected = {
    ...startState,
    complete: true,
    inProgress: false,
    apiError: {action: 'Please contact your administrator', name: 'Branch Permissions Error', reason: 'Server not reachable or API call no longer valid.'}
  };
  const actual = branchPermissions(startState, {
    type: GET_BRANCH_PERMISSIONS,
    error: true,
    payload: {name: "Error"}
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('branchPermissions - Get payload error', (assert) => {
  const message = 'Get payload error for branch groups';
  const expected = {
    ...startState,
    complete: true,
    inProgress: false,
    apiError: {action: 'Please contact your administrator.', name: 'Branch Permissions Error', reason: 'API call returned an error.'}
  };
  const actual = branchPermissions(startState, {
    type: GET_BRANCH_PERMISSIONS_ERROR,
    error: true,
    payload: {name: "Error"}
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('branchPermissions - Get branch groups success', (assert) => {
  const message = 'Successful branch groups get';
  const expected = completeState;
  const actual = branchPermissions(
    startState,
    {
      type: GET_BRANCH_PERMISSIONS_SUCCESS,
      error: false,
      meta: {
        projectKey: "PROJ1",
        repoSlug: "client"
      },
      payload: branchPermissionsJson
    });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

const multipleGroupsJson = JSON.parse(`
{
  "size": 3,
  "limit": 25,
  "isLastPage": true,
  "values": [
    {
      "id": 689,
      "type": "read-only",
      "matcher": {
        "id": "feature/**",
        "displayId": "feature/**",
        "type": {
          "id": "PATTERN",
          "name": "Pattern"
        },
        "active": true
      },
      "users": [],
      "groups": [
        "TOOL_Git_PROJ1_client_feature%##_Write"
      ],
      "accessKeys": []
    },
    {
      "id": 687,
      "type": "fast-forward-only",
      "matcher": {
        "id": "bugfix/**",
        "displayId": "bugfix/**",
        "type": {
          "id": "PATTERN",
          "name": "Pattern"
        },
        "active": true
      },
      "users": [],
      "groups": [
        "An invalid group"
      ],
      "accessKeys": []
    },
    {
      "id": 688,
      "type": "read-only",
      "matcher": {
        "id": "bugfix/**",
        "displayId": "bugfix/**",
        "type": {
          "id": "PATTERN",
          "name": "Pattern"
        },
        "active": true
      },
      "users": [],
      "groups": [
        "TOOL_Git_PROJ1_client_bugfix%##_Write",
        "Another invalid group"
      ],
      "accessKeys": []
    }
  ],
  "start": 0
}`);

const multipleGroupsPermissionsValues = [
  {
    project: "PROJ1",
    repo: "client",
    group: "TOOL_Git_PROJ1_client_feature%##_Write",
    permission: "READ-ONLY: feature/**",
    isValid: true,
  },
  {
    project: "PROJ1",
    repo: "client",
    group: "An invalid group",
    permission: "FAST-FORWARD-ONLY: bugfix/**",
    isValid: false,
  },
  {
    project: "PROJ1",
    repo: "client",
    group: "TOOL_Git_PROJ1_client_bugfix%##_Write",
    permission: "READ-ONLY: bugfix/**",
    isValid: true,
  },
  {
    project: "PROJ1",
    repo: "client",
    group: "Another invalid group",
    permission: "READ-ONLY: bugfix/**",
    isValid: false,
  }
];

test('branchPermissions - Get filtered branch groups success', (assert) => {
  const message = 'Successful filtered branch groups get';
  const expected = {
    ...completeState,
    results: multipleGroupsPermissionsValues
  };
  const actual = branchPermissions(
    startState,
    {
      type: GET_BRANCH_PERMISSIONS_SUCCESS,
      error: false,
      meta: {
        projectKey: "PROJ1",
        repoSlug: "client"
      },
      payload: multipleGroupsJson
    });

  assert.deepEqual(actual, expected, message);
  assert.end();
});
