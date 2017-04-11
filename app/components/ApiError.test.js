import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';
import React from 'react';
import { createRenderer } from 'react-addons-test-utils';

import ApiError from './ApiError';

const test = addAssertions(tape, { jsxEquals });
const renderer = createRenderer();

test('ApiError - with null', (assert) => {
  renderer.render(<ApiError error={null} />);

  const message = 'Null ApiError is rendered correctly.';
  const expected = <div></div>;
  const actual = renderer.getRenderOutput();

  assert.jsxEquals(actual, expected, message);
  assert.end();
});

test('ApiError - with message', (assert) => {
  var error = {
    name: "Testing error",
    message: "Simple Message",
    reason: "Just testing",
    action: "No action required"
  };
  renderer.render(<ApiError error={error} />);

  const message = 'Simple message rendered correctly.';
  const expected =
    <div className="panel panel-danger">
      <div className="panel-heading">{error.name}</div>
      <div className="panel-body">
        <p>{error.message}</p>
        <p>{error.reason}</p>
        <p>{error.action}</p>
      </div>
    </div>;
  const actual = renderer.getRenderOutput();

  assert.jsxEquals(actual, expected, message);
  assert.end();
});


