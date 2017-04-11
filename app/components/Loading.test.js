import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';
import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import { ThreeBounce } from 'better-react-spinkit';

import Loading from './Loading';

const test = addAssertions(tape, { jsxEquals });
const renderer = createRenderer();

test('Loading - with default properties', (assert) => {
  renderer.render(<Loading/>);

  const message = 'Loading without properties is rendered correctly.';
  const expected = <div></div>;
  const actual = renderer.getRenderOutput();

  assert.jsxEquals(actual, expected, message);
  assert.end();
});

test('Loading - with message', (assert) => {
  renderer.render(<Loading isLoading={true} message="Loading..." />);

  const message = 'Simple message rendered correctly.';
  const expected =
    <div className="row">
        <div className="col-xs-12">
          <div className="panel panel-primary">
            <div className="panel-heading">Loading...</div>
            <ThreeBounce />
          </div>
        </div>
      </div>;
  const actual = renderer.getRenderOutput();

  assert.jsxEquals(actual, expected, message);
  assert.end();
});


