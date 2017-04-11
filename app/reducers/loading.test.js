import tape from 'tape';

import { loading } from './loading';
import { START_LOADING, STOP_LOADING } from '../actions/index';

const test = tape;

test('Loading - start', (assert) => {

  const message = 'Start loading';
  const expected = {
    isLoading: true
  };
  const actual = loading({ isLoading: false }, { type: START_LOADING });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Loading - stop', (assert) => {

  const message = 'Stop loading';
  const expected = {
    isLoading: false
  };
  const actual = loading({ isLoading: true }, { type: STOP_LOADING });

  assert.deepEqual(actual, expected, message);
  assert.end();
});
