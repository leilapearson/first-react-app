// basePager allows for generic handling of Atlassian Paged APIs, which send
// back their values in a JSON object that looks like this:
// {
//        "size": 3,
//        "limit": 3,
//        "isLastPage": false,
//        "values": [
//            { /* result 0 */ },
//            { /* result 1 */ },
//            { /* result 2 */ }
//        ],
//        "start": 0,
//        "filter": null,
//        "nextPageStart": 3
// }
//
// To use basePager in your reducer, call basePager with a typeMapper as part of the
// initial state and also supply an extractor function.
//
// The action itself must include a projectKey property and a repoSlug property. 
// They can be empty strings if appropriate.
//
import R from 'ramda';

const INIT_PENDING = "INIT_PENDING";
const GET_RESULTS = "GET_RESULTS";
const GET_RESULTS_SUCCESS = "GET_RESULTS_SUCCESS";
const GET_RESULTS_ERROR = "GET_RESULTS_ERROR";
const RESET_DATA = "RESET_DATA";

export const baseInitialState = {
  typeMapper: f => f,
  inProgress: false,
  complete: false,
  apiError: null,
  results: [],
  pending: [],
  page: 0
};

// Use typeMapperCurry to create your typeMapper function by supplying your list of specific
// action types. For example:
// const typeMapper = typeMapperCurry(["INIT_PENDING","GET","GET_SUCCESS","GET_ERROR"]);
export const typeMapperCurry = (specificActionTypes = []) => {
  let genericActionTypes = [INIT_PENDING, GET_RESULTS, GET_RESULTS_SUCCESS, GET_RESULTS_ERROR, RESET_DATA];
  return (actionType = "") => {
    return (genericActionTypes[R.indexOf(actionType, specificActionTypes)] || actionType)
  }
}

// Adds your typeMapper function to the state. Use to initialize initialState
export const stateWithTypeMapper = (state, typeMapper) => { return { ...state, typeMapper: typeMapper } };


function hasPendingList(action) {
  return (action.pendingList.length > 0)
}

function initPending(pendingList) {
  return pendingList.map((element) => {
    return {
      projectKey: R.isNil(element.projectKey) ? "" : element.projectKey,
      repoSlug: R.isNil(element.repoSlug) ? "" : element.repoSlug,
      nextPageStart: 0,
      page: 1
    }
  })
}

function updatedPending(action, state) {
  // Add another pending page if applicable, and filter out the page we just processed
  let projectKey = R.isNil(action.meta.projectKey) ? "" : action.meta.projectKey;
  let repoSlug = R.isNil(action.meta.repoSlug) ? "" : action.meta.repoSlug;
  return [
    ...((action.payload.isLastPage === false) ?
      [{
        projectKey: projectKey,
        repoSlug: repoSlug,
        nextPageStart: action.payload.nextPageStart,
        page: (state.page + 1)
      }] :
      []),
    ...state.pending.filter((element) =>
      !(element.projectKey === projectKey &&
        element.repoSlug === repoSlug &&
        element.nextPageStart === action.payload.start))
  ]
}

function updatedPage(pendingList, page) {
  // Move to next page if done retrieving the current page of permissions for all projects
  if (pendingList.length > 0) {
    page = (pendingList.every((element) => (element.page > page))) ? page + 1 : page;
  }
  return page;
}

const nullExtractor = () => { return [] };

function extractResults(extractor = nullExtractor, values = [], meta = {}) {
  return extractor(values, meta)
}

const defaultNamer = () => "Paged API error";

// basePager is a generic basis for all reducers that start from a list of pending
// objects and then get all pages of their values
//
// The initial pending list must consist of objects like the following:
// {
//   projectKey: "",
//   repoSlug:  ""
// }
//
// The GET_RESULTS_SUCCESS action needs an action.meta that also contains
// the projectKey and repoSlug properties. These fields identify which 
// pending object the results apply to.
//
// The extractor function is called with the JSON payload values for each  
// page of results, and the resulting extracted values are stored in the results array. 
export function basePager(state = baseInitialState, action = {}, extractor = nullExtractor, errorNamer = defaultNamer) {

  switch (state.typeMapper(action.type)) {
    case INIT_PENDING:
      return {
        ...state,
        inProgress: hasPendingList(action),
        complete: !hasPendingList(action),
        pending: initPending(action.pendingList),
        page: hasPendingList(action) ? 1 : 0
      }

    case GET_RESULTS:
      return {
        ...state,
        inProgress: (action.error) ? false : true,
        complete: (action.error) ? true : false,
        apiError: (action.error) ? {
          ...action.payload,
          name: errorNamer(),
          reason: "Server not reachable or API call no longer valid.",
          action: "Please contact your administrator"

        } : null
      }

    case GET_RESULTS_SUCCESS:
      return {
        ...state,
        inProgress: (updatedPending(action, state).length > 0),
        complete: (updatedPending(action, state).length === 0),
        apiError: null,
        results: [
          ...state.results,
          ...extractResults(extractor, action.payload.values, action.meta)
        ],
        pending: updatedPending(action, state),
        page: updatedPage(updatedPending(action, state), state.page)
      }

    case GET_RESULTS_ERROR:
      return {
        ...state,
        inProgress: false,
        complete: true,
        apiError: {
          ...action.payload,
          name: errorNamer(),
          reason: "API call returned an error.",
          action: "Please contact your administrator."
        }
      }

    case RESET_DATA:
      return {
        ...state,
        inProgress: false,
        complete: false,
        apiError: null,
        results: [],
        pending: [],
        page: 0
      }

    default:
      return state;
  }
}

