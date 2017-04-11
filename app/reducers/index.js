import { combineReducers } from 'redux';
import { credentials } from './credentials';
import { system } from './system';
import { projects } from './projects';
import { projectPermissions } from './project-permissions';
import { repos } from './repos';
import { repoPermissions } from './repo-permissions';
import { branchPermissions } from './branch-permissions';
import { filters } from './filters';
import { loading } from './loading';
import { refresh } from './refresh';

// Reducer
const reducer = combineReducers({
  credentials,
  system,
  projects,
  projectPermissions,
  repos,
  repoPermissions,
  branchPermissions,
  filters,
  loading,
  refresh
});

export default reducer;

