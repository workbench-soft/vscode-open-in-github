import { commands, ExtensionContext, Uri } from "vscode";
import { copyToClipboard, openInBrowser } from "./commands/deliver";
import { Deliver, runLinkCommand } from "./commands/link-command";
import { LinkView } from "./links/host-links";

export function activate(context: ExtensionContext) {
  const editorCommand = (view: LinkView, deliver: Deliver) => () =>
    runLinkCommand(view, deliver);
  const explorerCommand = (deliver: Deliver) => (uri?: Uri) =>
    runLinkCommand("file", deliver, uri);

  // The editor menu passes the file uri too. The editor commands drop it,
  // so the link keeps the selected lines.
  const handlers: Record<string, (uri?: Uri) => unknown> = {
    "openInGithub.openInGitHubFile": editorCommand("file", openInBrowser),
    "openInGithub.openInGitHubBlame": editorCommand("blame", openInBrowser),
    "openInGithub.openInGitHubHistory": editorCommand("history", openInBrowser),
    "openInGithub.copyInGitHubFile": editorCommand("file", copyToClipboard),
    "openInGithub.copyInGitHubBlame": editorCommand("blame", copyToClipboard),
    "openInGithub.copyInGitHubHistory": editorCommand(
      "history",
      copyToClipboard
    ),
    "openInGithub.openInGitHubExplorer": explorerCommand(openInBrowser),
    "openInGithub.copyInGitHubExplorer": explorerCommand(copyToClipboard),
  };

  context.subscriptions.push(
    ...Object.entries(handlers).map(([id, handler]) =>
      commands.registerCommand(id, handler)
    )
  );
}
