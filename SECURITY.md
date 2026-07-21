# Security policy

Please report suspected vulnerabilities through a private GitHub Security
Advisory for this repository. Do not publish exploit details, credentials,
private source, or unredacted logs in an issue.

## Current public boundary

This repository contains documentation, selected knowledge, public packs, and
small runnable examples. It does not contain the private product monorepo.

Atlas Navigator is designed around these current trust boundaries:

- workspace content remains local;
- the preview has no telemetry or account requirement;
- risky actions require an explicit user decision;
- remote Compendium targets require HTTPS;
- the fixed Laravel route-list command requires a trusted workspace and
  confirmation;
- missing-target creation remains within an open workspace and never overwrites
  an existing file.

Preview software is not a security certification or correctness guarantee.
