const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { buildRepoCard } = require('./generate-readme.js');

describe('buildRepoCard', () => {
  it('renders a card with description', () => {
    const repo = {
      name: 'my-repo',
      description: 'A cool project for doing things.',
    };
    const html = buildRepoCard(repo);
    assert.ok(html.startsWith('<tr><td>'));
    assert.ok(html.endsWith('</td></tr>'));
    assert.ok(html.includes('img.shields.io/github/stars/josstei/my-repo'));
    assert.ok(html.includes('<strong><a href="https://github.com/josstei/my-repo">my-repo</a></strong>'));
    assert.ok(html.includes('<br/>A cool project for doing things.'));
  });

  it('renders a card without description', () => {
    const repo = { name: 'no-desc', description: null };
    const html = buildRepoCard(repo);
    assert.ok(html.includes('no-desc'));
    assert.ok(!html.includes('<br/>'));
  });

  it('includes the gold star badge with correct parameters', () => {
    const repo = { name: 'test-repo', description: 'desc' };
    const html = buildRepoCard(repo);
    assert.ok(html.includes('style=flat-square'));
    assert.ok(html.includes('label=stars'));
    assert.ok(html.includes('color=0E1830'));
    assert.ok(html.includes('labelColor=050A14'));
    assert.ok(html.includes('logo=data:image/svg%2Bxml;base64,'));
  });
});
