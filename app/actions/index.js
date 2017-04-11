import { CALL_API } from 'redux-api-middleware';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export function login(server = "", user = "", password = "") {
  var encodedCredentials = btoa(`${user}:${password}`);
  return {
    [CALL_API]: {
      endpoint: `${server}/rest/api/latest/admin/cluster`,
      method: 'GET',
      headers: { 'Authorization': `Basic ${encodedCredentials}` },
      types: [{
        type: LOGIN,
        meta: {
          server: server,
          serverCredentials: encodedCredentials
        }
      },
        LOGIN_SUCCESS,
        LOGIN_ERROR]
    }
  }
}

export const START_LOADING = 'START_LOADING';
export function startLoading() {
  return {
    type: START_LOADING
  }
}
export const STOP_LOADING = 'STOP_LOADING';
export function stopLoading() {
  return {
    type: STOP_LOADING
  }
}

export const INIT_PENDING_SYSTEM_PERMISSIONS = 'INIT_PENDING_SYSTEM_PERMISSIONS';
export function initPendingSystemPermissions() {
  return {
    type: INIT_PENDING_SYSTEM_PERMISSIONS,
    pendingList: [{ projectKey: "", repoSlug: "" }]
  }
}
export const GET_SYSTEM_PERMISSIONS = 'GET_SYSTEM_PERMISSIONS';
export const GET_SYSTEM_PERMISSIONS_SUCCESS = 'GET_SYSTEM_PERMISSIONS_SUCCESS';
export const GET_SYSTEM_PERMISSIONS_ERROR = 'GET_SYSTEM_PERMISSIONS_ERROR';
export function getSystemPermissions(server = "", serverCredentials = "", pageStart = 0) {
  return {
    [CALL_API]: {
      endpoint: `${server}/rest/api/latest/admin/permissions/groups?start=${pageStart}`,
      method: 'GET',
      headers: { 'Authorization': `Basic ${serverCredentials}` },
      types: [
        GET_SYSTEM_PERMISSIONS,
        {
          type: GET_SYSTEM_PERMISSIONS_SUCCESS,
          meta: {
            projectKey: "",
            repoSlug: ""
          }
        },
        GET_SYSTEM_PERMISSIONS_ERROR]
    }
  }
}
export const RESET_SYSTEM_PERMISSIONS = 'RESET_SYSTEM_PERMISSIONS';
export function resetSystemPermissions() {
  return {
    type: RESET_SYSTEM_PERMISSIONS
  }
}

export const INIT_PENDING_PROJECTS = 'INIT_PENDING_PROJECTS';
export function initPendingProjects() {
  return {
    type: INIT_PENDING_PROJECTS,
    pendingList: [{ projectKey: "", repoSlug: "" }]
  }
}
export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_PROJECTS_SUCCESS = 'GET_PROJECTS_SUCCESS';
export const GET_PROJECTS_ERROR = 'GET_PROJECTS_ERROR';
export function getProjects(server = "", serverCredentials = "", pageStart = 0) {
  return {
    [CALL_API]: {
      endpoint: `${server}/rest/api/latest/projects?start=${pageStart}`,
      method: 'GET',
      headers: { 'Authorization': `Basic ${serverCredentials}` },
      types: [
        GET_PROJECTS,
        {
          type: GET_PROJECTS_SUCCESS,
          meta: { projectKey: "", repoSlug: "" }
        },
        GET_PROJECTS_ERROR]
    }
  }
}
export const RESET_PROJECTS = 'RESET_PROJECTS';
export function resetProjects() {
  return {
    type: RESET_PROJECTS
  }
}

export const INIT_PENDING_PROJECT_PERMISSIONS = 'INIT_PENDING_PROJECT_PERMISSIONS';
export function initPendingProjectPermissions(projectList = []) {
  return {
    type: INIT_PENDING_PROJECT_PERMISSIONS,
    pendingList: projectList
  }
}
export const GET_PROJECT_PERMISSIONS = 'GET_PROJECT_PERMISSIONS';
export const GET_PROJECT_PERMISSIONS_SUCCESS = 'GET_PROJECT_PERMISSIONS_SUCCESS';
export const GET_PROJECT_PERMISSIONS_ERROR = 'GET_PROJECT_PERMISSIONS_ERROR';
export function getProjectPermissions(server = "", serverCredentials = "", projectKey = "", pageStart = 0) {
  return {
    [CALL_API]: {
      endpoint: `${server}/rest/api/latest/projects/${projectKey}/permissions/groups?start=${pageStart}`,
      method: 'GET',
      headers: { 'Authorization': `Basic ${serverCredentials}` },
      types: [
        GET_PROJECT_PERMISSIONS,
        {
          type: GET_PROJECT_PERMISSIONS_SUCCESS,
          meta: { projectKey: projectKey, repoSlug: "" }
        },
        GET_PROJECT_PERMISSIONS_ERROR]
    }
  }
}
export const RESET_PROJECT_PERMISSIONS = 'RESET_PROJECT_PERMISSIONS';
export function resetProjectPermissions() {
  return {
    type: RESET_PROJECT_PERMISSIONS
  }
}


