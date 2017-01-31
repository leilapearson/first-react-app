// Following the "ducks" proposal
// See: https://github.com/erikras/ducks-modular-redux

import { combineReducers } from 'redux';
import { CALL_API } from 'redux-api-middleware';

// Actions
const LOGIN = 'git-permissions/app/LOGIN';
const LOGIN_SUCCESS = 'git-permissions/app/LOGIN_SUCCESS';
const LOGIN_ERROR = 'git-permissions/app/LOGIN_ERROR';
/* const GET_DATA = 'git-permissions/app/GET_DATA';
const SHOW_VALID = 'git-permissions/app/SHOW_VALID';
const HIDE_VALID = 'git-permissions/app/HIDE_VALID';
const SELECT_PROJECT = 'git-permissions/app/LOGIN';
const SELECT_REPO = 'git-permissions/app/LOGIN'; */

// Initial State
const initialState = {
    connecting: false,
    loggedIn: false,
    server: "",
    user: "",
    password: "",

 /*   project: "",
    repo: "",
    entities: {  // each item should have an ID...
        global_permissions: {},
        project_permissions: {},
        repo_permissions: {},
        branch_permissions: {},
    },
    isFetching: false,
    filteredData: [],  // should list the IDs only of the items being shown... ?
    showValid: false, */
    error: null
}

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                connecting: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                connecting: false,
                loggedIn: true,
                error: null
            }
        case LOGIN_ERROR:
            return {
                ...state,
                connecting: false,
                error: action.error
            }
        default:
            return state;
    }
}

// Action Creators
export function login(server="", user="", password="") {
    return {
        [CALL_API]: {
            endpoint: `${server}/rest/api/latest/admin/cluster`,
            method: 'GET',
            types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL]
        }         
    };
}

/*export function getData(server= "", user = "", password="") {
    return { type: GET_DATA, server, user, password }
}

export function showValid(allData = [], filteredData = []) {
    return { type: SHOW_VALID, allData, filteredData, showValid: true }
}

export function hideValid(allData = [], filteredData = []) {
    return { type: HIDE_VALID, allData, filteredData, showValid: false }
}

export function selectProject(project="") {
    return { type: SELECT_PROJECT, project }
}

export function selectRepo(repo="") {
    return { type: SELECT_REPO, repo }
}
*/