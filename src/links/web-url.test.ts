import * as assert from "assert";
import { toWebUrls } from "./web-url";

/** Each git remote URL, then the web URL it turns into. */
const cases: [string, string | undefined][] = [
  [
    "git@github.com:d4rkr00t/language-stylus.git",
    "https://github.com/d4rkr00t/language-stylus",
  ],
  [
    "git@github.yandex-team.ru:search-interfaces/web4.git",
    "https://github.yandex-team.ru/search-interfaces/web4",
  ],
  [
    "https://github.yandex-team.ru/serp/web4",
    "https://github.yandex-team.ru/serp/web4",
  ],
  [
    "https://github.com/d4rkr00t/language-stylus",
    "https://github.com/d4rkr00t/language-stylus",
  ],
  [
    "https://github.com/Microsoft/TypeScript.git",
    "https://github.com/Microsoft/TypeScript",
  ],
  ["ssh://user@host.xz/path/to/repo.git/", "https://host.xz/path/to/repo"],
  ["git://host.xz/path/to/repo.git/", "https://host.xz/path/to/repo.git"],
  ["https://host.xz/path/to/repo.git/", "https://host.xz/path/to/repo"],
  ["ftps://host.xz/path/to/repo.git/", "https://host.xz/path/to/repo.git"],
  ["http://host.xz/path/to/repo.git/", "http://host.xz/path/to/repo"],
  ["ftp://host.xz/path/to/repo.git/", "http://host.xz/path/to/repo.git"],
  ["https://user@github.com/some/repo.git", "https://github.com/some/repo"],
  [
    "ssh://git@bitbucket-mirror-au.internal.atlassian.com:7999/confcloud/confluence-frontend.git",
    "https://bitbucket-mirror-au.internal.atlassian.com/confcloud/confluence-frontend",
  ],
  ["../other", undefined],
];

suite("toWebUrls", () => {
  for (const [remoteUrl, webUrl] of cases) {
    test(`turns ${remoteUrl} into ${webUrl}`, () => {
      assert.equal(toWebUrls([remoteUrl])[0], webUrl);
    });
  }

  test("trims the newline that git config prints", () => {
    assert.deepEqual(toWebUrls(["git@github.com:a/b.git\n"]), [
      "https://github.com/a/b",
    ]);
  });

  test("drops repeated URLs", () => {
    assert.deepEqual(
      toWebUrls(["https://github.com/a/b.git", "git@github.com:a/b.git"]),
      ["https://github.com/a/b"]
    );
  });
});
