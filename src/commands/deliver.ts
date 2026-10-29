import * as clipboardy from "clipboardy";
import { window } from "vscode";

// `open` stays out of the bundle, see build.js.
const open = require("open");

export async function openInBrowser(url?: string) {
  if (!url) return;
  return await open(url);
}

export function copyToClipboard(url?: string) {
  if (!url) return;
  clipboardy.writeSync(url);
  window.showInformationMessage(`Copied to the clipboard: ${url}`);
}
