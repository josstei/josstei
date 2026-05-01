const { SECTIONS } = require('./config.js');

function createEmptyGroups(sections = SECTIONS) {
  return Object.fromEntries(sections.map((section) => [section.tag, []]));
}

function getStarCount(repo) {
  return Number.isInteger(repo.stargazers_count) ? repo.stargazers_count : 0;
}

function compareReposByStarsThenName(a, b) {
  const starDifference = getStarCount(b) - getStarCount(a);
  if (starDifference !== 0) return starDifference;
  return String(a.name).localeCompare(String(b.name));
}

function groupReposBySection(repos, sections = SECTIONS) {
  const grouped = createEmptyGroups(sections);

  for (const repo of repos) {
    const topics = Array.isArray(repo.topics) ? repo.topics : [];
    const section = sections.find((candidate) => topics.includes(candidate.tag));
    if (section) {
      grouped[section.tag].push(repo);
    }
  }

  for (const tag of Object.keys(grouped)) {
    grouped[tag].sort(compareReposByStarsThenName);
  }

  return grouped;
}

module.exports = {
  compareReposByStarsThenName,
  createEmptyGroups,
  getStarCount,
  groupReposBySection,
};
