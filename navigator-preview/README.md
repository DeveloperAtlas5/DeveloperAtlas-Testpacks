# Atlas Navigator — limited public preview

This directory contains a deliberately small, independently buildable VS Code extension. It demonstrates one public capability:

> Trace conventional Laravel `Route::method(... [Controller::class, 'method'])` entries to a controller method and returned Blade view.

It is not the private Navigator product and does not include its complete parsers, impact index, Git comparison, diagnostics engine, Vue/Inertia support, Compendium integration, or proprietary Control runtime.

## Build the preview VSIX

Requirements: Node.js 22 and the `zip` command.

```bash
npm run navigator:build
```

The ignored `dist/navigator-preview/` directory will contain:

- a `.vsix` package;
- a SHA-256 checksum;
- a package manifest listing every bundled file and the four public knowledge nodes.

## Install locally

1. Build the package or download the GitHub Actions artifact.
2. In VS Code, choose **Extensions: Install from VSIX…**.
3. Open a Laravel-shaped workspace containing `routes/web.php`.
4. Use **Atlas Preview: Show Current Laravel Flow** or open the **Atlas Preview** activity-bar view.

## Public boundary

The build reads only exact paths in [`config/navigator-preview-allowlist.json`](../config/navigator-preview-allowlist.json). The package contains four nodes that are already public: Route, Controller, Blade View, and Laravel Request Lifecycle. Packaging fails if a file name suggests private, internal, review, complete index, or Atlas Control content.

The preview performs static text analysis only. It does not run Artisan, execute project commands, send telemetry, or claim that a discovered flow is complete.
