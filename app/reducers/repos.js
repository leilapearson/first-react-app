import { basePager, typeMapperCurry, baseInitialState, stateWithTypeMapper } from './basePager';
import {
  INIT_PENDING_REPOS,
  GET_REPOS,
  GET_REPOS_SUCCESS,
  GET_REPOS_ERROR,
  RESET_REPOS
} from '../actions/index';

const typeMapper = typeMapperCurry([
  INIT_PENDING_REPOS,
  GET_REPOS,
  GET_REPOS_SUCCESS,
  GET_REPOS_ERROR,
  RESET_REPOS
]);

export const initialState = stateWithTypeMapper(baseInitialState, typeMapper);

const extractor = (values, meta) => {
  return values.map((value) => {
    return {
      projectKey: meta.projectKey,
      repoSlug: value.slug
    }
  });
}

const errorNamer = () => "Fetch Repos Error";

// Reducer 
export function repos(state = initialState, action) {
  return basePager(state, action, extractor, errorNamer)
}