export const INIT_PENDING_REPOS = 'INIT_PENDING_REPOS';
export function initPendingRepos(projectList = []) {
  return {
    type: INIT_PENDING_REPOS,
    pendingList: projectList
  }
}
export const GET_REPOS = 'GET_REPOS';
export const GET_REPOS_SUCCESS = 'GET_REPOS_SUCCESS';
export const GET_REPOS_ERROR = 'GET_REPOS_ERROR';
export function getRepos(server = "", serverCredentials = "", projectKey = "", pageStart = 0) {
  return {
    [CALL_API]: {
      endpoint: `${server}/rest/api/latest/projects/${projectKey}/repos?start=${pageStart}`,
      method: 'GET',
      headers: { 'Authorization': `Basic ${serverCredentials}` },
      types: [
        GET_REPOS,
        {
          type: GET_REPOS_SUCCESS,
          meta: { projectKey: projectKey, repoSlug: "" }
        },
        GET_REPOS_ERROR]
    }
  }
}
export const RESET_REPOS = 'RESET_REPOS';
export function resetRepos() {
  return {
    type: RESET_REPOS
  }
}


export const INIT_PENDING_REPO_PERMISSIONS = 'INIT_PENDING_REPO_PERMISSIONS';
export function initPendingRepoPermissions(repoList = []) {
  return {
    type: INIT_PENDING_REPO_PERMISSIONS,
    pendingList: repoList
  }
}
export const GET_REPO_PERMISSIONS = 'GET_REPO_PERMISSIONS';
export const GET_REPO_PERMISSIONS_SUCCESS = 'GET_REPO_PERMISSIONS_SUCCESS';
export const GET_REPO_PERMISSIONS_ERROR = 'GET_REPO_PERMISSIONS_ERROR';
export function getRepoPermissions(server = "", serverCredentials = "", projectKey = "", repoSlug = "", pageStart = 0) {
  return {
    [CALL_API]: {
      endpoint: `${server}/rest/api/latest/projects/${projectKey}/repos/${repoSlug}/permissions/groups?start=${pageStart}`,
      method: 'GET',
      headers: { 'Authorization': `Basic ${serverCredentials}` },
      types: [
        GET_REPO_PERMISSIONS,
        {
          type: GET_REPO_PERMISSIONS_SUCCESS,
          meta: { projectKey: projectKey, repoSlug: repoSlug }
        },
        GET_REPO_PERMISSIONS_ERROR]
    }
  }
}
export const RESET_REPO_PERMISSIONS = 'RESET_REPO_PERMISSIONS';
export function resetRepoPermissions() {
  return {
    type: RESET_REPO_PERMISSIONS
  }
}


export const INIT_PENDING_BRANCH_PERMISSIONS = 'INIT_PENDING_BRANCH_PERMISSIONS';
export function initPendingBranchPermissions(repoList = []) {
  return {
    type: INIT_PENDING_BRANCH_PERMISSIONS,
    pendingList: repoList
  }
}
export const GET_BRANCH_PERMISSIONS = 'GET_BRANCH_PERMISSIONS';
export const GET_BRANCH_PERMISSIONS_SUCCESS = 'GET_BRANCH_PERMISSIONS_SUCCESS';
export const GET_BRANCH_PERMISSIONS_ERROR = 'GET_BRANCH_PERMISSIONS_ERROR';
export function getBranchPermissions(server = "", serverCredentials = "", projectKey = "", repoSlug = "", pageStart = 0) {
  return {
    [CALL_API]: {
      endpoint: `${server}/rest/branch-permissions/latest/projects/${projectKey}/repos/${repoSlug}/restrictions?start=${pageStart}`,
      method: 'GET',
      headers: { 'Authorization': `Basic ${serverCredentials}` },
      types: [
        GET_BRANCH_PERMISSIONS,
        {
          type: GET_BRANCH_PERMISSIONS_SUCCESS,
          meta: { projectKey: projectKey, repoSlug: repoSlug }
        },
        GET_BRANCH_PERMISSIONS_ERROR]
    }
  }
}
export const RESET_BRANCH_PERMISSIONS = 'RESET_BRANCH_PERMISSIONS';
export function resetBranchPermissions() {
  return {
    type: RESET_BRANCH_PERMISSIONS
  }
}


export const TOGGLE_SHOW_VALID = 'TOGGLE_SHOW_VALID';
export function toggleShowValid() {
  return { type: TOGGLE_SHOW_VALID }
}

export const REFRESH_DATA = 'REFRESH_DATA';
export function refreshData() {
  return { type: REFRESH_DATA }
}
export const REFRESH_DATA_COMPLETE = 'REFRESH_DATA_COMPLETE';
export function refreshDataComplete() {
  return { type: REFRESH_DATA_COMPLETE }
}
