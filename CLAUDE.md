# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a bilingual (English/Chinese) version of "Effective Go" - the official Go programming tutorial. The content is built using Honkit (a modern GitBook fork) to generate an interactive documentation site with language switching capabilities.

## Build Commands

```bash
# Install dependencies
npm install

# Local development server with live reload
npm run start

# Build static site to _book/ directory
npm run build

# Generate eBook formats
npm run pdf   # Outputs to dist/effective-go.pdf
npm run epub  # Outputs to dist/effective-go.epub
npm run mobi  # Outputs to dist/effective-go.mobi
```

## Content Structure

The repository uses a bilingual structure:

- **Root level**: Contains `SUMMARY.md` (minimal), `README.md` (main intro), and `LANGS.md` (language picker with localStorage logic)
- **`en/`**: English version with `SUMMARY.md` (chapter list) and `01_Overview.md` through `16_A_web_server.md`
- **`zh/`**: Chinese version with identical structure and chapter numbering
- **`_book/`**: Generated output directory (git-ignored)
- **`dist/`**: eBook output directory

Each chapter is a standalone markdown file numbered sequentially (e.g., `01_Overview.md`, `02_Formatting.md`).

## Key Architecture Components

### Language System

The bilingual setup uses:

1. **LANGS.md**: JavaScript-based language picker that checks `localStorage` for `honkit:language` preference (defaults to `zh`)
2. **Custom Plugin**: `plugins/gitbook-plugin-language-pref/` - a local Honkit plugin that handles language preference persistence
3. **Separate SUMMARY.md files**: Each language directory (`en/`, `zh/`) has its own table of contents

The language switcher appears in the top-right corner of the built site.

### Content Organization

- Chapters must exist in both `en/` and `zh/` directories with matching filenames
- Both SUMMARY.md files should have parallel structure to maintain navigation consistency
- Chapter files include frontmatter (title, weight) for Hugo compatibility (legacy from theme exploration)

## Editing Content

When editing chapters:

1. **For content changes**: Edit the corresponding numbered `.md` file in either `en/` or `zh/` directory
2. **For new chapters**: Add the file to both language directories AND update both `SUMMARY.md` files
3. **Test locally**: Always run `npm run start` to verify changes render correctly with the language switcher

## Important Notes

- The root `SUMMARY.md` only contains the home link; actual chapter lists are in `en/SUMMARY.md` and `zh/SUMMARY.md`
- The `themes/hugo-book/` directory is legacy (git submodule) - the project now uses Honkit, not Hugo
- Files previously at root level (e.g., `01_Overview.md`) were moved to language subdirectories - check git history if references seem broken
- The Chinese translation is from the Go-zh community (authorized) and should be preserved with proper attribution
