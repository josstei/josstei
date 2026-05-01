const { FEATURED_REPO_NAME, OWNER, PROFILE_COPY, SECTIONS } = require('./config.js');
const { fetchOwnerRepos } = require('./github-client.js');
const { groupReposBySection } = require('./repo-sections.js');
const { buildReadme } = require('./renderers.js');

function findFeaturedRepo(repos, featuredRepoName = FEATURED_REPO_NAME) {
  const featuredRepo = repos.find((repo) => repo.name === featuredRepoName);

  if (!featuredRepo) {
    throw new Error(`Featured repository "${featuredRepoName}" was not found in fetched repositories.`);
  }

  return featuredRepo;
}

async function generateReadme(options = {}) {
  const {
    featuredRepoName = FEATURED_REPO_NAME,
    fetchRepos = fetchOwnerRepos,
    owner = OWNER,
    profileCopy = PROFILE_COPY,
    sections = SECTIONS,
    token,
  } = options;

  const repos = await fetchRepos({ owner, token });
  const featuredRepo = findFeaturedRepo(repos, featuredRepoName);
  const groupedRepos = groupReposBySection(repos, sections);

  return buildReadme({
    featuredRepo,
    groupedRepos,
    owner,
    profileCopy,
    sections,
  });
}

module.exports = {
  findFeaturedRepo,
  generateReadme,
};
