'use strict';

import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import PermissionTable from '../components/PermissionTable';
import ApiError from '../components/ApiError';
import Loading from '../components/Loading';
import Actions from '../components/Actions';
import {
  initPendingSystemPermissions, getSystemPermissions, resetSystemPermissions,
  initPendingProjects, getProjects, resetProjects,
  initPendingProjectPermissions, getProjectPermissions, resetProjectPermissions,
  initPendingRepos, getRepos, resetRepos,
  initPendingRepoPermissions, getRepoPermissions, resetRepoPermissions,
  initPendingBranchPermissions, getBranchPermissions, resetBranchPermissions,
  toggleShowValid,
  startLoading, stopLoading,
  refreshData, refreshDataComplete
} from '../actions/index';

class FetchingComponent extends React.Component {

  componentWillReceiveProps(nextProps) {
    // Reset all of the data if starting a refresh
    if (nextProps.isRefreshing && !this.props.isRefreshing) {
      this.props.resetPermissions();
    }
    // Start loading data when authentication is complete or when a refresh is started
    if (nextProps.credentials.authenticated && !this.props.credentials.authenticated ||
      nextProps.isRefreshing && !this.props.isRefreshing) {
      this.props.startLoading();
    }
    // First load the system permissions and the list of projects
    if (nextProps.isLoading && !this.props.isLoading) {
      this.props.initPendingSystemPermissions();
      this.props.initPendingProjects();
    }
    // Get new page of system permissions
    if (nextProps.systemPermissionsPage > this.props.systemPermissionsPage) {
      this.props.getSystemPermissions(this.props.credentials, nextProps.pendingSystemPermissions);
    }
    // Get new page of projects
    if (nextProps.projectListPage > this.props.projectListPage) {
      this.props.getProjects(this.props.credentials, nextProps.pendingProjects);
    }
    // If we have all the projects, we can start on the project permissions and the repos
    if (nextProps.projectListComplete && !this.props.projectListComplete) {
      this.props.initPendingProjectPermissions(nextProps.projectList);
      this.props.initPendingRepos(nextProps.projectList);
    }
    // Get new page of project permissions
    if (nextProps.projectPermissionsPage > this.props.projectPermissionsPage) {
      this.props.getProjectPermissions(this.props.credentials, nextProps.pendingProjectPermissions);
    }
    // Get a new page of repos
    if (nextProps.repoListPage > this.props.repoListPage) {
      this.props.getRepos(nextProps.credentials, nextProps.pendingRepos);
    }
    // If we have all the repos, we can start on the repo permissions and the branch groups
    if (nextProps.repoListComplete && !this.props.repoListComplete) {
      this.props.initPendingRepoPermissions(nextProps.repoList);
      this.props.initPendingBranchPermissions(nextProps.repoList);
    }
    // Get new page of repo permissions
    if (nextProps.repoPermissionsPage > this.props.repoPermissionsPage) {
      this.props.getRepoPermissions(nextProps.credentials, nextProps.pendingRepoPermissions);
    }
    // Get new page of branch groups
    if (nextProps.branchPermissionsPage > this.props.branchPermissionsPage) {
      this.props.getBranchPermissions(nextProps.credentials, nextProps.pendingBranchPermissions);
    }
    // Stop loading indicator and the refresh if permissions are complete
    if (nextProps.permissionsComplete && !this.props.permissionsComplete) {
      this.props.stopLoading();
    }
    // This was a refresh operation that is now complete
    if (!nextProps.isLoading && this.props.isLoading && this.props.isRefreshing) {
      this.props.stopRefresh();
    }
  }

  render() {
    if (this.props.credentials.authenticated) {
      return (
        <div>
          <ApiError error={this.props.systemPermissionsError} />
          <ApiError error={this.props.projectListError} />
          <ApiError error={this.props.projectPermissionsError} />
          <ApiError error={this.props.repoListError} />
          <ApiError error={this.props.repoPermissionsError} />
          <ApiError error={this.props.branchPermissionsError} />
          <Loading isLoading={this.props.isLoading} message="Loading permissions..." />
          <Actions
            onFilterClick={this.props.onFilterClick} showValid={this.props.showValid}
            onRefreshClick={this.props.onRefreshClick} isRefreshing={this.props.isRefreshing} isLoading={this.props.isLoading} />
          <PermissionTable
            permissionsComplete={this.props.permissionsComplete}
            systemPermissions={this.props.systemPermissions}
            projectPermissions={this.props.projectPermissions}
            repoPermissions={this.props.repoPermissions}
            branchPermissions={this.props.branchPermissions}
            showValid={this.props.showValid}
          />
        </div>
      )
    }
    else {
      return <div></div>
    }
  }
}

