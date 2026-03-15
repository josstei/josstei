const STAR_BADGE_LOGO =
  'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0Q0QTY1NiI+PHBhdGggZD0iTTEyIDJsMy4wOSA2LjI2TDIyIDkuMjdsLTUgNC44NyAxLjE4IDYuODhMMTIgMTcuNzdsLTYuMTggMy4yNUw3IDE0LjE0IDIgOS4yN2w2LjkxLTEuMDFMMTIgMnoiLz48L3N2Zz4=';

const SECTION_MAP = [
  { tag: 'ai-tooling', title: 'AI & Agentic Tooling' },
  { tag: 'retro-gaming', title: 'Retro Gaming' },
  { tag: 'neovim', title: 'Neovim' },
];

function buildRepoCard(repo) {
  const badge = `  <img src="https://img.shields.io/github/stars/josstei/${repo.name}?style=flat-square&label=stars&color=0E1830&labelColor=050A14&logo=data:image/svg%2Bxml;base64,${STAR_BADGE_LOGO}" alt="Stars" />&nbsp;`;
  const link = `  <strong><a href="https://github.com/josstei/${repo.name}">${repo.name}</a></strong>`;
  const lines = ['<tr><td>', badge, link];
  if (repo.description) {
    lines.push(`  <br/>${repo.description}`);
  }
  lines.push('</td></tr>');
  return lines.join('\n');
}

function groupReposBySection(repos) {
  const grouped = {};
  for (const section of SECTION_MAP) {
    grouped[section.tag] = [];
  }
  for (const repo of repos) {
    for (const section of SECTION_MAP) {
      if (repo.topics && repo.topics.includes(section.tag)) {
        grouped[section.tag].push(repo);
        break;
      }
    }
  }
  for (const tag of Object.keys(grouped)) {
    grouped[tag].sort((a, b) => b.stargazers_count - a.stargazers_count);
  }
  return grouped;
}

function buildSection(title, repos) {
  if (repos.length === 0) return '';
  const rows = repos.map(buildRepoCard).join('\n');
  return `## ${title}\n\n<table>\n${rows}\n</table>`;
}

module.exports = { buildRepoCard, buildSection, groupReposBySection, SECTION_MAP, STAR_BADGE_LOGO };
