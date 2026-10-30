import * as assert from "assert";
import { bitbucketLinks } from "./bitbucket";
import { bitbucketServerLinks } from "./bitbucket-server";
import { githubLinks } from "./github";
import { gitlabLinks } from "./gitlab";
import { pickHost } from "./pick-host";

suite("pickHost", () => {
  test("reads the host from the remote on auto", () => {
    assert.equal(pickHost("auto", "https://bitbucket.org/a/b"), bitbucketLinks);
    assert.equal(pickHost("auto", "https://gitlab.com/a/b"), gitlabLinks);
    assert.equal(pickHost("auto", "https://git.corp/a/b"), githubLinks);
  });

  test("reads the host alone, not the repo path", () => {
    assert.equal(
      pickHost("auto", "https://github.com/acme/gitlab-com-sync"),
      githubLinks
    );
    assert.equal(
      pickHost("auto", "https://github.com/acme/bitbucket_org-tools"),
      githubLinks
    );
  });

  test("takes the named type over the remote", () => {
    assert.equal(
      pickHost("bitbucket-server", "https://git.corp/a/b"),
      bitbucketServerLinks
    );
    assert.equal(pickHost("github", "https://gitlab.com/a/b"), githubLinks);
  });

  test("reads the host from the remote for an unknown type", () => {
    assert.equal(pickHost("gitea", "https://gitlab.com/a/b"), gitlabLinks);
    assert.equal(pickHost("toString", "https://gitlab.com/a/b"), gitlabLinks);
    assert.equal(pickHost(undefined, "https://gitlab.com/a/b"), gitlabLinks);
  });
});
