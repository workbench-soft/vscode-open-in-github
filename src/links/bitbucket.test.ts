import * as assert from "assert";
import { bitbucketLinks } from "./bitbucket";

const remote = "https://bitbucket.org/some/repo";
const path = "rel/path/to/file.js";
const mapping = {
  "https://bitbucket.org/some/repo": "https://mapped.bitbucket.org/some/repo",
};

for (const view of ["file", "blame"] as const) {
  suite(`bitbucketLinks.${view}`, () => {
    const link = bitbucketLinks[view];
    const page = view === "file" ? "src" : "annotate";
    const base = `https://bitbucket.org/some/repo/${page}/master/rel/path/to/file.js`;

    test("anchors one line by file name", () => {
      assert.equal(
        link({ remote, branch: "master", path, lines: { start: 10 } }),
        `${base}#file.js-10`
      );
    });

    test("swaps the remote through the mapping", () => {
      assert.equal(
        link({ remote, branch: "master", path, mapping, lines: { start: 10 } }),
        `https://mapped.bitbucket.org/some/repo/${page}/master/rel/path/to/file.js#file.js-10`
      );
    });

    test("anchors a line range", () => {
      assert.equal(
        link({ remote, branch: "master", path, lines: { start: 10, end: 20 } }),
        `${base}#file.js-10:20`
      );
    });

    test("writes a range of one line as one line", () => {
      assert.equal(
        link({ remote, branch: "master", path, lines: { start: 10, end: 10 } }),
        `${base}#file.js-10`
      );
    });

    test("leaves out the anchor without lines", () => {
      assert.equal(link({ remote, branch: "master", path }), base);
    });
  });
}

suite("bitbucketLinks.history", () => {
  const lines = { start: 10, end: 20 };

  test("ignores the selected lines", () => {
    assert.equal(
      bitbucketLinks.history({ remote, branch: "master", path, lines }),
      "https://bitbucket.org/some/repo/history-node/master/rel/path/to/file.js"
    );
  });

  test("swaps the remote through the mapping", () => {
    assert.equal(
      bitbucketLinks.history({
        remote,
        branch: "master",
        path,
        mapping,
        lines,
      }),
      "https://mapped.bitbucket.org/some/repo/history-node/master/rel/path/to/file.js"
    );
  });
});

suite("bitbucketLinks branch and path", () => {
  test("escapes # in the branch and the file path", () => {
    assert.equal(
      bitbucketLinks.history({
        remote,
        branch: "fix/#12-crash",
        path: "docs/a#b.md",
      }),
      "https://bitbucket.org/some/repo/history-node/fix/%2312-crash/docs/a%23b.md"
    );
  });
});
