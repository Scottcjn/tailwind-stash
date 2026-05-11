/**
 * Guards against accidental file deletion (LICENSE, source files, CI config, etc.).
 * If you add, remove, or rename a file, update the `requiredFiles` array below.
 */
import { existsSync } from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"

const root = path.resolve(__dirname, "../..")

const requiredFiles = [
  // ─── Project root ─────────────────────────────────────────────
  "LICENSE",
  "README.md",
  "CONTRIBUTING.md",
  "CHANGELOG.md",
  "package.json",
  "package-lock.json",
  "tsconfig.json",
  "vitest.config.ts",
  "oxlint.config.mjs",
  "esbuild.webview.mts",
  ".gitignore",
  ".vscodeignore",

  // ─── CI / GitHub ──────────────────────────────────────────────
  ".github/workflows/ci.yml",
  ".github/ISSUE_TEMPLATE/bug_report.md",
  ".github/ISSUE_TEMPLATE/feature_request.md",
  ".github/pull_request_template.md",

  // ─── Extension source ─────────────────────────────────────────
  "src/extension.ts",
  "src/utils/utils.ts",
  "src/utils/types.ts",
  "src/core/classContext.ts",
  "src/core/classDetector.ts",
  "src/core/cssPreviewPanel.ts",
  "src/core/expandPlaceholder.ts",
  "src/core/foldingProvider.ts",
  "src/core/placeholderCompletionProvider.ts",
  "src/core/placeholderMatcher.ts",

  // ─── Webview source ───────────────────────────────────────────
  "src/webview/index.html",
  "src/webview/index.tsx",
  "src/webview/styles.css",
  "src/webview/global.d.ts",
  "src/webview/tsconfig.json",
  "src/webview/components/class-editor/class-editor.tsx",
  "src/webview/components/empty-state/empty-state.tsx",
  "src/webview/components/entry-card/entry-card.tsx",
  "src/webview/components/entry-card/entry-card-header.tsx",
  "src/webview/views/panel/panel.tsx",

  // ─── Tests ────────────────────────────────────────────────────
  "test/__mocks__/vscode.ts",
  "test/core/classDetector.test.ts",
  "test/core/cssPreviewPanel.test.ts",
  "test/core/extension.test.ts",
  "test/core/expandPlaceholder.test.ts",
  "test/core/foldingProvider.test.ts",
  "test/core/placeholderCompletionProvider.test.ts",
  "test/core/placeholderMatcher.test.ts",
  "test/core/utils.test.ts",
  "test/core/vscodeignore.test.ts",
  "test/webview/classEditor.test.tsx",
  "test/webview/entryCard.test.tsx",
  "test/webview/panel.test.tsx",
  "test/integration/activation.test.ts",

  // ─── VS Code E2E tests ─────────────────────────────────────
  "test/vscode-e2e/index.ts",
  "test/vscode-e2e/smoke.test.ts",
  "test/vscode-e2e/tsconfig.json",
  "scripts/run-vscode-tests.mts",
]

describe("project structure", () => {
  for (const file of requiredFiles) {
    it(`${file} exists`, () => {
      expect(existsSync(path.join(root, file))).toBe(true)
    })
  }
})
