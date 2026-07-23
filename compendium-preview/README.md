# Atlas Compendium — clean-room public preview

This static preview is built only from exact public node and evidence paths in [`config/compendium-preview-allowlist.json`](../config/compendium-preview-allowlist.json). It does not import or copy the private Compendium application, full Canon index, complete Lexicon, internal review packets, or private knowledge source.

## Use locally

Open `compendium-preview/index.html` in a modern browser. The generated data is embedded in `data.js`, so search and node reading work without a server or network connection. External primary-source links require internet access.

## Rebuild and verify

```bash
npm run compendium:build
npm run compendium:check
npm run test:compendium
```

The builder escapes public Markdown before generating article HTML and fingerprints every allowlisted source and evidence file.

## Publish manually

The `Deploy Atlas public preview` GitHub Actions workflow is manual. It rebuilds and validates the allowlisted data, creates an integrated Pages bundle containing Control Lite and this Compendium preview, tests the cross-surface links, and deploys `dist/pages`. Enable and run it only after reviewing the pull request and repository Pages settings.
