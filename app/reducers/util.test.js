import tape from 'tape';
import { tokenIsValid, tokensAreValid } from './util';

const test = tape;

test('util - tokenIsValid - exact match', (assert) => {
  assert.equal(tokenIsValid('Hello', 'Hello'), true);
  assert.end();
});

test('util - tokenIsValid - case insensitive match', (assert) => {
  assert.equal(tokenIsValid('HelloThere', 'hellothere'), true);
  assert.end();
});

test('util - tokenIsValid - pound wildcard match', (assert) => {
  assert.equal(tokenIsValid('Hello#', 'HelloThere'), true);
  assert.end();
});

test('util - tokenIsValid - star wildcard match', (assert) => {
  assert.equal(tokenIsValid('Hello*', 'HelloThere'), true);
  assert.end();
});

test('util - tokenIsValid - percent to forward slash match', (assert) => {
  assert.equal(tokenIsValid('Hello%There', 'Hello/There'), true);
  assert.end();
});

test('util - tokenIsValid - single star match', (assert) => {
  assert.equal(tokenIsValid('*', '*'), true);
  assert.end();
});

test('util - tokenIsValid - double star match', (assert) => {
  assert.equal(tokenIsValid('**', '**'), true);
  assert.end();
});

test('util - tokenIsValid - single pound match', (assert) => {
  assert.equal(tokenIsValid('#', '*'), true);
  assert.end();
});

test('util - tokenIsValid - double pound match', (assert) => {
  assert.equal(tokenIsValid('##', '**'), true);
  assert.end();
});

test('util - tokenIsValid - ^ to underscore match', (assert) => {
  assert.equal(tokenIsValid('hello^there', 'hello_there'), true);
  assert.end();
});

test('util - tokenIsValid - ^ to ^ match', (assert) => {
  assert.equal(tokenIsValid('hello^there', 'hello^there'), true);
  assert.end();
});

test('util - tokenIsValid - forward slashes match', (assert) => {
  assert.equal(tokenIsValid('hello/there', 'hello/there'), true);
  assert.end();
});

test('util - tokenIsValid - no match', (assert) => {
  assert.equal(tokenIsValid('my hello there', 'my hello'), false);
  assert.end();
});

test('util - tokenIsValid - no match for ', (assert) => {
  assert.equal(tokenIsValid('my hello there', 'hello there'), false);
  assert.end();
});

test('util - tokenIsValid - & matches', (assert) => {
  assert.equal(tokenIsValid('this & that', 'this & that'), true);
  assert.end();
});

test('util - tokenIsValid - + matches', (assert) => {
  assert.equal(tokenIsValid('this+that', 'this+that'), true);
  assert.end();
});

test('util - tokenIsValid - ? matches', (assert) => {
  assert.equal(tokenIsValid('this ? that', 'this ? that'), true);
  assert.end();
});

test('util - tokenIsValid - brackets match', (assert) => {
  assert.equal(tokenIsValid('this(that)', 'this(that)'), true);
  assert.end();
});

test('util - tokensAreValid - exact match', (assert) => {
  assert.equal(tokensAreValid(['this', 'that', 'other'], ['this', 'that', 'other']), true);
  assert.end();
});

test('util - tokensAreValid - too many tokens', (assert) => {
  assert.equal(tokensAreValid(['this', 'that', 'other'], ['this', 'that']), false);
  assert.end();
});

test('util - tokensAreValid - too few tokens', (assert) => {
  assert.equal(tokensAreValid(['this', 'that'], ['this', 'that', 'other']), false);
  assert.end();
});

test('util - tokensAreValid - star in expected', (assert) => {
  assert.equal(tokensAreValid(['this', 'that'], ['this', '*']), false);
  assert.end();
});

test('util - tokensAreValid - double star in token', (assert) => {
  assert.equal(tokensAreValid(['this', '**'], ['this', 'that']), false);
  assert.end();
});

test('util - tokensAreValid - stars in token', (assert) => {
  assert.equal(tokensAreValid(['this', 'release/*/*'], ['this', 'that']), false);
  assert.end();
});
