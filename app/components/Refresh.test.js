import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';
import React from 'react';
import { createRenderer } from 'react-addons-test-utils';

import Refresh from './Refresh';

const test = addAssertions(tape, { jsxEquals });
const renderer = createRenderer();

test('Refresh - Not refreshing', (assert) => {
  renderer.render(<Refresh isRefreshing={false} onClick={f => f} />);

  const message = 'Refresh button is rendered correctly when isRefreshing is false.';
  const expected =
    <button className="btn btn-default" onClick={f => f}>
      <span className="glyphicon glyphicon-refresh"></span>Refresh</button>;

  const actual = renderer.getRenderOutput();

  assert.jsxEquals(actual, expected, message);
  assert.end();
});

test('Refresh - While refreshing', (assert) => {
  renderer.render(<Refresh isRefreshing={true} onClick={f => f} />);

  const message = 'Refresh button is rendered correctly when isRefreshing is true.';
  const expected =
    <button className="btn btn-default disabled" onClick={f => f}>
      <span className="glyphicon glyphicon-refresh"></span>Refresh</button>;

  const actual = renderer.getRenderOutput();

  assert.jsxEquals(actual, expected, message);
  assert.end();
});
