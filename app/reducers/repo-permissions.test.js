import tape from 'tape';

import { initialState, repoPermissions, groupIsValid } from './repo-permissions';
import {
  INIT_PENDING_REPO_PERMISSIONS,
  GET_REPO_PERMISSIONS,
  GET_REPO_PERMISSIONS_SUCCESS,
  GET_REPO_PERMISSIONS_ERROR
} from '../actions/index';

const test = tape;

const repoPermissionsProj1Json = JSON.parse(`
{
  "size": 3,
  "limit": 25,
  "isLastPage": true,
  "values": [
    {
      "group": {
        "name": "tool_git_proj1_client-ui_admin"
      },
      "permission": "REPO_ADMIN"
    },
    {
      "group": {
        "name": "tool_git_proj1_client-ui_read"
      },
      "permission": "REPO_READ"
    },
    {
      "group": {
        "name": "tool_git_proj1_client-ui_write"
      },
      "permission": "REPO_WRITE"
    }
  ],
  "start": 0
}`);

const repoPermissionsProj1Page1Json = JSON.parse(`
{
  "size": 1,
  "limit": 1,
  "isLastPage": false,
  "values": [
    {
      "group": {
        "name": "tool_git_proj1_client-ui_admin"
      },
      "permission": "REPO_ADMIN"
    }
  ],
  "start": 0,
  "nextPageStart": 1
}`);

const repoPermissionsProj1Page2Json = JSON.parse(`
{
  "size": 1,
  "limit": 1,
  "isLastPage": false,
  "values": [
    {
      "group": {
        "name": "tool_git_proj1_client-ui_read"
      },
      "permission": "REPO_READ"
    }
  ],
  "start": 1,
  "nextPageStart": 2
}`);

const repoPermissionsProj1Page3Json = JSON.parse(`
{
  "size": 1,
  "limit": 1,
  "isLastPage": true,
  "values": [
    {
      "group": {
        "name": "tool_git_proj1_client-ui_write"
      },
      "permission": "REPO_WRITE"
    }
  ],
  "start": 2
}`);

const repoPermissionsValuesProj1 = [
  {
    project: "proj1",
    repo: "client-ui",
    group: "tool_git_proj1_client-ui_admin",
    permission: "REPO_ADMIN",
    isValid: true
  },
  {
    project: "proj1",
    repo: "client-ui",
    group: "tool_git_proj1_client-ui_read",
    permission: "REPO_READ",
    isValid: true
  },
  {
    project: "proj1",
    repo: "client-ui",
    group: "tool_git_proj1_client-ui_write",
    permission: "REPO_WRITE",
    isValid: true
  }
];

const permissionsStartState = {
  ...initialState,
  inProgress: true,
  complete: false,
  apiError: null,
  results: [],
  pending: [{ projectKey: "proj1", repoSlug: "client-ui", nextPageStart: 0, page: 1 }],
  page: 1
}

const permissionsCompleteState = {
  ...permissionsStartState,
  inProgress: false,
  complete: true,
  apiError: null,
  results: repoPermissionsValuesProj1,
  pending: [],
  page: 1
}

const permissionsStatePage1 = {
  ...permissionsStartState,
  inProgress: true,
  complete: false,
  apiError: null,
  results: repoPermissionsValuesProj1.slice(0, 1),
  pending: [{ projectKey: "proj1", repoSlug: "client-ui", nextPageStart: 1, page: 2 }],
  page: 2
}

const permissionsStatePage2 = {
  ...permissionsStartState,
  inProgress: true,
  complete: false,
  apiError: null,
  results: repoPermissionsValuesProj1.slice(0, 2),
  pending: [{ projectKey: "proj1", repoSlug: "client-ui", nextPageStart: 2, page: 3 }],
  page: 3
}

const permissionsStatePage3 = {
  ...permissionsStartState,
  inProgress: false,
  complete: true,
  apiError: null,
  results: repoPermissionsValuesProj1.slice(0, 3),
  pending: [],
  page: 3
}

