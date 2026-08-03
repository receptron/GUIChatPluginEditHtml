/**
 * `context.app.generateHtml` and `context.currentResult.data` are `unknown`
 * since gui-chat-protocol 2.0.0, so the plugin narrows both here instead of
 * trusting the host's shape.
 *
 * Run with: yarn test
 */

import { test, describe } from "node:test";
import assert from "node:assert";
import { isGenerateHtmlResponse, isHtmlToolData } from "../src/core/hostResponse.js";

describe("isGenerateHtmlResponse", () => {
  test("accepts a successful response carrying html", () => {
    assert.equal(
      isGenerateHtmlResponse({ success: true, html: "<p>hi</p>" }),
      true,
    );
  });

  test("accepts a failure response carrying an error string", () => {
    assert.equal(isGenerateHtmlResponse({ success: false, error: "boom" }), true);
  });

  test("rejects a response without a boolean success flag", () => {
    assert.equal(isGenerateHtmlResponse({ html: "<p>hi</p>" }), false);
  });

  test("rejects values that are not a response object", () => {
    [null, undefined, "ok", 7].forEach((value) => {
      assert.equal(
        isGenerateHtmlResponse(value),
        false,
        `should reject ${JSON.stringify(value)}`,
      );
    });
  });
});

describe("isHtmlToolData", () => {
  test("accepts a card produced by this plugin", () => {
    assert.equal(isHtmlToolData({ html: "<p>hi</p>", type: "tailwind" }), true);
  });

  test("rejects a card whose library is not one this plugin knows", () => {
    assert.equal(isHtmlToolData({ html: "<p>hi</p>", type: "svelte" }), false);
  });

  test("rejects another plugin's card", () => {
    assert.equal(isHtmlToolData({ markdown: "# hi" }), false);
  });
});
