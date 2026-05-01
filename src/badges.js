const { BADGE_THEME } = require('./config.js');

function encodeBadgePathPart(value) {
  return encodeURIComponent(String(value).replace(/-/g, '--'));
}

function normalizeStarCount(starCount) {
  if (!Number.isInteger(starCount) || starCount < 0) {
    throw new Error(`Star badge count must be a non-negative integer, received: ${starCount}`);
  }
  return String(starCount);
}

function buildStaticBadgeUrl({ label, message, color, theme = BADGE_THEME }) {
  const path = `${encodeBadgePathPart(label)}-${encodeBadgePathPart(message)}-${encodeBadgePathPart(color)}`;
  const url = new URL(`${theme.baseUrl.replace(/\/$/, '')}/${path}`);

  url.searchParams.set('style', theme.style);
  url.searchParams.set('labelColor', theme.labelColor);
  url.searchParams.set('logo', theme.logo);

  return url.toString();
}

function buildStarBadgeUrl(starCount, options = {}) {
  const theme = options.theme || BADGE_THEME;

  return buildStaticBadgeUrl({
    color: theme.color,
    label: 'stars',
    message: normalizeStarCount(starCount),
    theme,
  });
}

module.exports = {
  buildStarBadgeUrl,
  buildStaticBadgeUrl,
  encodeBadgePathPart,
  normalizeStarCount,
};
