# @gui-chat-plugin/edit-html

[![npm version](https://badge.fury.io/js/%40gui-chat-plugin%2Fedit-html.svg)](https://www.npmjs.com/package/@gui-chat-plugin/edit-html)

An edit HTML plugin for [MulmoChat](https://github.com/receptron/MulmoChat).

## Overview

This plugin allows users to edit an existing HTML page by describing the desired modifications. It sends the current HTML and modification prompt to an LLM (Claude or Gemini) to generate the updated HTML.

## Installation

```bash
yarn add @gui-chat-plugin/edit-html gui-chat-protocol
```

> `gui-chat-protocol` is a peer dependency — install it alongside the plugin; the host application provides the runtime and this plugin only declares the compatible range.


## Usage

### Vue Implementation (for MulmoChat)

```typescript
// In src/tools/index.ts
import EditHtmlPlugin from "@gui-chat-plugin/edit-html/vue";

const pluginList = [
  // ... other plugins
  EditHtmlPlugin,
];

// In src/main.ts
import "@gui-chat-plugin/edit-html/style.css";
```

### Core Only (Framework-agnostic)

```typescript
import { pluginCore, TOOL_NAME } from "@gui-chat-plugin/edit-html";
```

## Package Exports

| Export | Description |
|--------|-------------|
| `@gui-chat-plugin/edit-html` | Core (framework-agnostic) |
| `@gui-chat-plugin/edit-html/vue` | Vue implementation |
| `@gui-chat-plugin/edit-html/style.css` | Tailwind CSS styles |

## Requirements

This plugin requires an Anthropic API key or Google API key configured in MulmoChat.

## Test Prompts

First generate an HTML page, then:

1. "Change the background color to blue"
2. "Add a navigation menu at the top"
3. "Make the font larger"
4. "Add a footer with contact information"

## Development

```bash
yarn install
yarn dev        # Start dev server
yarn build      # Build
yarn typecheck  # Type check
yarn lint       # Lint
```

## License

MIT

## Related

- Protocol spec: [gui-chat-protocol](https://github.com/receptron/gui-chat-protocol)
- Reference implementations using this protocol: [mulmoclaude](https://github.com/receptron/mulmoclaude) · [MulmoChat](https://github.com/receptron/MulmoChat)
