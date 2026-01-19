/**
 * EditHtml Plugin Core (Framework-agnostic)
 */

import type { ToolPluginCore, ToolContext, ToolResult } from "gui-chat-protocol";
import type { EditHtmlArgs, HtmlToolData } from "./types";
import { TOOL_DEFINITION, SYSTEM_PROMPT } from "./definition";

// Re-export for convenience
export { TOOL_NAME, TOOL_DEFINITION, SYSTEM_PROMPT } from "./definition";

/**
 * Execute the editHtml function
 */
export const executeEditHtml = async (
  context: ToolContext,
  args: EditHtmlArgs,
): Promise<ToolResult<HtmlToolData>> => {
  const { prompt } = args;

  // Get the currently selected HTML from context
  const currentData = context.currentResult?.data as HtmlToolData | undefined;
  const currentHtml = currentData?.html;

  if (!currentHtml) {
    return {
      message: "No HTML page is currently selected to edit",
      instructions:
        "Tell the user that they need to select an HTML page first before editing it.",
    };
  }

  if (!context.app?.generateHtml) {
    return {
      message: "generateHtml function not available",
      instructions: "Acknowledge that the HTML editing failed.",
    };
  }

  try {
    const data = await context.app.generateHtml({
      prompt,
      html: currentHtml,
    });

    if (data.success && data.html) {
      return {
        data: {
          html: data.html,
          type: currentData?.type || "tailwind",
        },
        title: prompt.slice(0, 50),
        message: "HTML editing succeeded",
        instructions:
          "Acknowledge that the HTML was modified and has been already presented to the user.",
        updating: true, // Update the existing result instead of creating a new one
      };
    } else {
      console.error("ERR:1\n no HTML data", data);
      return {
        message: data.error || "HTML editing failed",
        instructions: "Acknowledge that the HTML editing failed.",
      };
    }
  } catch (error) {
    console.error("ERR: exception\n HTML editing failed", error);
    return {
      message: "HTML editing failed",
      jsonData: error,
      instructions: "Acknowledge that the HTML editing failed.",
    };
  }
};

// Core Plugin (without UI components)
export const pluginCore: ToolPluginCore<HtmlToolData, unknown, EditHtmlArgs> = {
  toolDefinition: TOOL_DEFINITION,
  execute: executeEditHtml,
  generatingMessage: "Editing HTML...",
  isEnabled: (startResponse) =>
    !!startResponse?.hasAnthropicApiKey || !!startResponse?.hasGoogleApiKey,
  systemPrompt: SYSTEM_PROMPT,
  backends: ["textLLM"],
};