FetchingComponent.propTypes = {

  // API credentials
  credentials: React.PropTypes.object.isRequired,

  // System Permissions
  initPendingSystemPermissions: React.PropTypes.func.isRequired,
  getSystemPermissions: React.PropTypes.func.isRequired,
  systemPermissions: React.PropTypes.array,
  pendingSystemPermissions: React.PropTypes.array,
  systemPermissionsPage: React.PropTypes.number,
  systemPermissionsComplete: React.PropTypes.bool,
  systemPermissionsError: React.PropTypes.oneOfType([React.PropTypes.oneOf([null]), React.PropTypes.object]),

  // Projects
  initPendingProjects: React.PropTypes.func.isRequired,
  getProjects: React.PropTypes.func.isRequired,
  projectList: React.PropTypes.array,
  pendingProjects: React.PropTypes.array,
  projectListPage: React.PropTypes.number,
  projectListComplete: React.PropTypes.bool,
  projectListError: React.PropTypes.oneOfType([React.PropTypes.oneOf([null]), React.PropTypes.object]),

  // Project Permissions
  initPendingProjectPermissions: React.PropTypes.func.isRequired,
  getProjectPermissions: React.PropTypes.func.isRequired,
  projectPermissions: React.PropTypes.array,
  pendingProjectPermissions: React.PropTypes.array,
  projectPermissionsPage: React.PropTypes.number,
  projectPermissionsComplete: React.PropTypes.bool,
  projectPermissionsError: React.PropTypes.oneOfType([React.PropTypes.oneOf([null]), React.PropTypes.object]),

  // Repos
  initPendingRepos: React.PropTypes.func.isRequired,
  getRepos: React.PropTypes.func.isRequired,
  repoList: React.PropTypes.array,
  pendingRepos: React.PropTypes.array,
  repoListPage: React.PropTypes.number,
  repoListComplete: React.PropTypes.bool,
  repoListError: React.PropTypes.oneOfType([React.PropTypes.oneOf([null]), React.PropTypes.object]),

  // Repo Permissions
  initPendingRepoPermissions: React.PropTypes.func.isRequired,
  getRepoPermissions: React.PropTypes.func.isRequired,
  repoPermissions: React.PropTypes.array,
  pendingRepoPermissions: React.PropTypes.array,
  repoPermissionsPage: React.PropTypes.number,
  repoPermissionsComplete: React.PropTypes.bool,
  repoPermissionsError: React.PropTypes.oneOfType([React.PropTypes.oneOf([null]), React.PropTypes.object]),

  // Branch Permissions
  initPendingBranchPermissions: React.PropTypes.func.isRequired,
  getBranchPermissions: React.PropTypes.func.isRequired,
  branchPermissions: React.PropTypes.array,
  pendingBranchPermissions: React.PropTypes.array,
  branchPermissionsPage: React.PropTypes.number,
  branchPermissionsComplete: React.PropTypes.bool,
  branchPermissionsError: React.PropTypes.oneOfType([React.PropTypes.oneOf([null]), React.PropTypes.object]),

  // Loading
  startLoading: React.PropTypes.func.isRequired,
  stopLoading: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired,

  // All permissions
  resetPermissions: React.PropTypes.func.isRequired,
  permissionsComplete: React.PropTypes.bool,

  // Filters
  onFilterClick: React.PropTypes.func.isRequired,
  showValid: React.PropTypes.bool.isRequired,

  // Refresh
  onRefreshClick: React.PropTypes.func.isRequired,
  onDisabledRefreshClick: React.PropTypes.func.isRequired,
  stopRefresh: React.PropTypes.func.isRequired,
  isRefreshing: React.PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    // API credentials
    credentials: state.credentials,

    // System Permisisons
    systemPermissions: state.system.results,
    pendingSystemPermissions: state.system.pending,
    systemPermissionsPage: state.system.page,
    systemPermissionsComplete: state.system.complete,
    systemPermissionsError: state.system.apiError,

    // Projects
    projectList: state.projects.results,
    pendingProjects: state.projects.pending,
    projectListPage: state.projects.page,
    projectListComplete: state.projects.complete,
    projectListError: state.projects.apiError,

    // Project Permissions
    projectPermissions: state.projectPermissions.results,
    pendingProjectPermissions: state.projectPermissions.pending,
    projectPermissionsPage: state.projectPermissions.page,
    projectPermissionsComplete: state.projectPermissions.complete,
    projectPermissionsError: state.projectPermissions.apiError,

    // Repos
    repoList: state.repos.results,
    pendingRepos: state.repos.pending,
    repoListPage: state.repos.page,
    repoListComplete: state.repos.complete,
    repoListError: state.repos.apiError,

    // Repo permissions
    repoPermissions: state.repoPermissions.results,
    pendingRepoPermissions: state.repoPermissions.pending,
    repoPermissionsPage: state.repoPermissions.page,
    repoPermissionsComplete: state.repoPermissions.complete,
    repoPermissionsError: state.repoPermissions.apiError,

    // Branch permissions
    branchPermissions: state.branchPermissions.results,
    pendingBranchPermissions: state.branchPermissions.pending,
    branchPermissionsPage: state.branchPermissions.page,
    branchPermissionsComplete: state.branchPermissions.complete,
    branchPermissionsError: state.branchPermissions.apiError,

    // All permissions
    permissionsComplete: (state.system.complete &&
      state.projects.complete &&
      state.projectPermissions.complete &&
      state.repos.complete &&
      state.repoPermissions.complete &&
      state.branchPermissions.complete),

    // Loading
    isLoading: state.loading.isLoading,

    // Filters
    showValid: state.filters.showValid,

    // Refresh
    isRefreshing: state.refresh.isRefreshing
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initPendingSystemPermissions: () => {
      dispatch(initPendingSystemPermissions())
    },
    getSystemPermissions: (credentials, pendingSystemPermissions) => {
      R.map(pending =>
        dispatch(getSystemPermissions(credentials.server, credentials.serverCredentials, pending.nextPageStart))
      )(pendingSystemPermissions);
    },
    initPendingProjects: () => {
      dispatch(initPendingProjects())
    },
    getProjects: (credentials, pendingProjects) => {
      R.map(pending =>
        dispatch(getProjects(credentials.server, credentials.serverCredentials, pending.nextPageStart))
      )(pendingProjects);
    },
    initPendingProjectPermissions: (projectList) => {
      dispatch(initPendingProjectPermissions(projectList));
    },
    getProjectPermissions: (credentials, projectList) => {
      R.map(project => dispatch(getProjectPermissions(
          credentials.server, credentials.serverCredentials, project.projectKey, project.nextPageStart))
      )(projectList);
    },
    initPendingRepos: (projectList) => {
      dispatch(initPendingRepos(projectList));
    },
    getRepos: (credentials, projectList) => {
      R.map(project => dispatch(getRepos(
          credentials.server, credentials.serverCredentials, project.projectKey, project.nextPageStart))
      )(projectList)
    },
    initPendingRepoPermissions: (repoList) => {
      dispatch(initPendingRepoPermissions(repoList));
    },
    getRepoPermissions: (credentials, repoList) => {
      R.map(repo => dispatch(getRepoPermissions(
          credentials.server, credentials.serverCredentials, repo.projectKey, repo.repoSlug, repo.nextPageStart))
      )(repoList);
    },
    initPendingBranchPermissions: (repoList) => {
      dispatch(initPendingBranchPermissions(repoList));
    },
    getBranchPermissions: (credentials, repoList) => {
      R.map(repo => dispatch(getBranchPermissions(
          credentials.server, credentials.serverCredentials, repo.projectKey, repo.repoSlug, repo.nextPageStart))
      )(repoList);
    },
    resetPermissions: () => {
      dispatch(resetSystemPermissions());
      dispatch(resetProjects());
      dispatch(resetProjectPermissions());
      dispatch(resetRepos());
      dispatch(resetRepoPermissions());
      dispatch(resetBranchPermissions());
    },
    onFilterClick: () => {
      dispatch(toggleShowValid())
    },
    startLoading: () => {
      dispatch(startLoading())
    },
    stopLoading: () => {
      dispatch(stopLoading())
    },
    onRefreshClick: () => {
      dispatch(refreshData())
    },
    onDisabledRefreshClick: () => {
      return;
    },
    stopRefresh: () => {
      dispatch(refreshDataComplete());
    }
  }
}

const Permissions = connect(
  mapStateToProps,
  mapDispatchToProps
)(FetchingComponent);

export default Permissions;

