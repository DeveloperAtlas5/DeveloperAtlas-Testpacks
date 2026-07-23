# Public preview release review

Use this checklist before merging or publishing the expanded public experience.

## Public boundary

- [ ] Review the complete pull-request diff.
- [ ] Confirm no private Navigator, Control, Compendium, Human Preference Baseline, tester, or strategy source was copied.
- [ ] Run `npm run manifest:build`, review the manifest diff, then run `npm run validate`.
- [ ] Confirm `dist/` remains generated and uncommitted.

## Dependency-free release gates

Run:

```bash
npm run verify:public-preview
```

This validates the public tree, Control examples, runnable exercise, clean-room Compendium data, limited Navigator source and allowlists, demo workspace, Pages bundle, PR policy, checksums, and package contents.

## Browser gate

On CI or a clean machine with Playwright installed, run:

```bash
npm ci
npx playwright install --with-deps chromium
npm run test:browser
```

Do not describe the browser gate as passed until that hosted-origin run completes successfully. Local dependency-free verification does not replace it.

## Manual product review

- [ ] Open Control Lite and complete Accept, Revise, and Reject examples.
- [ ] Confirm the exported record links to an existing public Compendium node or the catalog.
- [ ] Search the Compendium and inspect source, version, limitation, AI-assistance, and independent-review states.
- [ ] Install the generated Navigator VSIX in a clean VS Code profile and open both demo workspaces.
- [ ] Confirm the Pages artifact links between Control Lite and Compendium without a broken path.
- [ ] Review keyboard navigation, focus visibility, mobile layout, and screen-reader status messages.

## Publication

- [ ] Merge only after the public-boundary and Navigator packaging workflows pass.
- [ ] Publish the Navigator artifact manually; do not imply Marketplace signing or production readiness.
- [ ] Run the manual `Deploy Atlas public preview` workflow only after repository Pages settings are approved.
- [ ] Record the published checksums and release URL in the release notes.
