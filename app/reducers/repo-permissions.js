import R from "ramda";
import { tokensAreValid } from './util';
import { basePager, typeMapperCurry, baseInitialState, stateWithTypeMapper } from './basePager';
import {
  INIT_PENDING_REPO_PERMISSIONS,
  GET_REPO_PERMISSIONS,
  GET_REPO_PERMISSIONS_SUCCESS,
  GET_REPO_PERMISSIONS_ERROR,
  RESET_REPO_PERMISSIONS
} from '../actions/index';

const typeMapper = typeMapperCurry([
  INIT_PENDING_REPO_PERMISSIONS,
  GET_REPO_PERMISSIONS,
  GET_REPO_PERMISSIONS_SUCCESS,
  GET_REPO_PERMISSIONS_ERROR,
  RESET_REPO_PERMISSIONS
]);

export const initialState = stateWithTypeMapper(baseInitialState, typeMapper);

export const groupIsValid = (projectKey = "", repoSlug = "", group = "", permission = "") => {
  const permissionsToExpected = { "REPO_ADMIN": "admin", "REPO_READ": "read", "REPO_WRITE": "write" };
  const expectedPermission = R.has(permission, permissionsToExpected) ? permissionsToExpected[permission] : permission ;
  const expected = ["tool", "git", projectKey, repoSlug, expectedPermission];
  return tokensAreValid(group.split('_'), expected);
}

const extractor = (values, meta) => {
  return values.map((value) => {
    return {
      project: meta.projectKey,
      repo: meta.repoSlug,
      group: value.group.name,
      permission: value.permission,
      isValid: groupIsValid(meta.projectKey, meta.repoSlug, value.group.name, value.permission)
    }
  });
}

const errorNamer = () => "Repo Permissions Error";

// Reducer 
export function repoPermissions(state = initialState, action) {
  return basePager(state, action, extractor, errorNamer)
}