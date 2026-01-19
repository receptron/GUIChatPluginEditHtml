<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">
      EditHtml Plugin Demo
    </h1>
    <p class="text-gray-600 dark:text-gray-400 mb-4">
      This plugin edits existing HTML content. It requires an app context with
      generateHtml function.
    </p>
    <div
      v-if="result"
      class="max-w-2xl p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
    >
      <Preview :result="result" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ToolResult } from "gui-chat-protocol/vue";
import type { HtmlToolData } from "../src/core/types";
import { Preview } from "../src/vue";

const result = ref<ToolResult<HtmlToolData> | null>(null);
</script>
