import tape from 'tape';
import { initialState, repos } from './repos';
import {
  INIT_PENDING_REPOS,
  GET_REPOS,
  GET_REPOS_SUCCESS,
  GET_REPOS_ERROR
} from '../actions/index';

const test = tape;

const reposJsonProj1 = JSON.parse(`
{
  "size": 2,
  "limit": 2,
  "isLastPage": true,
  "values": [
    {
      "slug": "legacy-automation",
      "id": 671,
      "name": "Legacy Automation",
      "scmId": "git",
      "state": "AVAILABLE",
      "statusMessage": "Available",
      "forkable": true
    },
    {
      "slug": "diagnostic-tool",
      "id": 1023,
      "name": "Diagnostic Tool",
      "scmId": "git",
      "state": "AVAILABLE",
      "statusMessage": "Available",
      "forkable": true
    }
  ],
  "start": 0
}`);

const reposJsonProj1Page1 = JSON.parse(`
{
  "size": 1,
  "limit": 1,
  "isLastPage": false,
  "values": [
    {
      "slug": "legacy-automation",
      "id": 671,
      "name": "Legacy Automation",
      "scmId": "git",
      "state": "AVAILABLE",
      "statusMessage": "Available",
      "forkable": true
    }
  ],
  "start": 0,
  "nextPageStart": 1
}`);

const reposJsonProj1Page2 = JSON.parse(`
{
  "size": 1,
  "limit": 1,
  "isLastPage": true,
  "values": [
    {
      "slug": "diagnostic-tool",
      "id": 1023,
      "name": "Diagnostic Tool",
      "scmId": "git",
      "state": "AVAILABLE",
      "statusMessage": "Available",
      "forkable": true
    }
  ],
  "start": 1
}`);

const repoValuesProj1 = [
  {
    projectKey: "proj1",
    repoSlug: "legacy-automation"
  },
  {
    projectKey: "proj1",
    repoSlug: "diagnostic-tool"
  }
];

const repoValuesProj1Page1 = repoValuesProj1.slice(0, 1);
const repoValuesProj1Page2 = repoValuesProj1.slice(1, 2);

const reposJsonProj2 = JSON.parse(`
{
  "size": 1,
  "limit": 1,
  "isLastPage": true,
  "values": [
    {
      "slug": "junk-drawer",
      "id": 671,
      "name": "Junk Drawer",
      "scmId": "git",
      "state": "AVAILABLE",
      "statusMessage": "Available",
      "forkable": true
    }
  ],
  "start": 0
}`);

const repoValuesProj2 = [
  {
    projectKey: "proj2",
    repoSlug: "junk-drawer"
  }
];

const reposStateStart = {
  ...initialState,
  inProgress: true,
  complete: false,
  apiError: null,
  results: [],
  pending: [{ projectKey: "proj1", repoSlug: "", nextPageStart: 0, page: 1 }, { projectKey: "proj2", repoSlug: "", nextPageStart: 0, page: 1 }],
  page: 1
}

const reposStateProj1CompleteNoPaging = {
  ...reposStateStart,
  inProgress: true,
  complete: false,
  apiError: null,
  results: [...repoValuesProj1],
  pending: [{ projectKey: "proj2", repoSlug: "", nextPageStart: 0, page: 1 }],
  page: 1
};

const reposStateCompleteNoPaging = {
  ...reposStateStart,
  inProgress: false,
  complete: true,
  apiError: null,
  results: [...repoValuesProj1, ...repoValuesProj2],
  pending: [],
  page: 1
};

const reposStateProj1Page1Complete = {
  ...reposStateStart,
  inProgress: true,
  complete: false,
  apiError: null,
  results: [...repoValuesProj1Page1],
  pending: [{ projectKey: "proj1", repoSlug: "", nextPageStart: 1, page: 2 }, { projectKey: "proj2", repoSlug: "", nextPageStart: 0, page: 1 }],
  page: 1
};

