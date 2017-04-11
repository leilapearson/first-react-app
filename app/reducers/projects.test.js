import tape from 'tape';

import { initialState, projects } from './projects';
import {
  INIT_PENDING_PROJECTS,
  GET_PROJECTS,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR
} from '../actions/index';

const test = tape;

const projectsJson = JSON.parse(`
{
  "size": 2,
  "limit": 25,
  "isLastPage": true,
  "values": [
    {
      "key": "ARCHIVE",
      "id": 41,
      "name": "Archive",
      "description": "Archived repositories",
      "public": false,
      "type": "NORMAL",
      "link": {
        "url": "/projects/ARCHIVE",
        "rel": "self"
      },
      "links": {
        "self": [
          {
            "href": "https://git.mycompany.com/projects/ARCHIVE"
          }
        ]
      }
    },
    {
      "key": "CERT",
      "id": 322,
      "name": "Certification",
      "public": false,
      "type": "NORMAL",
      "link": {
        "url": "/projects/CERT",
        "rel": "self"
      },
      "links": {
        "self": [
          {
            "href": "https://git.mycompany.com/projects/CERT"
          }
        ]
      }
    }
  ],
  "start": 0
}`);

const projectListValues = [
  {
    projectKey: "ARCHIVE",
    repoSlug: ""
  },
  {
    projectKey: "CERT",
    repoSlug: ""
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

test('Projects - Invalid action type', (assert) => {
  const message = 'Invalid action type is handled correctly.';
  const expected = initialState;
  const actual = projects(initialState, { type: 'INVALID_TYPE' });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Projects - Init pending projects success', (assert) => {
  const message = 'Successful init pending projects';
  const expected = startState;
  const actual = projects(
    initialState, {
      type: INIT_PENDING_PROJECTS,
      pendingList: [{ projectKey: "", repoSlug: "" }]
    });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Projects - Get projects okay', (assert) => {
  const message = 'Get projects okay.';
  const expected = startState;
  const actual = projects(startState, { type: GET_PROJECTS });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Projects - Get projects with error', (assert) => {
  const message = 'Get projects with error.';
  const expected = { ...startState, inProgress: false, complete: true, 
    apiError: {action: 'Please contact your administrator', name: 'Fetch Projects Error', reason: 'Server not reachable or API call no longer valid.'} 
  };
  const actual = projects(startState, { type: GET_PROJECTS, error: true, payload: {name: "Error"} });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Projects - Get projects error', (assert) => {
  const message = 'Get projects  error.';
  const expected = { ...startState, inProgress: false, complete: true, 
    apiError: {action: 'Please contact your administrator.', name: 'Fetch Projects Error', reason: 'API call returned an error.'} 
  };
  const actual = projects(startState, { type: GET_PROJECTS_ERROR, error: true, payload: {name: "Error"} });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Projects - Get projects success', (assert) => {
  const message = 'Successful get projects.';
  const expected = {
    ...completedState,
    results: projectListValues
  };
  const actual = projects(startState, {
    type: GET_PROJECTS_SUCCESS,
    error: false,
    payload: projectsJson,
    meta: {
      projectKey: "",
      repoSlug: ""
    }
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});
