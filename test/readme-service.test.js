const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { findFeaturedRepo, generateReadme } = require('../src/readme-service.js');

const LIVE_STAR_LOOKUP_PATH = '/github' + '/stars/';

function repo(overrides) {
  return {
    description: null,
    name: 'repo',
    stargazers_count: 0,
    topics: [],
    ...overrides,
  };
}

describe('readme-service', () => {
  it('finds the required featured repo by name', () => {
    const repos = [repo({ name: 'other' }), repo({ name: 'maestro-orchestrate' })];
    assert.equal(findFeaturedRepo(repos).name, 'maestro-orchestrate');
  });

  it('fails clearly when the required featured repo is missing', () => {
    assert.throws(
      () => findFeaturedRepo([repo({ name: 'other' })]),
      /Featured repository "maestro-orchestrate" was not found/,
    );
  });

  it('orchestrates fetching, grouping, featured validation, and rendering', async () => {
    const fetchCalls = [];
    const readme = await generateReadme({
      fetchRepos: async (options) => {
        fetchCalls.push(options);
        return [
          repo({ name: 'maestro-orchestrate', stargazers_count: 388 }),
          repo({ name: 'tool', topics: ['ai-tooling'], stargazers_count: 4, description: 'Tool.' }),
          repo({ name: 'theme', topics: ['neovim'], stargazers_count: 9, description: 'Theme.' }),
        ];
      },
      token: 'secret',
    });

    assert.equal(fetchCalls.length, 1);
    assert.equal(fetchCalls[0].owner, 'josstei');
    assert.equal(fetchCalls[0].token, 'secret');
    assert.ok(readme.includes('https://img.shields.io/badge/stars-388-0E1830?'));
    assert.ok(readme.includes('## AI & Agentic Tooling'));
    assert.ok(readme.includes('## Neovim'));
    assert.ok(!readme.includes(LIVE_STAR_LOOKUP_PATH));
  });

  it('fails generation when fetched data does not include the featured repo', async () => {
    await assert.rejects(
      generateReadme({
        fetchRepos: async () => [repo({ name: 'other' })],
      }),
      /Featured repository "maestro-orchestrate" was not found/,
    );
  });
});
