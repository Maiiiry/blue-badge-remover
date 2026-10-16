// src/features/content-filter/tweet-processor.ts
import type { Settings } from '@shared/types';

export type PageType = 'timeline' | 'replies' | 'search' | 'bookmarks' | 'lists';

export interface TweetContext {
  settings: Settings;
  followList: Set<string>;
  whitelist: Set<string>;
  isFadak: boolean;
  handle: string;
  pageType: PageType;
}

/** whitelist/follow Set 엔트리(state.ts 기준: '@' + lowercase)와 동일한 형식으로 정규화 */
function toWhitelistProbe(handle: string): string {
  return `@${handle.replace(/^@/, '').toLowerCase()}`;
}

export function shouldHideTweet(ctx: TweetContext): boolean {
  if (!ctx.settings.enabled) return false;
  if (!ctx.isFadak) return false;
  // followList 체크는 content script에서 수행 (idToHandle 매핑 필요)
  // 여기서는 whitelist만 체크
  if (ctx.whitelist.has(toWhitelistProbe(ctx.handle))) return false;
  return isPageFilterEnabled(ctx.settings, ctx.pageType);
}

/** 필터링 범위 토글 — 작성자·리트윗·인용 숨김 모두 이 토글이 켜진 화면에서만 적용한다 */
export function isPageFilterEnabled(settings: Settings, pageType: PageType): boolean {
  const filterMap: Record<PageType, boolean> = {
    timeline: settings.filter.timeline,
    replies: settings.filter.replies,
    search: settings.filter.search,
    bookmarks: settings.filter.bookmarks,
    lists: settings.filter.lists,
  };

  return filterMap[pageType] ?? false;
}

export interface RetweetContext {
  settings: Settings;
  isFadak: boolean;
  isRetweet: boolean;
}

export function shouldHideRetweet(ctx: RetweetContext): boolean {
  if (!ctx.isRetweet || !ctx.isFadak) return false;
  return ctx.settings.retweetFilter;
}

export type QuoteAction = 'none' | 'hide-quote' | 'hide-entire';

export function getQuoteAction(settings: Settings, isQuotedUserFadak: boolean): QuoteAction {
  if (!isQuotedUserFadak || settings.quoteMode === 'off') return 'none';
  return settings.quoteMode === 'quote-only' ? 'hide-quote' : 'hide-entire';
}
