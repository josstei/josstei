const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { main } = require('./generate-readme.js');

describe('generate-readme entrypoint', () => {
  it('keeps the root CLI wrapper callable', () => {
    assert.equal(typeof main, 'function');
  });
});
