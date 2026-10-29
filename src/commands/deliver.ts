import { env, window } from "vscode";

// build.js keeps `open` out of the bundle, so it finds its xdg-open script.
const open = require("open");

export async function openInBrowser(url?: string) {
  if (!url) return;
  return await open(url);
}

/** Copies through VS Code, so a remote window fills the local clipboard. */
export async function copyToClipboard(url?: string) {
  if (!url) return;
  await env.clipboard.writeText(url);
  window.showInformationMessage(`Copied to the clipboard: ${url}`);
}
