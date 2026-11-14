import * as assert from "assert";
import { KnownError } from "../known-error";
import { errorText } from "./error-text";

suite("errorText", () => {
  test("shows git's message as it is", () => {
    assert.equal(
      errorText("fatal: not a git repository"),
      "fatal: not a git repository"
    );
  });

  test("shows the error message", () => {
    assert.equal(errorText(new Error("Command failed")), "Command failed");
  });

  test("keeps the output limit error to its own message", () => {
    const err = Object.assign(new Error("stdout maxBuffer length exceeded"), {
      code: "ERR_CHILD_PROCESS_STDIO_MAXBUFFER",
    });
    assert.equal(errorText(err), "stdout maxBuffer length exceeded");
  });

  test("translates a known error with its arguments", () => {
    const err = new KnownError('No remote "{0}" in this repo.', ["upstream"]);
    const translate = (text: string, ...args: string[]) =>
      `ru:${text}:${args.join(",")}`;
    assert.equal(
      errorText(err, translate),
      'ru:No remote "{0}" in this repo.:upstream'
    );
    assert.equal(errorText(err), 'No remote "upstream" in this repo.');
  });

  test("falls back to the error code", () => {
    assert.equal(errorText({ code: "ENOENT" }), "ENOENT");
  });
});
