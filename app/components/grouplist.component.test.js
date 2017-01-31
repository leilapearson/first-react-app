import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';
import React from 'react';
import { createRenderer } from 'react-addons-test-utils';

import GroupList from './grouplist.component';

const test = addAssertions(tape, {jsxEquals});
const renderer = createRenderer();

test('Grouplist single group', (assert) => {
   renderer.render(<GroupList groupList={["TOOL_GIT_Sample_Group"]}/>);

   const message = 'Single group is rendered correctly.';
   const expected = <td>TOOL_GIT_Sample_Group</td>;
   const actual = renderer.getRenderOutput();

   assert.jsxEquals(actual, expected, message);
   assert.end();
});

test('Grouplist multiple groups', (assert) => {
   renderer.render(<GroupList groupList={["TOOL_GIT_Sample_Group", "TOOL_GIT_Another_Group"]}/>);

   const message = 'Multiple groups are rendered correctly.';
   const expected = <td>TOOL_GIT_Sample_Group, TOOL_GIT_Another_Group</td>;
   const actual = renderer.getRenderOutput();

   assert.jsxEquals(actual, expected, message);
   assert.end();
});

test('Grouplist without groups', (assert) => {
   renderer.render(<GroupList groupList={[]}/>);

   const message = 'No group is rendered correctly.';
   const expected = <td></td>;
   const actual = renderer.getRenderOutput();

   assert.jsxEquals(actual, expected, message);
   assert.end();
});
