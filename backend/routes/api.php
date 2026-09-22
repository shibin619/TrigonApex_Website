<?php

use App\Http\Controllers\Api\V1\HealthController;
use Illuminate\Support\Facades\Route;

// REST API routes for the Trigon Apex Technologies backend.
// Versioned under /api/v1 — no business endpoints yet.
Route::prefix('v1')->name('api.v1.')->group(function () {
    Route::get('/health', HealthController::class)->name('health');
});
