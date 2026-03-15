const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { buildRepoCard } = require('./generate-readme.js');
const { groupReposBySection } = require('./generate-readme.js');
const { buildSection } = require('./generate-readme.js');
const { buildReadme } = require('./generate-readme.js');

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

describe('groupReposBySection', () => {
  it('groups repos by topic tag', () => {
    const repos = [
      { name: 'a', topics: ['ai-tooling'], stargazers_count: 10 },
      { name: 'b', topics: ['neovim'], stargazers_count: 5 },
      { name: 'c', topics: ['retro-gaming'], stargazers_count: 3 },
    ];
    const grouped = groupReposBySection(repos);
    assert.equal(grouped['ai-tooling'].length, 1);
    assert.equal(grouped['ai-tooling'][0].name, 'a');
    assert.equal(grouped['retro-gaming'].length, 1);
    assert.equal(grouped['neovim'].length, 1);
  });

  it('sorts each section by stars descending', () => {
    const repos = [
      { name: 'low', topics: ['neovim'], stargazers_count: 2 },
      { name: 'high', topics: ['neovim'], stargazers_count: 50 },
      { name: 'mid', topics: ['neovim'], stargazers_count: 10 },
    ];
    const grouped = groupReposBySection(repos);
    assert.deepEqual(
      grouped['neovim'].map((r) => r.name),
      ['high', 'mid', 'low'],
    );
  });

  it('assigns multi-tag repo to first matching section by priority', () => {
    const repos = [
      { name: 'multi', topics: ['neovim', 'ai-tooling'], stargazers_count: 1 },
    ];
    const grouped = groupReposBySection(repos);
    assert.equal(grouped['ai-tooling'].length, 1);
    assert.equal(grouped['neovim'].length, 0);
  });

  it('excludes repos with no recognized topic', () => {
    const repos = [
      { name: 'untagged', topics: ['random'], stargazers_count: 100 },
      { name: 'notopics', topics: [], stargazers_count: 50 },
    ];
    const grouped = groupReposBySection(repos);
    assert.equal(grouped['ai-tooling'].length, 0);
    assert.equal(grouped['retro-gaming'].length, 0);
    assert.equal(grouped['neovim'].length, 0);
  });
});

describe('buildSection', () => {
  it('renders a section with heading and table', () => {
    const repos = [
      { name: 'repo-a', description: 'Description A.', stargazers_count: 10 },
    ];
    const html = buildSection('My Section', repos);
    assert.ok(html.startsWith('## My Section\n\n<table>'));
    assert.ok(html.endsWith('</table>'));
    assert.ok(html.includes('<tr><td>'));
    assert.ok(html.includes('repo-a'));
  });

  it('returns empty string for empty repos array', () => {
    const html = buildSection('Empty', []);
    assert.equal(html, '');
  });

  it('renders multiple repos as separate rows', () => {
    const repos = [
      { name: 'first', description: 'First.', stargazers_count: 20 },
      { name: 'second', description: 'Second.', stargazers_count: 10 },
    ];
    const html = buildSection('Test', repos);
    const trCount = (html.match(/<tr><td>/g) || []).length;
    assert.equal(trCount, 2);
  });
});

describe('buildReadme', () => {
  it('includes static header and footer', () => {
    const grouped = {
      'ai-tooling': [],
      'retro-gaming': [],
      'neovim': [],
    };
    const readme = buildReadme(grouped);
    assert.ok(readme.includes('capsule-render.vercel.app'));
    assert.ok(readme.includes('skillicons.dev'));
    assert.ok(readme.includes('Currently building'));
    assert.ok(readme.includes('## Stats'));
    assert.ok(readme.includes('streak-stats.demolab.com'));
  });

  it('includes dynamic sections in correct order', () => {
    const grouped = {
      'ai-tooling': [{ name: 'ai-repo', description: 'AI tool.', stargazers_count: 10 }],
      'retro-gaming': [{ name: 'retro-repo', description: 'Retro game.', stargazers_count: 5 }],
      'neovim': [{ name: 'nvim-repo', description: 'Neovim plugin.', stargazers_count: 1 }],
    };
    const readme = buildReadme(grouped);
    const aiPos = readme.indexOf('## AI & Agentic Tooling');
    const retroPos = readme.indexOf('## Retro Gaming');
    const nvimPos = readme.indexOf('## Neovim');
    const statsPos = readme.indexOf('## Stats');
    assert.ok(aiPos < retroPos);
    assert.ok(retroPos < nvimPos);
    assert.ok(nvimPos < statsPos);
  });

  it('omits empty sections', () => {
    const grouped = {
      'ai-tooling': [{ name: 'ai-repo', description: 'AI.', stargazers_count: 1 }],
      'retro-gaming': [],
      'neovim': [],
    };
    const readme = buildReadme(grouped);
    assert.ok(readme.includes('## AI & Agentic Tooling'));
    assert.ok(!readme.includes('## Retro Gaming'));
    assert.ok(!readme.includes('## Neovim'));
  });

  it('ends with a trailing newline', () => {
    const grouped = { 'ai-tooling': [], 'retro-gaming': [], 'neovim': [] };
    const readme = buildReadme(grouped);
    assert.ok(readme.endsWith('\n'));
  });
});
