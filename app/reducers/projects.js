import { basePager, typeMapperCurry, baseInitialState, stateWithTypeMapper } from './basePager';
import {
  INIT_PENDING_PROJECTS,
  GET_PROJECTS,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  RESET_PROJECTS
} from '../actions/index';

const typeMapper = typeMapperCurry([
  INIT_PENDING_PROJECTS,
  GET_PROJECTS,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  RESET_PROJECTS
]);

export const initialState = stateWithTypeMapper(baseInitialState, typeMapper);

const extractor = (values) => {
  return values.map((value) => {
    return {
      projectKey: value.key,
      repoSlug: ""
    }
  });
}

const errorNamer = () => "Fetch Projects Error";

// Reducer 
export function projects(state = initialState, action) {
  return basePager(state, action, extractor, errorNamer)
}