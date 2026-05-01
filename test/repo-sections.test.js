const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { groupReposBySection } = require('../src/repo-sections.js');

describe('repo-sections', () => {
  it('groups repos by configured topic tag', () => {
    const repos = [
      { name: 'a', topics: ['ai-tooling'], stargazers_count: 10 },
      { name: 'b', topics: ['neovim'], stargazers_count: 5 },
      { name: 'c', topics: ['retro-gaming'], stargazers_count: 3 },
    ];

    const grouped = groupReposBySection(repos);

    assert.equal(grouped['ai-tooling'][0].name, 'a');
    assert.equal(grouped.neovim[0].name, 'b');
    assert.equal(grouped['retro-gaming'][0].name, 'c');
  });

  it('sorts each section by stars descending with a name tie-breaker', () => {
    const repos = [
      { name: 'low', topics: ['neovim'], stargazers_count: 2 },
      { name: 'z-high', topics: ['neovim'], stargazers_count: 50 },
      { name: 'a-high', topics: ['neovim'], stargazers_count: 50 },
      { name: 'mid', topics: ['neovim'], stargazers_count: 10 },
    ];

    const grouped = groupReposBySection(repos);

    assert.deepEqual(
      grouped.neovim.map((repo) => repo.name),
      ['a-high', 'z-high', 'mid', 'low'],
    );
  });

  it('assigns multi-tag repos to the first matching section by priority', () => {
    const repos = [
      { name: 'multi', topics: ['neovim', 'ai-tooling'], stargazers_count: 1 },
    ];

    const grouped = groupReposBySection(repos);

    assert.equal(grouped['ai-tooling'].length, 1);
    assert.equal(grouped.neovim.length, 0);
  });

  it('excludes repos with no recognized topic', () => {
    const repos = [
      { name: 'untagged', topics: ['random'], stargazers_count: 100 },
      { name: 'notopics', topics: [], stargazers_count: 50 },
      { name: 'missing-topics', stargazers_count: 10 },
    ];

    const grouped = groupReposBySection(repos);

    assert.equal(grouped['ai-tooling'].length, 0);
    assert.equal(grouped['retro-gaming'].length, 0);
    assert.equal(grouped.neovim.length, 0);
  });
});
