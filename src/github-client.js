const { OWNER } = require('./config.js');

function buildHeaders(token) {
  return {
    Accept: 'application/vnd.github+json',
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
  };
}

function parseNextLink(linkHeader) {
  const next = String(linkHeader || '').match(/<([^>]+)>;\s*rel="next"/);
  return next ? next[1] : null;
}

async function fetchOwnerRepos(options = {}) {
  const {
    fetchImpl = globalThis.fetch,
    owner = OWNER,
    perPage = 100,
    token,
  } = options;

  if (!owner) {
    throw new Error('GitHub owner is required to fetch repositories.');
  }
  if (typeof fetchImpl !== 'function') {
    throw new Error('A fetch implementation is required to fetch repositories.');
  }

  const repos = [];
  let url = new URL(`https://api.github.com/users/${encodeURIComponent(owner)}/repos`);
  url.searchParams.set('type', 'owner');
  url.searchParams.set('visibility', 'public');
  url.searchParams.set('per_page', String(perPage));

  while (url) {
    const res = await fetchImpl(url.toString(), {
      headers: buildHeaders(token),
    });

    if (!res.ok) {
      throw new Error(`GitHub API error while fetching ${owner} repositories: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
      throw new Error('GitHub API returned an unexpected repository payload.');
    }

    repos.push(...data);
    const nextUrl = parseNextLink(res.headers.get('link'));
    url = nextUrl ? new URL(nextUrl) : null;
  }

  return repos;
}

module.exports = {
  buildHeaders,
  fetchOwnerRepos,
  parseNextLink,
};