const reposStatePage1Complete = {
  ...reposStateStart,
  inProgress: true,
  complete: false,
  apiError: null,
  results: [...repoValuesProj1Page1, ...repoValuesProj2],
  pending: [{ projectKey: "proj1", repoSlug: "", nextPageStart: 1, page: 2 }],
  page: 2
};

const reposStatePage2Complete = {
  ...reposStateStart,
  inProgress: false,
  complete: true,
  apiError: null,
  results: [...repoValuesProj1Page1, ...repoValuesProj2, ...repoValuesProj1Page2],
  pending: [],
  page: 2
};

test('Repos - Init pending repos success', (assert) => {
  const message = 'Successful init pending repos';
  const expected = reposStateStart;
  const actual = repos(initialState, {
    type: INIT_PENDING_REPOS,
    pendingList: [{ projectKey: "proj1", repoSlug: "" }, { projectKey: "proj2", repoSlug: "" }]
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Repos - Get repos okay', (assert) => {
  const message = 'Get repos okay.';
  const expected = reposStateStart;
  const actual = repos(reposStateStart, { type: GET_REPOS });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Repos - Get repos with error', (assert) => {
  const message = 'Get repos with error.';
  const expected = { ...reposStateStart, inProgress: false, complete: true, 
    apiError: {action: 'Please contact your administrator', name: 'Fetch Repos Error', reason: 'Server not reachable or API call no longer valid.'} 
  };
  const actual = repos(reposStateStart, { type: GET_REPOS, error: true, payload: {name: "Error"} });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Repos - Get repos error', (assert) => {
  const message = 'Get repos  error.';
  const expected = { ...reposStateStart, inProgress: false, complete: true, apiError: 
    {action: 'Please contact your administrator.', name: 'Fetch Repos Error', reason: 'API call returned an error.'} 
  };
  const actual = repos(reposStateStart, { type: GET_REPOS_ERROR, error: true, payload: {name: "Error"} });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Repos - Get proj1 repos success - no paging', (assert) => {

  const message = 'Successful proj 1 repos get - no paging.';
  const expected = reposStateProj1CompleteNoPaging;
  const actual = repos(reposStateStart, {
    type: GET_REPOS_SUCCESS,
    error: false,
    meta: { projectKey: "proj1", repoSlug: "" },
    payload: reposJsonProj1
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Repos - Get all repos success - no paging', (assert) => {

  const message = 'Successful repos get.';
  const expected = reposStateCompleteNoPaging;
  const actual = repos(reposStateProj1CompleteNoPaging, {
    type: GET_REPOS_SUCCESS,
    error: false,
    meta: { projectKey: "proj2", repoSlug: "" },
    payload: reposJsonProj2
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Repos - Get proj1 repos success - Page 1', (assert) => {

  const message = 'Successful proj1 repos get - Page 1.';
  const expected = reposStateProj1Page1Complete;
  const actual = repos(reposStateStart, {
    type: GET_REPOS_SUCCESS,
    error: false,
    meta: { projectKey: "proj1", repoSlug: "" },
    payload: reposJsonProj1Page1
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Repos - Get repos success - Page 1', (assert) => {

  const message = 'Successful repos get - Page 1.';
  const expected = reposStatePage1Complete;
  const actual = repos(reposStateProj1Page1Complete, {
    type: GET_REPOS_SUCCESS,
    error: false,
    meta: { projectKey: "proj2", repoSlug: "" },
    payload: reposJsonProj2
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Repos - Get repos success - Page 2', (assert) => {

  const message = 'Successful repos get - Page 2.';
  const expected = reposStatePage2Complete;
  const actual = repos(reposStatePage1Complete, {
    type: GET_REPOS_SUCCESS,
    error: false,
    meta: { projectKey: "proj1", repoSlug: "" },
    payload: reposJsonProj1Page2
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});
