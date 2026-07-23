# Clean Laravel-shaped demo

This is a synthetic, non-runnable Laravel-shaped workspace for the limited Atlas Navigator public preview. It contains conventional route, controller, and Blade-view patterns without `vendor/`, Composer dependencies, a database, or application secrets.

## Expected flows

- `GET /` → `HomeController::index` → `welcome.blade.php`
- `GET /users` → `UserController::index` → `users/index.blade.php`
- `GET /users/{id}` → `UserController::show` → `users/show.blade.php`

The closure-based `/about` route remains in the sample to make the public parser boundary visible: version 0.1.0 detects controller-array routes only.
