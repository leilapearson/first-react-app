import { basePager, typeMapperCurry, baseInitialState, stateWithTypeMapper } from './basePager';

import {
  INIT_PENDING_SYSTEM_PERMISSIONS,
  GET_SYSTEM_PERMISSIONS,
  GET_SYSTEM_PERMISSIONS_SUCCESS,
  GET_SYSTEM_PERMISSIONS_ERROR,
  RESET_SYSTEM_PERMISSIONS
} from '../actions/index';

const typeMapper = typeMapperCurry([
  INIT_PENDING_SYSTEM_PERMISSIONS,
  GET_SYSTEM_PERMISSIONS,
  GET_SYSTEM_PERMISSIONS_SUCCESS,
  GET_SYSTEM_PERMISSIONS_ERROR,
  RESET_SYSTEM_PERMISSIONS
]);

export const initialState = stateWithTypeMapper(baseInitialState, typeMapper);

const groupIsValid = (group = "", permission = "") => {
  var isValid = false
  const local_admin_group = "stash-administrators"
  const local_user_group = "stash-users"
  const ad_admin_group = "tool_git_system admins"
  const ad_user_group = "tool_git_users"

  switch (permission) {
    case "LICENSED_USER":
      (group == local_user_group || group == ad_user_group) ? isValid = true : isValid = false
      break
    case "SYS_ADMIN":
      (group == local_admin_group || group == ad_admin_group) ? isValid = true : isValid = false
      break
    default:
      isValid = false
  }
  return isValid
}

const extractor = (values) => {
  return values.map((value) => {
    return {
      project: "--NA--",
      repo: "--NA--",
      group: value.group.name,
      permission: value.permission,
      isValid: groupIsValid(value.group.name, value.permission)
    }
  });
}

const errorNamer = () => "System Permissions Error";

// Reducer 
export function system(state = initialState, action) {
  return basePager(state, action, extractor, errorNamer)
}