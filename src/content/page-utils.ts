// src/content/page-utils.ts
// Side-effect-free page detection utilities for content scripts

import type { PageType } from '@features/content-filter';

const RESERVED_PATHS = ['home', 'explore', 'search', 'notifications', 'messages', 'i', 'settings', 'compose'];

export function isProfilePage(): boolean {
  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);
  if (segments.length === 0) return false;
  if (RESERVED_PATHS.includes(segments[0]!)) return false;
  return !path.includes('/status/') && !path.includes('/following') && !path.includes('/followers');
}

const PROFILE_LINK_SELECTOR = 'a[data-testid="AppTabBar_Profile_Link"]';

export function getProfileLinkHref(): string | null {
  return document.querySelector(PROFILE_LINK_SELECTOR)?.getAttribute('href') ?? null;
}

export function isDetailPage(): boolean {
  return window.location.pathname.includes('/status/');
}

// X가 북마크를 /i/bookmarks에서 /i/history(마음에 들어요는 /i/history/likes 탭)로 옮김
const BOOKMARKS_PATH = /^\/i\/(bookmarks|history)(\/|$)/;

export function getPageType(): PageType {
  const path = window.location.pathname;
  if (BOOKMARKS_PATH.test(path)) return 'bookmarks';
  if (path.includes('/i/lists/') || path.includes('/lists/')) return 'lists';
  if (path.includes('/search')) return 'search';
  if (path.includes('/status/')) return 'replies';
  return 'timeline';
}
