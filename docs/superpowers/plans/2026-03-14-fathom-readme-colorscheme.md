# Fathom README Color Scheme Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Nami (teal/coral) colors in the GitHub profile README with the Fathom palette (blue/purple/cyan), adding light/dark theme support via `<picture>` tags.

**Architecture:** Single-file edit (README.md). Theme-adaptive elements use GitHub's `<picture>` + `<source media="(prefers-color-scheme: dark)">` pattern with the `<img>` fallback serving the light variant. Non-adaptive elements (social badges, streak stats) use Fathom colors directly.

**Tech Stack:** GitHub Flavored Markdown, capsule-render, shields.io, streak-stats.demolab.com

**Spec:** `docs/superpowers/specs/2026-03-14-fathom-readme-colorscheme-design.md`

---

## Chunk 1: All Tasks

### Task 1: Header Banner

**Files:**
- Modify: `README.md:1`

- [ ] **Step 1: Replace header with `<picture>` tag**

Replace line 1 with:

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=waving&color=0:050A14,50:5E81F4,100:7C3AED&height=200&text=I'm%20Josstei&fontSize=50&fontColor=C8C8E0&fontAlignY=35&desc=@josstei_dev&descSize=16&descColor=A8A8C8&descAlignY=55&animation=fadeIn" />
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:ffffff,50:5E81F4,100:7C3AED&height=200&text=I'm%20Josstei&fontSize=50&fontColor=050A14&fontAlignY=35&desc=@josstei_dev&descSize=16&descColor=0E1830&descAlignY=55&animation=fadeIn" width="100%" alt="Header" />
</picture>
```

### Task 2: Social Badges

**Files:**
- Modify: `README.md:7-9`

- [ ] **Step 2: Update social badge colors**

Replace the three social badge lines with Fathom colors. Keep brand `logoColor` values; swap background colors from `041220`/`0e2840` to `050A14`/`0E1830`:

```html
  <a href="https://x.com/josstei_dev"><img src="https://img.shields.io/badge/𝕏-josstei__dev-050A14?style=flat-square&logo=x&logoColor=C8C8E0&labelColor=050A14&color=0E1830" alt="Twitter" /></a>
  <a href="https://www.reddit.com/user/josstei/"><img src="https://img.shields.io/badge/reddit-u/josstei-050A14?style=flat-square&logo=reddit&logoColor=ff4500&labelColor=050A14&color=0E1830" alt="Reddit" /></a>
  <a href="https://ko-fi.com/josstei"><img src="https://img.shields.io/badge/ko--fi-josstei-050A14?style=flat-square&logo=ko-fi&logoColor=ff5e5b&labelColor=050A14&color=0E1830" alt="Ko-fi" /></a>
```

### Task 3: Star Badges — AI & Agentic Tooling

**Files:**
- Modify: `README.md:24,28`

- [ ] **Step 3: Replace heading-level star badges with `<picture>` tags**

Replace lines 24 and 28. These are `###` heading-level badges — the `<picture>` tag goes inline in the heading.

Line 24 becomes:
```markdown
### <picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/stars/josstei/maestro-gemini?style=flat-square&color=0E1830&labelColor=050A14" /><img src="https://img.shields.io/github/stars/josstei/maestro-gemini?style=flat-square&color=f0f2f8&labelColor=e8eaf0" alt="Stars" /></picture> [maestro-gemini](https://github.com/josstei/maestro-gemini)
```

Line 28 becomes:
```markdown
### <picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/stars/josstei/argus-claude?style=flat-square&color=0E1830&labelColor=050A14" /><img src="https://img.shields.io/github/stars/josstei/argus-claude?style=flat-square&color=f0f2f8&labelColor=e8eaf0" alt="Stars" /></picture> [argus-claude](https://github.com/josstei/argus-claude)
```

### Task 4: Star Badge — Retro Gaming

**Files:**
- Modify: `README.md:36`

- [ ] **Step 4: Replace prismgb-app star badge**

Line 36 becomes:
```markdown
### <picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/stars/josstei/prismgb-app?style=flat-square&color=0E1830&labelColor=050A14" /><img src="https://img.shields.io/github/stars/josstei/prismgb-app?style=flat-square&color=f0f2f8&labelColor=e8eaf0" alt="Stars" /></picture> [prismgb-app](https://github.com/josstei/prismgb-app)
```

