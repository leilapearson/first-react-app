import tape from 'tape';

import { credentials } from './credentials';
import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from '../actions/index';

const test = tape;

const testState = {
  server: "",
  serverCredentials: "",
  authenticated: false,
  isConnecting: false,
  apiError: null
};

test('Credentials - Invalid action type', (assert) => {
  const message = 'Invalid action type is han]dled correctly.';
  const expected = testState;
  //const actual = { credentials: testState };

  const actual = credentials(testState, { type: 'INVALID_TYPE' });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Credentials - Login with credentials', (assert) => {

  const message = 'Successful login handled correctly.';
  const expected = {
    server: "myserver",
    serverCredentials: "mycredentials",
    authenticated: false,
    isConnecting: true,
    apiError: null
  };
  const actual = credentials(testState, {
    type: LOGIN,
    error: false,
    payload: null,
    meta: {
      server: "myserver",
      serverCredentials: "mycredentials"
    }
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Credentials - Login success', (assert) => {

  const message = 'Successful login handled correctly.';
  const expected = {
    server: "",
    serverCredentials: "",
    authenticated: true,
    isConnecting: false,
    apiError: null
  };
  const actual = credentials(testState, {
    type: LOGIN_SUCCESS,
    error: false,
    payload: null,
    meta: {
      server: "myserver",
      serverCredentials: "mycredentials"
    }
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Credentials - Login error on login', (assert) => {
  const message = 'Successfully handled error on login.';
  const expected = {
    server: "",
    serverCredentials: "",
    authenticated: false,
    isConnecting: false,
    apiError: { 
      action: 'Please try again or contact your administrator if the error persists', 
      name: 'Authentication error', 
      reason: 'Unable to contact server or API call invalid.' }
  };
  const actual = credentials(testState, {
    type: LOGIN,
    error: true,
    payload: {name: "My error" },
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Credentials - Login error on payload error', (assert) => {
  const message = 'Successfully handled error on payload error.';
  const expected = {
    server: "",
    serverCredentials: "",
    authenticated: false,
    isConnecting: false,
    apiError: { 
      action: 'Please ensure you are using an account with system admin permissions', 
      name: 'Authentication error', 
      reason: 'Invalid login or insufficient permissions.' }
  };
  const actual = credentials(testState, {
    type: LOGIN_ERROR,
    error: true,
    payload: { name: "My error" },
  });

  assert.deepEqual(actual, expected, message);
  assert.end();
});