test('Repo Permissions - Init pending repo permissions success', (assert) => {
  const message = 'Successful init pending repo permissions';
  const expected = permissionsStartState;
  const actual = repoPermissions(initialState, {
    type: INIT_PENDING_REPO_PERMISSIONS,
    pendingList: [{ projectKey: "proj1", repoSlug: "client-ui" }]
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Repo Permissions - Initial get with success', (assert) => {
  const message = 'Get with success for repo permissions';
  const expected = permissionsStartState;
  const actual = repoPermissions(permissionsStartState, {
    type: GET_REPO_PERMISSIONS,
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Repo Permissions - Initial get with error', (assert) => {
  const message = 'Error on initial get for repo permissions';
  const expected = {
    ...permissionsStartState,
    complete: true,
    inProgress: false,
    apiError: {action: 'Please contact your administrator', name: 'Repo Permissions Error', reason: 'Server not reachable or API call no longer valid.'}
  };
  const actual = repoPermissions(permissionsStartState, {
    type: GET_REPO_PERMISSIONS,
    error: true,
    payload: {name: "Error"}
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Repo permissions - Get repo permissions success - no paging', (assert) => {
  const message = 'Successful repo permissions get - no paging.';
  const expected = permissionsCompleteState;
  const actual = repoPermissions(
    permissionsStartState,
    {
      type: GET_REPO_PERMISSIONS_SUCCESS,
      error: false,
      meta: {
        projectKey: "proj1",
        repoSlug: "client-ui"
      },
      payload: repoPermissionsProj1Json
    });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Repo permissions - Get repo permissions success - page 1', (assert) => {
  const message = 'Successful repo permissions get - page 1';
  const expected = permissionsStatePage1;
  const actual = repoPermissions(
    permissionsStartState,
    {
      type: GET_REPO_PERMISSIONS_SUCCESS,
      error: false,
      meta: {
        projectKey: "proj1",
        repoSlug: "client-ui"
      },
      payload: repoPermissionsProj1Page1Json
    });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Repo permissions - Get repo permissions success - page 2', (assert) => {
  const message = 'Successful repo permissions get - page 2';
  const expected = permissionsStatePage2;
  const actual = repoPermissions(
    permissionsStatePage1,
    {
      type: GET_REPO_PERMISSIONS_SUCCESS,
      error: false,
      meta: {
        projectKey: "proj1",
        repoSlug: "client-ui"
      },
      payload: repoPermissionsProj1Page2Json
    });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Repo permissions - Get repo permissions success - page 3', (assert) => {
  const message = 'Successful repo permissions get - page 3';
  const expected = permissionsStatePage3;
  const actual = repoPermissions(
    permissionsStatePage2,
    {
      type: GET_REPO_PERMISSIONS_SUCCESS,
      error: false,
      meta: {
        projectKey: "proj1",
        repoSlug: "client-ui"
      },
      payload: repoPermissionsProj1Page3Json
    });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Repo Permissions - API payload error', (assert) => {
  const message = 'Error on initial get for repo permissions';
  const expected = {
    ...permissionsStartState,
    complete: true,
    inProgress: false,
    apiError: {action: 'Please contact your administrator.', name: 'Repo Permissions Error', reason: 'API call returned an error.'}
  };
  const actual = repoPermissions(permissionsStartState, {
    type: GET_REPO_PERMISSIONS_ERROR,
    error: true,
    payload: {name: "Error"}
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Repo permissions - Valid repo permission groups', (assert) => {
  const message = 'Valid repo permission groups are handled correctly';

  assert.equal(groupIsValid("proj", "repo", "tool_git_proj_repo_admin", "REPO_ADMIN"), true, message);
  assert.equal(groupIsValid("proj", "repo", "tool_git_proj_repo_write", "REPO_WRITE"), true, message);
  assert.equal(groupIsValid("proj", "repo", "tool_git_proj_repo_read", "REPO_READ"), true, message);

  assert.end();
});

test('Repo permissions - Repo slug with underscore', (assert) => {
  const message = 'Repo slug with underscore is handled correctly';
  const expected = true;
  const actual = groupIsValid("proj_example", "repo_example", "tool_git_proj^example_repo^example_admin", "REPO_ADMIN");

  assert.equal(actual, expected, message);
  assert.end();
});