### Task 5: Star Badges — Neovim Colorschemes

**Files:**
- Modify: `README.md:46,50,54`

- [ ] **Step 5: Replace paragraph-level colorscheme star badges**

These use `![Stars](URL) **[repo](link)**` pattern (not headings). Replace each.

Line 46 becomes:
```markdown
<picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/stars/josstei/nami.nvim?style=flat-square&color=0E1830&labelColor=050A14" /><img src="https://img.shields.io/github/stars/josstei/nami.nvim?style=flat-square&color=f0f2f8&labelColor=e8eaf0" alt="Stars" /></picture> **[nami.nvim](https://github.com/josstei/nami.nvim)**
```

Line 50 becomes:
```markdown
<picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/stars/josstei/fathom.nvim?style=flat-square&color=0E1830&labelColor=050A14" /><img src="https://img.shields.io/github/stars/josstei/fathom.nvim?style=flat-square&color=f0f2f8&labelColor=e8eaf0" alt="Stars" /></picture> **[fathom.nvim](https://github.com/josstei/fathom.nvim)**
```

Line 54 becomes:
```markdown
<picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/stars/josstei/voidpulse.nvim?style=flat-square&color=0E1830&labelColor=050A14" /><img src="https://img.shields.io/github/stars/josstei/voidpulse.nvim?style=flat-square&color=f0f2f8&labelColor=e8eaf0" alt="Stars" /></picture> **[voidpulse.nvim](https://github.com/josstei/voidpulse.nvim)**
```

### Task 6: Star Badges — Neovim Plugins

**Files:**
- Modify: `README.md:60,64,68`

- [ ] **Step 6: Replace paragraph-level plugin star badges**

Line 60 becomes:
```markdown
<picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/stars/josstei/whisk.nvim?style=flat-square&color=0E1830&labelColor=050A14" /><img src="https://img.shields.io/github/stars/josstei/whisk.nvim?style=flat-square&color=f0f2f8&labelColor=e8eaf0" alt="Stars" /></picture> **[whisk.nvim](https://github.com/josstei/whisk.nvim)**
```

Line 64 becomes:
```markdown
<picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/stars/josstei/quill.nvim?style=flat-square&color=0E1830&labelColor=050A14" /><img src="https://img.shields.io/github/stars/josstei/quill.nvim?style=flat-square&color=f0f2f8&labelColor=e8eaf0" alt="Stars" /></picture> **[quill.nvim](https://github.com/josstei/quill.nvim)**
```

Line 68 becomes:
```markdown
<picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/stars/josstei/vim-easyops?style=flat-square&color=0E1830&labelColor=050A14" /><img src="https://img.shields.io/github/stars/josstei/vim-easyops?style=flat-square&color=f0f2f8&labelColor=e8eaf0" alt="Stars" /></picture> **[vim-easyops](https://github.com/josstei/vim-easyops)**
```

### Task 7: Streak Stats Card

**Files:**
- Modify: `README.md:77`

- [ ] **Step 7: Update streak stats colors**

Replace line 77 with Fathom palette colors:

```html
  <img src="https://streak-stats.demolab.com/?user=josstei&background=00000000&border=0E1830&stroke=0E1830&ring=5E81F4&fire=5E81F4&currStreakNum=56B6C2&sideNums=5E81F4&currStreakLabel=C8C8E0&sideLabels=A8A8C8&dates=4A4A70&hide_border=false" alt="GitHub Streak" height="170" />
```

### Task 8: Footer Banner

**Files:**
- Modify: `README.md:82`

- [ ] **Step 8: Replace footer with `<picture>` tag**

Replace line 82 with:

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=waving&color=0:050A14,50:5E81F4,100:7C3AED&height=120&section=footer&reversal=true" />
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:ffffff,50:5E81F4,100:7C3AED&height=120&section=footer&reversal=true" width="100%" alt="Footer" />
</picture>
```

### Task 9: Verify and Commit

- [ ] **Step 9: Review the full README for correctness**

Scan the entire file for any remaining Nami color values (`4fc9c9`, `ff7356`, `041220`, `0e2840`, `e8dcc8`, `c8d8e8`, `5dd9d9`, `5a7a8a`, `a8b8c8`). None should remain except in text content (not URLs).

- [ ] **Step 10: Commit**

```bash
git add README.md
git commit -m "Update README to Fathom color scheme with light/dark theme support"
```
