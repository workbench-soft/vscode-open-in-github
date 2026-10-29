import { Uri } from "vscode";
import {
  baseCommand,
  formatBitbucketLinePointer,
  formatGitHubLinePointer,
  formatGithubBranchName,
  formatGitHubQueryParams,
  SelectedLines,
  formatGitlabLinePointer,
  Action,
  RemoteURLMappings,
} from "../commands/link-command";
import { formatBitbucketServerUrl } from "./bitbucket-server";

export default function fileCommand(action: Action) {
  return (explorerUri?: Uri) =>
    baseCommand(
      "file",
      action,
      {
        github: formatGitHubFileUrl,
        bitbucket: formatBitbucketFileUrl,
        bitbucketServer: formatBitbucketServerUrl,
        gitlab: formatGitlabFileUrl,
      },
      explorerUri
    );
}

export function formatGitHubFileUrl(
  derivedRemote: string,
  branch: string,
  filePath: string,
  remoteURLMappings: RemoteURLMappings = {},
  lines?: SelectedLines
): string {
  const remote =
    derivedRemote in remoteURLMappings
      ? remoteURLMappings[derivedRemote]
      : derivedRemote;
  return `${remote}/blob/${formatGithubBranchName(
    branch
  )}/${filePath}${formatGitHubQueryParams(
    filePath,
    lines
  )}${formatGitHubLinePointer(lines)}`;
}

export function formatBitbucketFileUrl(
  derivedRemote: string,
  branch: string,
  filePath: string,
  remoteURLMappings: RemoteURLMappings = {},
  lines?: SelectedLines
): string {
  const remote =
    derivedRemote in remoteURLMappings
      ? remoteURLMappings[derivedRemote]
      : derivedRemote;
  return `${remote}/src/${branch}/${filePath}${formatBitbucketLinePointer(
    filePath,
    lines
  )}`;
}

export function formatGitlabFileUrl(
  derivedRemote: string,
  branch: string,
  filePath: string,
  remoteURLMappings: RemoteURLMappings = {},
  lines?: SelectedLines
): string {
  const remote =
    derivedRemote in remoteURLMappings
      ? remoteURLMappings[derivedRemote]
      : derivedRemote;
  return `${remote}/blob/${formatGithubBranchName(
    branch
  )}/${filePath}${formatGitlabLinePointer(lines)}`;
}
