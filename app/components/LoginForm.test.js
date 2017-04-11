import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';
import React from 'react';
import { createRenderer } from 'react-addons-test-utils';

import LoginForm from './LoginForm';
import ApiError from './ApiError';

const test = addAssertions(tape, { jsxEquals });
const renderer = createRenderer();

const LoginJsx =
  <div>
    <div className="row">
      <div className="col-sm-4"></div>
      <div className="col-sm-4">
        <form onSubmit={event => event}>
          <div className="form-group">
            <label htmlFor="server">Git server:</label>
            <input ref={input => input}
              type="url"
              id="server"
              defaultValue="https://git.mycompany.com"
              className="form-control"
              required>
            </input>
          </div>
          <div className="form-group">
            <label htmlFor="user">User name:</label>
            <input ref={input => input}
              type="text"
              id="user"
              className="form-control"
              required>
            </input>
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input ref={input => input}
              type="password"
              id="pwd"
              className="form-control"
              required>
            </input>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      <div className="col-sm-4"></div>
    </div>
    <div className="row">
      <div className="col-sm-4"></div>
      <div className="col-sm-4">
        <ApiError />
      </div>
      <div className="col-sm-4"></div>
    </div>
  </div>;

test('LoginForm - without props', (assert) => {
  renderer.render(<LoginForm />);

  const message = 'LoginForm without props is rendered correctly.';
  const expected = LoginJsx;
  const actual = renderer.getRenderOutput();

  assert.jsxEquals(actual, expected, message);
  assert.end();
});

test('LoginForm - when authenticated', (assert) => {
  renderer.render(<LoginForm authenticated={true} />);

  const message = 'LoginForm when authenticated is rendered correctly.';
  const expected = <div></div>;
  const actual = renderer.getRenderOutput();

  assert.jsxEquals(actual, expected, message);
  assert.end();
});
