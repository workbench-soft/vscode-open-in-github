import * as assert from "assert";
import { githubLinks } from "./github";

const remote = "https://remote.url";
const path = "rel/path/to/file.js";
const mapping = { "https://remote.url": "https://mapped.remote.url" };

for (const view of ["file", "blame"] as const) {
  suite(`githubLinks.${view}`, () => {
    const link = githubLinks[view];
    const page = view === "file" ? "blob" : "blame";
    const base = `https://remote.url/${page}/master/rel/path/to/file.js`;

    test("anchors one line", () => {
      assert.equal(
        link({ remote, branch: "master", path, lines: { start: 10 } }),
        `${base}#L10`
      );
    });

    test("swaps the remote through the mapping", () => {
      assert.equal(
        link({ remote, branch: "master", path, mapping, lines: { start: 10 } }),
        `https://mapped.remote.url/${page}/master/rel/path/to/file.js#L10`
      );
    });

    test("anchors a line range", () => {
      assert.equal(
        link({ remote, branch: "master", path, lines: { start: 10, end: 20 } }),
        `${base}#L10-L20`
      );
    });

    test("writes a range of one line as one line", () => {
      assert.equal(
        link({ remote, branch: "master", path, lines: { start: 10, end: 10 } }),
        `${base}#L10`
      );
    });

    test("leaves out the anchor without lines", () => {
      assert.equal(link({ remote, branch: "master", path }), base);
    });
  });
}

suite("githubLinks.file extras", () => {
  test("escapes the branch name", () => {
    assert.equal(
      githubLinks.file({ remote, branch: "feature/#foo", path }),
      "https://remote.url/blob/feature/%23foo/rel/path/to/file.js"
    );
  });

  test("asks for the plain view of markdown with lines", () => {
    assert.equal(
      githubLinks.file({
        remote,
        branch: "master",
        path: "rel/path/to/file.md",
        lines: { start: 10 },
      }),
      "https://remote.url/blob/master/rel/path/to/file.md?plain=1#L10"
    );
  });

  test("keeps the rendered markdown without lines", () => {
    assert.equal(
      githubLinks.file({ remote, branch: "main", path: "rel/path/to/file.md" }),
      "https://remote.url/blob/main/rel/path/to/file.md"
    );
  });
});

suite("githubLinks.history", () => {
  const lines = { start: 10, end: 20 };

  test("ignores the selected lines", () => {
    assert.equal(
      githubLinks.history({ remote, branch: "master", path, lines }),
      "https://remote.url/commits/master/rel/path/to/file.js"
    );
  });

  test("swaps the remote through the mapping", () => {
    assert.equal(
      githubLinks.history({ remote, branch: "master", path, mapping, lines }),
      "https://mapped.remote.url/commits/master/rel/path/to/file.js"
    );
  });
});

suite("githubLinks file paths", () => {
  test("escapes #, ?, $ and spaces in the file path", () => {
    assert.equal(
      githubLinks.file({
        remote,
        branch: "main",
        path: "app/routes/users.$id/a#b c?.ts",
      }),
      "https://remote.url/blob/main/app/routes/users.%24id/a%23b%20c%3F.ts"
    );
  });
});
