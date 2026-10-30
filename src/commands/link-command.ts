import { promises as fs } from "fs";
import * as path from "path";
import { FileType, Uri, window, workspace } from "vscode";
import { pickBranch } from "../git/pick-branch";
import { findRepoRoot, runGit } from "../git/run-git";
import { toRepoPath } from "../git/repo-path";
import { LinkView, SelectedLines, UrlMapping } from "../links/host-links";
import { pickHost } from "../links/pick-host";
import { errorText } from "./error-text";
import { selectedLines } from "./selected-lines";
import { readWebRemote } from "./web-remote";

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
    window.showErrorMessage("Open a file first.");
    return;
  }
  if (uri.scheme === "untitled") {
    window.showErrorMessage("Save the file in a git repo first.");
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
    const [{ stored, web: remote }, branch] = await Promise.all([
      readWebRemote(runGit, repoRoot, remoteName),
      pickBranch(runGit, repoRoot, remoteName, repoPath, configuredBranch),
    ]);
    if (!remote) {
      return window.showErrorMessage(
        `The remote "${remoteName}" points at ${stored}, which has no web page.`
      );
    }
    const url = pickHost(repositoryType, remote)[view]({
      remote,
      branch,
      path: repoPath,
      mapping,
      lines,
    });
    // Awaited, so a failed open or copy shows in the catch below.
    return await deliver(url);
  } catch (err) {
    return window.showErrorMessage(errorText(err));
  }
}
