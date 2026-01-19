/**
 * EditHtml Plugin Tool Definition
 */

export const TOOL_NAME = "editHtml";

export const TOOL_DEFINITION = {
  type: "function" as const,
  name: TOOL_NAME,
  description:
    "Edit the currently selected HTML page by sending a detailed modification prompt to another LLM (Claude). This tool modifies the existing HTML based on your description while preserving the existing structure and functionality where possible.",
  parameters: {
    type: "object" as const,
    properties: {
      prompt: {
        type: "string",
        description:
          "Detailed description of the modifications to make to the HTML page. Be specific about what changes are needed - layout adjustments, style updates, new functionality, content changes, etc. The more detailed your prompt, the better the modifications will match your requirements.",
      },
    },
    required: ["prompt"],
  },
};

export const SYSTEM_PROMPT = "";
