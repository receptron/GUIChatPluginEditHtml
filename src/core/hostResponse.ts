import { HTML_LIBRARIES, type HtmlToolData } from "./types";

export interface GenerateHtmlResponse {
  success: boolean;
  html?: string;
  error?: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isOptionalString = (value: unknown): value is string | undefined =>
  value === undefined || typeof value === "string";

export const isGenerateHtmlResponse = (
  value: unknown,
): value is GenerateHtmlResponse =>
  isRecord(value) &&
  typeof value.success === "boolean" &&
  isOptionalString(value.html) &&
  isOptionalString(value.error);

const isHtmlLibraryType = (
  value: unknown,
): value is HtmlToolData["type"] =>
  HTML_LIBRARIES.some((library) => library === value);

/** `ToolContext.currentResult.data` is `unknown` — the host may hold any plugin's card. */
export const isHtmlToolData = (value: unknown): value is HtmlToolData =>
  isRecord(value) &&
  typeof value.html === "string" &&
  isHtmlLibraryType(value.type);
