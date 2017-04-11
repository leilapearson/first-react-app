import R from 'ramda';
import { tokensAreValid } from './util';
import { basePager, typeMapperCurry, baseInitialState, stateWithTypeMapper } from './basePager';
import {
  INIT_PENDING_PROJECT_PERMISSIONS,
  GET_PROJECT_PERMISSIONS,
  GET_PROJECT_PERMISSIONS_SUCCESS,
  GET_PROJECT_PERMISSIONS_ERROR,
  RESET_PROJECT_PERMISSIONS
} from '../actions/index';

const typeMapper = typeMapperCurry([
  INIT_PENDING_PROJECT_PERMISSIONS,
  GET_PROJECT_PERMISSIONS,
  GET_PROJECT_PERMISSIONS_SUCCESS,
  GET_PROJECT_PERMISSIONS_ERROR,
  RESET_PROJECT_PERMISSIONS
]);

export const initialState = stateWithTypeMapper(baseInitialState, typeMapper);

export const groupIsValid = (projectKey = "", group = "", permission = "") => {
  const permissionsToExpected = { "PROJECT_ADMIN": "admin", "PROJECT_READ": "read", "PROJECT_WRITE": "write" };
  const expectedPermission = R.has(permission, permissionsToExpected) ? permissionsToExpected[permission] : permission ;
  const expected = ["tool", "git", projectKey, expectedPermission];
  return tokensAreValid(group.split('_'), expected);
}

const extractor = (values, meta) => {
  return values.map((value) => {
    return {
      project: meta.projectKey,
      repo: "--NA--",
      group: value.group.name,
      permission: value.permission,
      isValid: groupIsValid(meta.projectKey, value.group.name, value.permission)
    }
  });
}

const errorNamer = () => "Project Permissions Error";

// Reducer 
export function projectPermissions(state = initialState, action) {
  return basePager(state, action, extractor, errorNamer)
}