const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { buildHeaders, fetchOwnerRepos, parseNextLink } = require('../src/github-client.js');

function response(data, link = null) {
  return {
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: {
      get(name) {
        return name.toLowerCase() === 'link' ? link : null;
      },
    },
    async json() {
      return data;
    },
  };
}

describe('github-client', () => {
  it('builds GitHub API headers with an optional token', () => {
    assert.deepEqual(buildHeaders(), { Accept: 'application/vnd.github+json' });
    assert.deepEqual(buildHeaders('token'), {
      Accept: 'application/vnd.github+json',
      Authorization: 'Bearer token',
    });
  });

  it('parses the next pagination link', () => {
    const link = '<https://api.github.com/users/josstei/repos?page=2>; rel="next", <https://api.github.com/users/josstei/repos?page=3>; rel="last"';
    assert.equal(parseNextLink(link), 'https://api.github.com/users/josstei/repos?page=2');
    assert.equal(parseNextLink(''), null);
  });

  it('fetches paginated owner repositories', async () => {
    const calls = [];
    const repos = await fetchOwnerRepos({
      fetchImpl: async (url, options) => {
        calls.push({ options, url });
        if (calls.length === 1) {
          return response([{ name: 'first' }], '<https://api.github.com/users/josstei/repos?page=2>; rel="next"');
        }
        return response([{ name: 'second' }]);
      },
      owner: 'josstei',
      token: 'secret',
    });

    assert.deepEqual(repos.map((repo) => repo.name), ['first', 'second']);
    assert.equal(calls.length, 2);
    assert.equal(calls[0].options.headers.Authorization, 'Bearer secret');
    assert.ok(calls[0].url.includes('type=owner'));
    assert.ok(calls[0].url.includes('visibility=public'));
    assert.ok(calls[0].url.includes('per_page=100'));
  });

  it('raises a clear error on GitHub API failures', async () => {
    await assert.rejects(
      fetchOwnerRepos({
        fetchImpl: async () => ({
          ok: false,
          status: 500,
          statusText: 'Server Error',
        }),
        owner: 'josstei',
      }),
      /GitHub API error while fetching josstei repositories: 500 Server Error/,
    );
  });
});
