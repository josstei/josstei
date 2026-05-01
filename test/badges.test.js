const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const {
  buildStarBadgeUrl,
  normalizeStarCount,
} = require('../src/badges.js');

const LIVE_STAR_LOOKUP_PATH = '/github' + '/stars/';

describe('badges', () => {
  it('builds static Shields star badge URLs from a numeric count', () => {
    const url = buildStarBadgeUrl(42);

    assert.ok(url.startsWith('https://img.shields.io/badge/stars-42-0E1830?'));
    assert.ok(url.includes('style=flat-square'));
    assert.ok(url.includes('labelColor=050A14'));
    assert.ok(url.includes('logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2C'));
    assert.ok(!url.includes(LIVE_STAR_LOOKUP_PATH));
  });

  it('rejects malformed star counts before rendering a badge', () => {
    assert.throws(() => normalizeStarCount(-1), /non-negative integer/);
    assert.throws(() => normalizeStarCount(1.5), /non-negative integer/);
    assert.throws(() => normalizeStarCount(undefined), /non-negative integer/);
  });
});
