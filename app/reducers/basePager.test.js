import tape from 'tape';

import { basePager, typeMapperCurry, baseInitialState, stateWithTypeMapper } from './basePager';

const test = tape;

const proj1JsonAll = JSON.parse(`
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

const proj1JsonPage1 = JSON.parse(`
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

const proj1JsonPage2 = JSON.parse(`
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

const proj1JsonPage3 = JSON.parse(`
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

const proj2Json = JSON.parse(`
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

const extractedValues = [
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

const extractedValuesProj1Page1 = extractedValues.slice(0, 1);
const extractedValuesPage1 = extractedValues.slice(0, 2);
const extractedValuesPage2 = extractedValues.slice(0, 3);
const extractedValuesPage3 = extractedValues.slice(0, 4);
const extractedValuesProj1 = extractedValues.filter((element) => (element.project === "proj1"));

const INIT_PENDING_PERMISSIONS = 'INIT_PENDING_PERMISSIONS';
const GET_PERMISSIONS = 'GET_PERMISSIONS';
const GET_PERMISSIONS_SUCCESS = 'GET_PERMISSIONS_SUCCESS';
const GET_PERMISSIONS_ERROR = 'GET_PERMISSIONS_ERROR';

const typeMapper = typeMapperCurry([INIT_PENDING_PERMISSIONS, GET_PERMISSIONS, GET_PERMISSIONS_SUCCESS, GET_PERMISSIONS_ERROR]);

const validateGroup = (groupName) => (groupName.split("_")[0] == "tool" && groupName.split("_")[1] == "git");

const extractor = (values, meta) => {
  return values.map((value) => {
    return {
      project: meta.projectKey,
      repo: "--NA--",
      group: value.group.name,
      permission: value.permission,
      isValid: validateGroup(value.group.name)
    }
  });
}

const valueExtractor = (values, action) => {
  return values.map((value) => {
    return {
      project: action.meta.projectKey,
      repo: "--NA--",
      group: value.group.name,
      permission: value.permission,
      isValid: true
    }
  });
}

const initialState = stateWithTypeMapper(baseInitialState, typeMapper);

const startState = {
  typeMapper: typeMapper,
  inProgress: true,
  complete: false,
  apiError: null,
  results: [],
  pending: [{ projectKey: "proj1", repoSlug: "", nextPageStart: 0, page: 1 }, { projectKey: "proj2", repoSlug: "", nextPageStart: 0, page: 1 }],
  page: 1
}

const startEmptyState = {
  typeMapper: typeMapper,
  inProgress: false,
  complete: true,
  apiError: null,
  results: [],
  pending: [],
  page: 0
}

const startProj1State = {
  typeMapper: typeMapper,
  inProgress: true,
  complete: false,
  apiError: null,
  results: [],
  pending: [{ projectKey: "proj1", repoSlug: "", nextPageStart: 0, page: 1 }],
  page: 1
}

const proj1CompleteStateNoProj2 = {
  typeMapper: typeMapper,
  inProgress: false,
  complete: true,
  apiError: null,
  results: extractedValuesProj1,
  pending: [],
  page: 1
}

const proj1Page1CompleteState = {
  typeMapper: typeMapper,
  inProgress: true,
  complete: false,
  apiError: null,
  results: extractedValuesProj1Page1,
  pending: [{ projectKey: "proj1", repoSlug: "", nextPageStart: 1, page: 2 }, { projectKey: "proj2", repoSlug: "", nextPageStart: 0, page: 1 }],
  page: 1
};

const page1CompleteState = {
  typeMapper: typeMapper,
  inProgress: true,
  complete: false,
  apiError: null,
  results: extractedValuesPage1,
  pending: [{ projectKey: "proj1", repoSlug: "", nextPageStart: 1, page: 2 }],
  page: 2
}

const page2CompleteState = {
  typeMapper: typeMapper,
  inProgress: true,
  complete: false,
  apiError: null,
  results: extractedValuesPage2,
  pending: [{ projectKey: "proj1", repoSlug: "", nextPageStart: 2, page: 3 }],
  page: 3
};

const page3CompleteState = {
  typeMapper: typeMapper,
  inProgress: false,
  complete: true,
  apiError: null,
  results: extractedValuesPage3,
  pending: [],
  page: 3
};

const proj1CompleteState = {
  typeMapper: typeMapper,
  inProgress: true,
  complete: false,
  apiError: null,
  results: extractedValuesProj1,
  pending: [{ projectKey: "proj2", repoSlug: "", nextPageStart: 0, page: 1 }],
  page: 1
};

test('basePager typeMapper - Mapping correctly', (assert) => {
  assert.equal(typeMapper("INIT_PENDING_PERMISSIONS"), "INIT_PENDING", "Pending mapping is correct");
  assert.equal(typeMapper("GET_PERMISSIONS"), "GET_RESULTS", "Get mapping is correct");
  assert.equal(typeMapper("GET_PERMISSIONS_SUCCESS"), "GET_RESULTS_SUCCESS", "Get mapping is correct");
  assert.equal(typeMapper("GET_PERMISSIONS_ERROR"), "GET_RESULTS_ERROR", "Get mapping is correct");
  assert.equal(typeMapper("UNKNOWN_TYPE"), "UNKNOWN_TYPE", "Unknown type is handled correctly");
  assert.end();
});


test('basePager - Init pending permissions success', (assert) => {
  const message = `Successful init pending permissions`;
  const expected = startState;
  const actual = basePager(initialState, {
    type: INIT_PENDING_PERMISSIONS,
    pendingList: [{ projectKey: "proj1", repoSlug: "" }, { projectKey: "proj2", repoSlug: "" }]
  });
  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('basePager - Get all proj1 permissions success - no paging', (assert) => {
  const message = 'Successful get all proj1 permissions - no paging.';
  const expected = proj1CompleteState;
  const actual = basePager(
    startState,
    {
      type: GET_PERMISSIONS_SUCCESS,
      error: false,
      meta: {
        projectKey: "proj1",
        repoSlug: ""
      },
      payload: proj1JsonAll
    },
    extractor)

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('basePager - Get all proj1 permissions success - no paging - one project', (assert) => {
  const message = 'Successful get all proj1 permissions - no paging.';
  const expected = proj1CompleteStateNoProj2;
  const actual = basePager(
    startProj1State, {
      type: GET_PERMISSIONS_SUCCESS,
      error: false,
      meta: {
        projectKey: "proj1",
        repoSlug: ""
      },
      payload: proj1JsonAll
    },
    extractor);

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('basePager - Get project 1 permissions success - Page 1', (assert) => {
  const message = 'Successful project 1 permissions get - Page 1';
  const expected = proj1Page1CompleteState;
  const actual = basePager(
    startState, {
      type: GET_PERMISSIONS_SUCCESS,
      error: false,
      meta: {
        projectKey: "proj1",
        repoSlug: ""
      },
      payload: proj1JsonPage1
    },
    extractor);

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('basePager - Get all permissions success - Page 1', (assert) => {
  const message = 'Successful all permissions get - Page 1';
  const expected = page1CompleteState;
  const actual = basePager(
    proj1Page1CompleteState, {
      type: GET_PERMISSIONS_SUCCESS,
      error: false,
      meta: {
        projectKey: "proj2",
        repoSlug: ""
      },
      payload: proj2Json
    },
    extractor);

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('basePager - Get project permissions success - Page 2', (assert) => {
  const message = 'Successful project permissions get - Page 2';
  const expected = page2CompleteState;
  const actual = basePager(
    page1CompleteState, {
      type: GET_PERMISSIONS_SUCCESS,
      error: false,
      meta: {
        projectKey: "proj1",
        repoSlug: ""
      },
      payload: proj1JsonPage2
    },
    extractor);

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('basePager - Get project permissions success - Page 3', (assert) => {
  const message = 'Successful project permissions get - Page 3';
  const expected = page3CompleteState;
  const actual = basePager(
    page2CompleteState, {
      type: GET_PERMISSIONS_SUCCESS,
      error: false,
      meta: {
        projectKey: "proj1",
        repoSlug: ""
      },
      payload: proj1JsonPage3
    },
    extractor);

  assert.deepEqual(actual, expected, message);
  assert.end();
});

// Corner cases

test('basePager - Invalid action type', (assert) => {
  const message = 'Invalid action type is handled correctly.';
  const expected = initialState;
  const actual = basePager(initialState, { type: 'INVALID_TYPE' });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('basePager - No typeMapper', (assert) => {
  const message = "Accepts generic states when no typeMapper supplied";
  const expected = startEmptyState;
  const actual = basePager(
    { ...baseInitialState, typeMapper: typeMapper }, {
      type: 'INIT_PENDING',
      pendingList: []
    });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('basePager - Init with empty pending list', (assert) => {
  const message = 'Successful init with empty pending list';
  const expected = startEmptyState;
  const actual = basePager(
    initialState, {
      type: 'INIT_PENDING_PERMISSIONS',
      pendingList: []
    });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

const extractedValuesNoExtractor = [];

const proj1CompleteStateNoExtractor = {
  typeMapper: typeMapper,
  inProgress: false,
  complete: true,
  apiError: null,
  results: extractedValuesNoExtractor,
  pending: [],
  page: 1
}

test('basePager - Get all proj1 permissions success - no extractor', (assert) => {
  const message = 'Successful get all proj1 permissions - no extractor.';
  const expected = proj1CompleteStateNoExtractor;
  const actual = basePager(
    startProj1State, {
      type: GET_PERMISSIONS_SUCCESS,
      error: false,
      meta: {
        projectKey: "proj1",
        repoSlug: ""
      },
      payload: proj1JsonAll
    });

  assert.deepEqual(actual, expected, message);
  assert.end();
});


const extractedValuesNaProjNaRepo = [
  {
    project: "--NA--",
    repo: "--NA--",
    group: "tool_git_proj1_admin",
    permission: "PROJECT_ADMIN",
    isValid: true
  },
  {
    project: "--NA--",
    repo: "--NA--",
    group: "tool_git_proj1_read",
    permission: "PROJECT_READ",
    isValid: true
  },
  {
    project: "--NA--",
    repo: "--NA--",
    group: "tool_git_proj1_write",
    permission: "PROJECT_WRITE",
    isValid: true
  },
];

const extractedValuesEmptyProjEmptyRepo = [
  {
    project: "",
    repo: "",
    group: "tool_git_proj1_admin",
    permission: "PROJECT_ADMIN",
    isValid: true
  },
  {
    project: "",
    repo: "",
    group: "tool_git_proj1_read",
    permission: "PROJECT_READ",
    isValid: true
  },
  {
    project: "",
    repo: "",
    group: "tool_git_proj1_write",
    permission: "PROJECT_WRITE",
    isValid: true
  },
];

const extractedValuesNoProjOrRepo = [
  {
    group: "tool_git_proj1_admin",
    permission: "PROJECT_ADMIN",
    isValid: true
  },
  {
    group: "tool_git_proj1_read",
    permission: "PROJECT_READ",
    isValid: true
  },
  {
    group: "tool_git_proj1_write",
    permission: "PROJECT_WRITE",
    isValid: true
  },
];

const startEmptyProjectAndRepo = {
  typeMapper: typeMapper,
  inProgress: true,
  complete: false,
  apiError: null,
  results: [],
  pending: [{ projectKey: "", repoSlug: "", nextPageStart: 0, page: 1 }],
  page: 1
}

const completeEmptyProjectAndRepoState = {
  typeMapper: typeMapper,
  inProgress: false,
  complete: true,
  apiError: null,
  results: extractedValuesEmptyProjEmptyRepo,
  pending: [],
  page: 1
}

const completeNaProjectAndRepoState = {
  typeMapper: typeMapper,
  inProgress: false,
  complete: true,
  apiError: null,
  results: extractedValuesNaProjNaRepo,
  pending: [],
  page: 1
}

test('basePager - Start empty project and repo', (assert) => {
  const message = 'Successful start empty project and repo';
  const expected = startEmptyProjectAndRepo;
  const actual = basePager(
    initialState, {
      type: INIT_PENDING_PERMISSIONS,
      pendingList: [{ projectKey: "", repoSlug: "" }]
    });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('basePager - Start undefined project and repo', (assert) => {
  const message = 'Successful start empty project and repo';
  const expected = startEmptyProjectAndRepo;
  const actual = basePager(
    initialState, {
      type: INIT_PENDING_PERMISSIONS,
      pendingList: [{}]
    });

  assert.deepEqual(actual, expected, message);
  assert.end();
});


test('basePager - No meta projectKey or repoSlug in GET action', (assert) => {
  const valueExtractor = (values) => {
    return values.map((value) => {
      return { project: "--NA--", repo: "--NA--", group: value.group.name, permission: value.permission, isValid: true }
    });
  }
  const message = 'No meta projectKey or repoSlug';
  const expected = completeNaProjectAndRepoState;
  const actual = basePager(
    startEmptyProjectAndRepo, {
      type: GET_PERMISSIONS_SUCCESS,
      error: false,
      meta: {},
      payload: proj1JsonAll
    },
    valueExtractor);

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('basePager - No project or repo in result', (assert) => {
  const valueExtractor = (values) => {
    return values.map((value) => {
      return { group: value.group.name, permission: value.permission, isValid: true }
    });
  }
  const message = 'Successful get permissions - no project or repo in result.';
  const expected = {
    ...completeEmptyProjectAndRepoState,
    results: extractedValuesNoProjOrRepo
  };
  const actual = basePager(
    startEmptyProjectAndRepo, {
      type: GET_PERMISSIONS_SUCCESS,
      error: false,
      meta: {},
      payload: proj1JsonAll
    },
    valueExtractor);

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('basePager - Get results with error', (assert) => {
  const message = 'Get results with error.';
  const expected = {
    ...startState,
    inProgress: false,
    complete: true,
    apiError: {action: 'Please contact your administrator', name: 'Paged API error', reason: 'Server not reachable or API call no longer valid.'}
  };
  const actual = basePager(
    startState,
    {
      type: GET_PERMISSIONS,
      error: true,
      payload: {name: "error"}
    },
    valueExtractor);
  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('basePager - Get results error', (assert) => {
  const message = 'Get results error.';
  const expected = {
    ...startState,
    inProgress: false,
    complete: true,
    apiError: {action: 'Please contact your administrator.', name: 'Paged API error', reason: 'API call returned an error.'}
  };
  const actual = basePager(
    startState,
    {
      type: GET_PERMISSIONS_ERROR,
      error: true,
      payload: {name: "error"}
    },
    valueExtractor);
  assert.deepEqual(actual, expected, message);
  assert.end();
});