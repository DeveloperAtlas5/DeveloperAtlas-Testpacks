# Starting point

Assume an existing Laravel application contains this route:

```php
Route::get('/status', [StatusController::class, 'show'])->name('status.show');
```

`app/Http/Controllers/StatusController.php`:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\View\View;

final class StatusController
{
    public function show(): View
    {
        return view('status', [
            'label' => 'Operational',
        ]);
    }
}
```

`resources/views/status.blade.php`:

```blade
<x-app-layout>
    <section class="status-card">
        <h1>{{ $label }}</h1>
    </section>
</x-app-layout>
```

The exercise does not include the rest of the application, its tests, or a runtime environment.
