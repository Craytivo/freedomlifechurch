#!/usr/bin/env node
/* Tiny guardrail to prevent arbitrary px font utilities (text-[Npx]) */
const { execSync } = require('child_process');
const path = require('path');

try {
  const root = process.cwd();
  // Search JS/TS/JSX/TSX/CSS files under src and pages/components
  const cmd = process.platform.startsWith('win')
    ? `powershell -NoProfile -Command "Get-ChildItem -Recurse -Include *.js,*.jsx,*.ts,*.tsx,*.css -Path src, pages, components | ForEach-Object { Get-Content $_.FullName } | Select-String -Pattern 'text-\\[[0-9]+px\\]' | Select-Object -ExpandProperty Line"`
    : `grep -RIEo "text-\\[[0-9]+px\\]" src pages components`;
  const out = execSync(cmd, { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] }).toString();
  if (out && out.trim().length > 0) {
    console.error('\u001b[31mFound disallowed arbitrary px font sizes (text-[Npx]). Please use text-2xs/text-xs/text-sm or update tailwind theme.\u001b[0m');
    console.error(out);
    process.exit(1);
  } else {
    console.log('\u001b[32mNo disallowed text-[Npx] classes found.\u001b[0m');
  }
} catch (e) {
  // If grep returns non-zero (no matches), treat as success
  if (e.status) {
    console.log('\u001b[32mNo disallowed text-[Npx] classes found.\u001b[0m');
    process.exit(0);
  }
  // Unexpected error
  console.error('\u001b[31mError running lint-no-px:\u001b[0m', e.message);
  process.exit(2);
}
