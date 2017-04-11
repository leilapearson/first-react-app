import tape from 'tape';

import { refresh } from './refresh';
import { REFRESH_DATA, REFRESH_DATA_COMPLETE } from '../actions/index';

const test = tape;

test('Refresh - sets refresh flag', (assert) => {

  const message = 'sets refresh flag';
  const expected = {
    isRefreshing: true
  };
  const actual = refresh({ isRefreshing: false }, { type: REFRESH_DATA });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Refresh - clears refresh flag', (assert) => {

  const message = 'clears refresh flag';
  const expected = {
    isRefreshing: false
  };
  const actual = refresh({ isRefreshing: true }, { type: REFRESH_DATA_COMPLETE });

  assert.deepEqual(actual, expected, message);
  assert.end();
});
