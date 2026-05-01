const { buildStarBadgeUrl } = require('./badges.js');
const { OWNER, PROFILE_COPY, SECTIONS } = require('./config.js');

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildGitHubRepoUrl(owner, repoName) {
  return `https://github.com/${encodeURIComponent(owner)}/${encodeURIComponent(repoName)}`;
}

function renderStarBadgeHtml(starCount) {
  return `<img src="${escapeHtml(buildStarBadgeUrl(starCount))}" alt="Stars" />`;
}

function renderStarBadgeMarkdown(starCount) {
  return `![Stars](${buildStarBadgeUrl(starCount)})`;
}

function renderRepoCard(repo, options = {}) {
  const owner = options.owner || OWNER;
  const name = escapeHtml(repo.name);
  const repoUrl = escapeHtml(buildGitHubRepoUrl(owner, repo.name));
  const badge = `  ${renderStarBadgeHtml(repo.stargazers_count)}&nbsp;`;
  const link = `  <strong><a href="${repoUrl}">${name}</a></strong>`;
  const lines = ['<tr><td>', badge, link];

  if (repo.description) {
    lines.push(`  <br/>${escapeHtml(repo.description)}`);
  }

  lines.push('</td></tr>');
  return lines.join('\n');
}

function renderSection(title, repos, options = {}) {
  if (repos.length === 0) return '';

  const rows = repos.map((repo) => renderRepoCard(repo, options)).join('\n');
  return `## ${title}\n\n<table>\n${rows}\n</table>`;
}

function renderFeaturedLine(featuredRepo, options = {}) {
  const owner = options.owner || OWNER;
  const profileCopy = options.profileCopy || PROFILE_COPY;
  const repoUrl = buildGitHubRepoUrl(owner, featuredRepo.name);

  return `🔨 Currently building [${featuredRepo.name}](${repoUrl}) ${renderStarBadgeMarkdown(featuredRepo.stargazers_count)} — ${profileCopy.featuredSummary}`;
}

function renderHeader(featuredRepo, options = {}) {
  const profileCopy = options.profileCopy || PROFILE_COPY;
  const profileMedia = [
    profileCopy.headerMedia,
    profileCopy.skills,
    profileCopy.socials,
  ].join('\n');

  return [
    profileMedia,
    profileCopy.intro,
    renderFeaturedLine(featuredRepo, options),
  ].join('\n\n');
}

function renderFooter(options = {}) {
  const profileCopy = options.profileCopy || PROFILE_COPY;
  return profileCopy.footer;
}

function buildReadme(options = {}) {
  const {
    featuredRepo,
    groupedRepos,
    owner = OWNER,
    profileCopy = PROFILE_COPY,
    sections = SECTIONS,
  } = options;

  if (!featuredRepo) {
    throw new Error('A featured repository is required to render the README.');
  }

  const parts = [renderHeader(featuredRepo, { owner, profileCopy })];

  for (const { tag, title } of sections) {
    const section = renderSection(title, groupedRepos[tag] || [], { owner });
    if (section) parts.push(section);
  }

  parts.push(renderFooter({ profileCopy }));
  return parts.join('\n\n') + '\n';
}

module.exports = {
  buildGitHubRepoUrl,
  buildReadme,
  escapeHtml,
  renderFeaturedLine,
  renderFooter,
  renderHeader,
  renderRepoCard,
  renderSection,
  renderStarBadgeHtml,
  renderStarBadgeMarkdown,
};
