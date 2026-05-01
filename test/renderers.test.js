const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const {
  buildReadme,
  escapeHtml,
  renderFeaturedLine,
  renderRepoCard,
  renderSection,
  renderStarBadgeHtml,
  renderStarBadgeMarkdown,
} = require('../src/renderers.js');

const LIVE_STAR_LOOKUP_PATH = '/github' + '/stars/';

function featuredRepo(overrides = {}) {
  return {
    name: 'maestro-orchestrate',
    stargazers_count: 388,
    ...overrides,
  };
}

describe('renderers', () => {
  it('escapes HTML text', () => {
    assert.equal(escapeHtml('Uses <script> & "quotes"'), 'Uses &lt;script&gt; &amp; &quot;quotes&quot;');
  });

  it('renders a repo card with a static star badge and description', () => {
    const html = renderRepoCard({
      description: 'A cool project for doing things.',
      name: 'my-repo',
      stargazers_count: 12,
    });

    assert.ok(html.startsWith('<tr><td>'));
    assert.ok(html.endsWith('</td></tr>'));
    assert.ok(html.includes('https://img.shields.io/badge/stars-12-0E1830?'));
    assert.ok(html.includes('&amp;labelColor=050A14&amp;logo='));
    assert.ok(!html.includes(LIVE_STAR_LOOKUP_PATH));
    assert.ok(html.includes('<strong><a href="https://github.com/josstei/my-repo">my-repo</a></strong>'));
    assert.ok(html.includes('<br/>A cool project for doing things.'));
  });

  it('renders HTML and markdown star badges from static badge URLs', () => {
    const html = renderStarBadgeHtml(7);
    const markdown = renderStarBadgeMarkdown(7);

    assert.ok(html.includes('https://img.shields.io/badge/stars-7-0E1830?'));
    assert.ok(html.includes('alt="Stars"'));
    assert.ok(markdown.includes('![Stars](https://img.shields.io/badge/stars-7-0E1830?'));
    assert.ok(!html.includes(LIVE_STAR_LOOKUP_PATH));
    assert.ok(!markdown.includes(LIVE_STAR_LOOKUP_PATH));
  });

  it('renders a repo card without a description', () => {
    const html = renderRepoCard({ name: 'no-desc', description: null, stargazers_count: 0 });

    assert.ok(html.includes('no-desc'));
    assert.ok(!html.includes('<br/>'));
  });

  it('escapes HTML in repo card content', () => {
    const html = renderRepoCard({
      description: 'Uses <script> & "quotes"',
      name: 'test-repo',
      stargazers_count: 1,
    });

    assert.ok(html.includes('&lt;script&gt;'));
    assert.ok(html.includes('&amp;'));
    assert.ok(html.includes('&quot;quotes&quot;'));
    assert.ok(!html.includes('<script>'));
  });

  it('renders a featured line from fetched repo data', () => {
    const line = renderFeaturedLine(featuredRepo({ stargazers_count: 401 }));

    assert.ok(line.includes('[maestro-orchestrate](https://github.com/josstei/maestro-orchestrate)'));
    assert.ok(line.includes('https://img.shields.io/badge/stars-401-0E1830?'));
    assert.ok(line.includes('multi-agent orchestration platform'));
    assert.ok(!line.includes(LIVE_STAR_LOOKUP_PATH));
  });

  it('renders a section with table rows', () => {
    const html = renderSection('My Section', [
      { name: 'repo-a', description: 'Description A.', stargazers_count: 10 },
      { name: 'repo-b', description: 'Description B.', stargazers_count: 5 },
    ]);

    assert.ok(html.startsWith('## My Section\n\n<table>'));
    assert.ok(html.endsWith('</table>'));
    assert.equal((html.match(/<tr><td>/g) || []).length, 2);
  });

  it('omits empty sections', () => {
    assert.equal(renderSection('Empty', []), '');
  });

  it('builds the full README with static content, ordered sections, and no live star lookups', () => {
    const readme = buildReadme({
      featuredRepo: featuredRepo(),
      groupedRepos: {
        'ai-tooling': [{ name: 'ai-repo', description: 'AI tool.', stargazers_count: 10 }],
        'retro-gaming': [{ name: 'retro-repo', description: 'Retro game.', stargazers_count: 5 }],
        neovim: [{ name: 'nvim-repo', description: 'Neovim plugin.', stargazers_count: 1 }],
      },
    });

    const aiPos = readme.indexOf('## AI & Agentic Tooling');
    const retroPos = readme.indexOf('## Retro Gaming');
    const nvimPos = readme.indexOf('## Neovim');
    const statsPos = readme.indexOf('## Stats');

    assert.ok(readme.includes('capsule-render.vercel.app'));
    assert.ok(readme.includes('skillicons.dev'));
    assert.ok(readme.includes('Currently building'));
    assert.ok(readme.includes('streak-stats.demolab.com'));
    assert.ok(aiPos < retroPos);
    assert.ok(retroPos < nvimPos);
    assert.ok(nvimPos < statsPos);
    assert.ok(readme.endsWith('\n'));
    assert.ok(!readme.includes(LIVE_STAR_LOOKUP_PATH));
  });

  it('does not render empty dynamic sections into the full README', () => {
    const readme = buildReadme({
      featuredRepo: featuredRepo(),
      groupedRepos: {
        'ai-tooling': [{ name: 'ai-repo', description: 'AI.', stargazers_count: 1 }],
        'retro-gaming': [],
        neovim: [],
      },
    });

    assert.ok(readme.includes('## AI & Agentic Tooling'));
    assert.ok(!readme.includes('## Retro Gaming'));
    assert.ok(!readme.includes('## Neovim'));
  });
});
