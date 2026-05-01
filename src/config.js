const OWNER = 'josstei';
const FEATURED_REPO_NAME = 'maestro-orchestrate';

const STAR_BADGE_LOGO =
  'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0Q0QTY1NiI+PHBhdGggZD0iTTEyIDJsMy4wOSA2LjI2TDIyIDkuMjdsLTUgNC44NyAxLjE4IDYuODhMMTIgMTcuNzdsLTYuMTggMy4yNUw3IDE0LjE0IDIgOS4yN2w2LjkxLTEuMDFMMTIgMnoiLz48L3N2Zz4=';

const BADGE_THEME = {
  baseUrl: 'https://img.shields.io/badge',
  color: '0E1830',
  labelColor: '050A14',
  logo: `data:image/svg+xml;base64,${STAR_BADGE_LOGO}`,
  style: 'flat-square',
};

const SECTIONS = [
  { tag: 'ai-tooling', title: 'AI & Agentic Tooling' },
  { tag: 'retro-gaming', title: 'Retro Gaming' },
  { tag: 'neovim', title: 'Neovim' },
];

const PROFILE_COPY = {
  headerMedia: `<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=waving&color=0:050A14%2C50:5E81F4%2C100:7C3AED&height=200&text=I'm%20Josstei&fontSize=50&fontColor=C8C8E0&fontAlignY=35&animation=fadeIn" />
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:ffffff%2C50:5E81F4%2C100:7C3AED&height=200&text=I'm%20Josstei&fontSize=50&fontColor=050A14&fontAlignY=35&animation=fadeIn" width="100%" alt="Header" />
</picture>`,
  skills: `<p align="center">
  <img src="https://skillicons.dev/icons?i=lua,js,ts,java,react,spring,maven,mysql&theme=dark&perline=8" width="410" alt="Tech Stack Row 1" /><br/>
  <img src="https://skillicons.dev/icons?i=neovim,vim,electron,astro,nodejs,git,github&theme=dark&perline=7" width="360" alt="Tech Stack Row 2" />
</p>`,
  socials: `<p align="center">
  <a href="https://x.com/josstei_dev"><img src="https://img.shields.io/badge/-josstei__dev-050A14?style=flat-square&logo=x&logoColor=C8C8E0&labelColor=050A14&color=0E1830" alt="Twitter" /></a>
  <a href="https://www.reddit.com/user/josstei/"><img src="https://img.shields.io/badge/reddit-u/josstei-050A14?style=flat-square&logo=reddit&logoColor=ff4500&labelColor=050A14&color=0E1830" alt="Reddit" /></a>
  <a href="https://ko-fi.com/josstei"><img src="https://img.shields.io/badge/ko--fi-josstei-050A14?style=flat-square&logo=ko-fi&logoColor=ff5e5b&labelColor=050A14&color=0E1830" alt="Ko-fi" /></a>
</p>`,
  intro:
    'I love building applications and tooling that others can enjoy and use — from multi-agent platforms to retro gaming apps to Neovim plugins. I believe software should just work, and that clean, structured design is how you get there: performance, maintainability, and scalability by default.',
  featuredSummary:
    'a multi-agent orchestration platform for Gemini CLI, Claude Code, Codex, and Qwen Code with 39 specialists, parallel subagents, persistent sessions, and built-in code review, debugging, security, SEO, accessibility, and compliance tools.',
  footer: `## Stats

<p align="center">
  <img src="https://streak-stats.demolab.com/?user=josstei&background=00000000&border=0E1830&stroke=0E1830&ring=5E81F4&fire=5E81F4&currStreakNum=56B6C2&sideNums=5E81F4&currStreakLabel=C8C8E0&sideLabels=A8A8C8&dates=4A4A70&hide_border=false" alt="GitHub Streak" height="170" />
</p>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=waving&color=0:050A14%2C50:5E81F4%2C100:7C3AED&height=120&section=footer&reversal=true" />
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:ffffff%2C50:5E81F4%2C100:7C3AED&height=120&section=footer&reversal=true" width="100%" alt="Footer" />
</picture>`,
};

module.exports = {
  BADGE_THEME,
  FEATURED_REPO_NAME,
  OWNER,
  PROFILE_COPY,
  SECTIONS,
  STAR_BADGE_LOGO,
};
