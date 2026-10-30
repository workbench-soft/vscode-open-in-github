import { promises as fs } from "fs";
import * as path from "path";
import { FileType, Uri, window, workspace } from "vscode";
import { pickBranch } from "../git/pick-branch";
import { findRepoRoot, readRemoteUrl, runGit } from "../git/run-git";
import { toRepoPath } from "../git/repo-path";
import { LinkView, SelectedLines, UrlMapping } from "../links/host-links";
import { pickHost } from "../links/pick-host";
import { toWebUrls } from "../links/web-url";
import { errorText } from "./error-text";
import { selectedLines } from "./selected-lines";

/** Does something with the link: opens it, or copies it. */
export type Deliver = (url?: string) => unknown;

/**
 * Builds the `view` link for the explorer item, or for the active editor and
 * its selection, then hands it to `deliver`.
 */
export async function runLinkCommand(
  view: LinkView,
  deliver: Deliver,
  explorerUri?: Uri
) {
  const editor = window.activeTextEditor;
  const uri = explorerUri ?? editor?.document.uri;
  if (!uri) {
    window.showErrorMessage("No opened files.");
    return;
  }

  const lines: SelectedLines | undefined =
    explorerUri || !editor ? undefined : selectedLines(editor.selection);
  const config = workspace.getConfiguration("openInGitHub", uri);
  const configuredBranch = config.get<string>("defaultBranch") || "";
  const remoteName = config.get<string>("defaultRemote") || "origin";
  const mapping = config.get<UrlMapping>("remoteURLMapping") || {};
  const repositoryType = config.get<string>("repositoryType");

  try {
    const openedPath = uri.fsPath;
    const isFolder =
      explorerUri &&
      ((await workspace.fs.stat(uri)).type & FileType.Directory) !== 0;
    const repoRoot = await findRepoRoot(
      runGit,
      isFolder ? openedPath : path.dirname(openedPath)
    );
    const repoPath = toRepoPath(
      repoRoot,
      await fs.realpath(openedPath),
      openedPath
    );
    const [remotes, branch] = await Promise.all([
      readRemoteUrl(runGit, repoRoot, remoteName).then((url) =>
        toWebUrls([url])
      ),
      pickBranch(runGit, repoRoot, remoteName, repoPath, configuredBranch),
    ]);
    const remote = remotes[0];
    const url =
      remote &&
      pickHost(repositoryType, remote)[view]({
        remote,
        branch,
        path: repoPath,
        mapping,
        lines,
      });
    return deliver(url);
  } catch (err) {
    return window.showErrorMessage(errorText(err));
  }
}
