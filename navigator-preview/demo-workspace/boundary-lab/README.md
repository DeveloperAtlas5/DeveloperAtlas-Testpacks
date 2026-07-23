# Public-preview boundary lab

This synthetic workspace shows both a resolved flow and two deliberate limitations.

## Expected results

1. `/status` resolves to `StatusController::show` and `resources/views/status.blade.php`.
2. `/reports` identifies `MissingReportController::show`, but no controller file or returned view can be resolved.
3. `/health` is a closure route and is not listed by the version 0.1.0 public parser.

These are parser boundaries, not runtime diagnostics. The private Navigator product contains broader analysis that is not included in this public preview.
