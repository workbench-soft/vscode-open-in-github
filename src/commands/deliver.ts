import { env, l10n, Uri, window } from "vscode";
import { isWebLink } from "../links/web-url";

/**
 * Opens through VS Code, so a remote window opens the browser on the
 * person's machine. VS Code takes a string here, though its types say Uri.
 * A Uri would decode and encode the link again (microsoft/vscode#85930).
 */
export async function openInBrowser(url?: string) {
  if (!url) return;
  if (!isWebLink(url)) {
    throw l10n.t(
      "{0} isn't an http or https link, so it stays closed. Check openInGitHub.remoteURLMapping.",
      url
    );
  }
  await env.openExternal(url as unknown as Uri);
}

/** Copies through VS Code, so a remote window fills the local clipboard. */
export async function copyToClipboard(url?: string) {
  if (!url) return;
  await env.clipboard.writeText(url);
  window.showInformationMessage(l10n.t("Copied to the clipboard: {0}", url));
}
