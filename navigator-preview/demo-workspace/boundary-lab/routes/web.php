<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\MissingReportController;

Route::get('/status', [StatusController::class, 'show'])->name('status.show');

// The controller file is intentionally absent. The public preview can show the
// declared target, but it cannot resolve a returned Blade view.
Route::get('/reports', [MissingReportController::class, 'show'])->name('reports.show');

// Closure routes are intentionally outside the limited public parser boundary.
Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});
