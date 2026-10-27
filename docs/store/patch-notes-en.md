# Blue Badge Remover v1.8.0 Patch Notes

Fix follow exceptions and account detection that broke after X changed its page layout.

## Changes

- The follow list is cleared once on update and collected again, because an earlier bug mixed accounts you don't follow into it. Paid-badge accounts you follow may be hidden briefly the first time, so please sync once with "Open Following Page" in the dashboard
- Add two tweet page settings (off by default). "Show the author's thread" keeps the opened tweet's author's earlier and later posts visible. "Collapse instead of removing on tweet pages" lets you tap to see hidden tweets on a tweet's page
- Tweets hidden with "Remove Completely" now leave a thin invisible gap, so the scroll position stays in place when you come back from a tweet's page
- Now available on Firefox for Android

## Fix

- Fix your account not being recognized after X's layout change, which stopped follows from being saved and your own tweets from being exempt
- Fix accounts you don't follow being saved as follows just by viewing the timeline
- Fix reposts by followed or whitelisted accounts being hidden because the reposter wasn't recognized
- Fix hidden paid-badge tweets flashing briefly and the scroll jumping when going back from a tweet's page
- Fix quote hiding not working when X is in English or Japanese
- Fix filters applying late after moving to another page
- Fix a warning banner appearing on your own profile and tweets when your account has a paid badge
- Fix the Bookmarks and Likes pages not being recognized
- Fix reposts and quotes being hidden on pages where filtering is turned off
- Fix the language selector in the dashboard looking misaligned
