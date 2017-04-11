import { baseInitialState, typeMapperCurry, stateWithTypeMapper, basePager } from './basePager';
import { tokenIsValid } from './util';
import R from 'ramda';

import {
  INIT_PENDING_BRANCH_PERMISSIONS,
  GET_BRANCH_PERMISSIONS,
  GET_BRANCH_PERMISSIONS_SUCCESS,
  GET_BRANCH_PERMISSIONS_ERROR,
  RESET_BRANCH_PERMISSIONS
} from '../actions/index';

const typeMapper = typeMapperCurry([
  INIT_PENDING_BRANCH_PERMISSIONS,
  GET_BRANCH_PERMISSIONS,
  GET_BRANCH_PERMISSIONS_SUCCESS,
  GET_BRANCH_PERMISSIONS_ERROR,
  RESET_BRANCH_PERMISSIONS
]);

const groupIsValid = (projectKey = "", repoSlug = "", group = "", branchMatcher = "") => {
  let tokens = group.split("_");
  let tokenTemplates = ["tool", "git", `${projectKey}`, `${repoSlug}`, `${branchMatcher}`, "write"];

  return (tokens.length === tokenTemplates.length) ?
    tokens.slice(0, tokenTemplates.length)
      .map((token, index) => { return tokenIsValid(token, tokenTemplates[index]) })
      .every((element) => (element && true)) :
    false;
}

/* Sample value
 {
      "id": 701,
      "type": "no-deletes",
      "matcher": {
        "id": "release/**",
        "displayId": "release/**",
        "type": {
          "id": "PATTERN",
          "name": "Pattern"
        },
        "active": true
      },
      "users": [],
      "groups": ["My group", "My other group"],
      "accessKeys": []
  }
*/
// Returns an array of new results from values, filtering out values that don't include a group name
// extractor :: array, object -> array
const extractor = (values = [], meta = {}) => {
  return R.pipe(
    R.flatten(),
    R.filter((value) => value.groups.length > 0),
    R.map((value) => {
      return R.map((group) => {
        return {
          project: meta.projectKey,
          repo: meta.repoSlug,
          group: group,
          permission: R.toUpper(value.type) + ": " + value.matcher.id,
          isValid: groupIsValid(meta.projectKey, meta.repoSlug, group, value.matcher.id),
        }
      })(value.groups)
    }),
    R.flatten())(values);
}

const errorNamer = () => "Branch Permissions Error";

export const initialState = stateWithTypeMapper(baseInitialState, typeMapper, errorNamer);

// Reducer 
export function branchPermissions(state = initialState, action) {
  return basePager(state, action, extractor, errorNamer)
} 
