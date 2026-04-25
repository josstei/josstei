const STAR_BADGE_LOGO =
  'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0Q0QTY1NiI+PHBhdGggZD0iTTEyIDJsMy4wOSA2LjI2TDIyIDkuMjdsLTUgNC44NyAxLjE4IDYuODhMMTIgMTcuNzdsLTYuMTggMy4yNUw3IDE0LjE0IDIgOS4yN2w2LjkxLTEuMDFMMTIgMnoiLz48L3N2Zz4=';

const SECTION_MAP = [
  { tag: 'ai-tooling', title: 'AI & Agentic Tooling' },
  { tag: 'retro-gaming', title: 'Retro Gaming' },
  { tag: 'neovim', title: 'Neovim' },
];

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildRepoCard(repo) {
  const name = escapeHtml(repo.name);
  const badge = `  <img src="https://img.shields.io/github/stars/josstei/${repo.name}?style=flat-square&label=stars&color=0E1830&labelColor=050A14&logo=data:image/svg%2Bxml;base64,${STAR_BADGE_LOGO}" alt="Stars" />&nbsp;`;
  const link = `  <strong><a href="https://github.com/josstei/${repo.name}">${name}</a></strong>`;
  const lines = ['<tr><td>', badge, link];
  if (repo.description) {
    lines.push(`  <br/>${escapeHtml(repo.description)}`);
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

const STATIC_HEADER = `<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=waving&color=0:050A14%2C50:5E81F4%2C100:7C3AED&height=200&text=I'm%20Josstei&fontSize=50&fontColor=C8C8E0&fontAlignY=35&animation=fadeIn" />
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:ffffff%2C50:5E81F4%2C100:7C3AED&height=200&text=I'm%20Josstei&fontSize=50&fontColor=050A14&fontAlignY=35&animation=fadeIn" width="100%" alt="Header" />
</picture>
<p align="center">
  <img src="https://skillicons.dev/icons?i=lua,js,ts,java,react,spring,maven,mysql&theme=dark&perline=8" width="410" alt="Tech Stack Row 1" /><br/>
  <img src="https://skillicons.dev/icons?i=neovim,vim,electron,astro,nodejs,git,github&theme=dark&perline=7" width="360" alt="Tech Stack Row 2" />
</p>
<p align="center">
  <a href="https://x.com/josstei_dev"><img src="https://img.shields.io/badge/-josstei__dev-050A14?style=flat-square&logo=x&logoColor=C8C8E0&labelColor=050A14&color=0E1830" alt="Twitter" /></a>
  <a href="https://www.reddit.com/user/josstei/"><img src="https://img.shields.io/badge/reddit-u/josstei-050A14?style=flat-square&logo=reddit&logoColor=ff4500&labelColor=050A14&color=0E1830" alt="Reddit" /></a>
  <a href="https://ko-fi.com/josstei"><img src="https://img.shields.io/badge/ko--fi-josstei-050A14?style=flat-square&logo=ko-fi&logoColor=ff5e5b&labelColor=050A14&color=0E1830" alt="Ko-fi" /></a>
</p>

I love building applications and tooling that others can enjoy and use — from multi-agent platforms to retro gaming apps to Neovim plugins. I believe software should just work, and that clean, structured design is how you get there: performance, maintainability, and scalability by default.

🔨 Currently building [maestro-orchestrate](https://github.com/josstei/maestro-orchestrate) ![Stars](https://img.shields.io/github/stars/josstei/maestro-orchestrate?style=flat-square&label=stars&color=0E1830&labelColor=050A14&logo=data:image/svg%2Bxml;base64,${STAR_BADGE_LOGO}) — a multi-agent orchestration platform for Gemini CLI, Claude Code, Codex, and Qwen Code with 39 specialists, parallel subagents, persistent sessions, and built-in code review, debugging, security, SEO, accessibility, and compliance tools.`;

const STATIC_FOOTER = `## Stats

<p align="center">
  <img src="https://streak-stats.demolab.com/?user=josstei&background=00000000&border=0E1830&stroke=0E1830&ring=5E81F4&fire=5E81F4&currStreakNum=56B6C2&sideNums=5E81F4&currStreakLabel=C8C8E0&sideLabels=A8A8C8&dates=4A4A70&hide_border=false" alt="GitHub Streak" height="170" />
</p>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=waving&color=0:050A14%2C50:5E81F4%2C100:7C3AED&height=120&section=footer&reversal=true" />
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:ffffff%2C50:5E81F4%2C100:7C3AED&height=120&section=footer&reversal=true" width="100%" alt="Footer" />
</picture>`;

function buildReadme(groupedRepos) {
  const parts = [STATIC_HEADER];
  for (const { tag, title } of SECTION_MAP) {
    const section = buildSection(title, groupedRepos[tag] || []);
    if (section) parts.push(section);
  }
  parts.push(STATIC_FOOTER);
  return parts.join('\n\n') + '\n';
}

async function fetchRepos() {
  const repos = [];
  let url = 'https://api.github.com/users/josstei/repos?type=owner&visibility=public&per_page=100';
  while (url) {
    const res = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
    });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const data = await res.json();
    repos.push(...data);
    const link = res.headers.get('link') || '';
    const next = link.match(/<([^>]+)>;\s*rel="next"/);
    url = next ? next[1] : null;
  }
  return repos;
}

module.exports = { buildRepoCard, buildSection, buildReadme, groupReposBySection, escapeHtml, SECTION_MAP, STAR_BADGE_LOGO };

if (require.main === module) {
  (async () => {
    const repos = await fetchRepos();
    const grouped = groupReposBySection(repos);
    const readme = buildReadme(grouped);
    require('node:fs').writeFileSync('README.md', readme);
    console.log('README.md generated.');
  })().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
