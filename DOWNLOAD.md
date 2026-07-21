# Downloadable preview preparation

The repository currently offers the complete Control exercise as ordinary files so every artifact is
inspectable before download.

Maintainers can run the manual **Package Control exercise** GitHub workflow. It creates:

- `developer-atlas-control-exercise-v0.1.0.zip`
- `SHA256SUMS.txt`

The workflow uploads an immutable build artifact for review. Publishing a signed or checksum-listed
GitHub Release remains a separate human decision after clean-profile testing.

Until that release decision is made, start directly from [`TRY_ATLAS.md`](TRY_ATLAS.md). Do not trust
an exercise archive from an unofficial source without comparing its checksum to an official release.
