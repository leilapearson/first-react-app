import tape from 'tape';

import { filters } from './filters';
import { TOGGLE_SHOW_VALID } from '../actions/index';

const test = tape;

test('Filters - showValid toggle false to true', (assert) => {

  const message = 'ShowValid toggles from false to true';
  const expected = {
    showValid: true
  };
  const actual = filters({ showValid: false }, { type: 'TOGGLE_SHOW_VALID' });

  assert.deepEqual(actual, expected, message);
  assert.end();
});

test('Filters - showValid toggle true to false', (assert) => {

  const message = 'ShowValid toggles from ture to false';
  const expected = {
    showValid: false
  };
  const actual = filters({ showValid: true }, { type: TOGGLE_SHOW_VALID });

  assert.deepEqual(actual, expected, message);
  assert.end();
});
