import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';
import React from 'react';
import { createRenderer } from 'react-addons-test-utils';

import Filter from './Filter';

const test = addAssertions(tape, {jsxEquals});
const renderer = createRenderer();

test('Filter - Valid not showing', (assert) => {
   renderer.render(<Filter showValid={false} onClick={f => f} />);

   const message = 'Filter button is rendered correctly when showValid is false.';
   const expected = 
      <button className="btn btn-default" onClick={f => f}>Show Valid</button>;

   const actual = renderer.getRenderOutput();

   assert.jsxEquals(actual, expected, message);
   assert.end();
});

test('Filter - Valid  showing', (assert) => {
   renderer.render(<Filter showValid={true} onClick={f => f} />);

   const message = 'Filter button is rendered correctly when showValid is true.';
   const expected = 
      <button className="btn btn-default" onClick={f => f}>Hide Valid</button>;

   const actual = renderer.getRenderOutput();

   assert.jsxEquals(actual, expected, message);
   assert.end();
});
