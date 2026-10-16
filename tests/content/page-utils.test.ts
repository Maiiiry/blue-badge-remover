// tests/content/page-utils.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { isProfilePage, getPageType } from '../../src/content/page-utils';

function setPath(path: string): void {
  Object.defineProperty(window, 'location', {
    value: { ...window.location, pathname: path },
    writable: true,
    configurable: true,
  });
}

describe('isProfilePage', () => {
  beforeEach(() => {
    setPath('/');
  });

  it('should return false for root path', () => {
    setPath('/');
    expect(isProfilePage()).toBe(false);
  });

  it('should return true for /{handle} profile path', () => {
    setPath('/elonmusk');
    expect(isProfilePage()).toBe(true);
  });

  it('should return true for /{handle}/with_replies', () => {
    setPath('/elonmusk/with_replies');
    expect(isProfilePage()).toBe(true);
  });

  it('should return true for /{handle}/likes', () => {
    setPath('/someuser/likes');
    expect(isProfilePage()).toBe(true);
  });

  it.each([
    '/home',
    '/explore',
    '/search',
    '/notifications',
    '/messages',
    '/i/flow/login',
    '/settings',
    '/compose/tweet',
  ])('should return false for reserved path: %s', (path) => {
    setPath(path);
    expect(isProfilePage()).toBe(false);
  });

  it('should return false for /status/ paths (tweet detail)', () => {
    setPath('/elonmusk/status/123456789');
    expect(isProfilePage()).toBe(false);
  });

  it('should return false for /following paths', () => {
    setPath('/elonmusk/following');
    expect(isProfilePage()).toBe(false);
  });

  it('should return false for /followers paths', () => {
    setPath('/elonmusk/followers');
    expect(isProfilePage()).toBe(false);
  });

  it.each(['/i/history', '/i/history/likes'])('should return false for history page: %s', (path) => {
    setPath(path);
    expect(isProfilePage()).toBe(false);
  });
});

describe('getPageType', () => {
  beforeEach(() => {
    setPath('/');
  });

  it('should return timeline for home page', () => {
    setPath('/home');
    expect(getPageType()).toBe('timeline');
  });

  it('should return timeline for root', () => {
    setPath('/');
    expect(getPageType()).toBe('timeline');
  });

  it('should return search for search page', () => {
    setPath('/search');
    expect(getPageType()).toBe('search');
  });

  it('should return replies for status page', () => {
    setPath('/user/status/123456');
    expect(getPageType()).toBe('replies');
  });

  it('should return bookmarks for /i/bookmarks', () => {
    setPath('/i/bookmarks');
    expect(getPageType()).toBe('bookmarks');
  });

  it('should return bookmarks for /i/bookmarks/folders subpath', () => {
    setPath('/i/bookmarks/folders/123');
    expect(getPageType()).toBe('bookmarks');
  });

  // X가 북마크·마음에 들어요를 /i/history(히스토리) 탭으로 옮김
  it('should return bookmarks for /i/history (bookmarks tab)', () => {
    setPath('/i/history');
    expect(getPageType()).toBe('bookmarks');
  });

  it('should return bookmarks for /i/history/likes (likes tab)', () => {
    setPath('/i/history/likes');
    expect(getPageType()).toBe('bookmarks');
  });

  it.each(['/i/historyfan', '/i/bookmarksx', '/someone/i/history'])('should not treat %s as bookmarks (path must start with the exact segments)', (path) => {
    setPath(path);
    expect(getPageType()).toBe('timeline');
  });

  it('should return timeline for user profile', () => {
    setPath('/fotoner');
    expect(getPageType()).toBe('timeline');
  });
});
