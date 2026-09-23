<?php

use App\Http\Controllers\Api\V1\Admin\AuthController;
use App\Http\Controllers\Api\V1\Admin\TestimonialController as AdminTestimonialController;
use App\Http\Controllers\Api\V1\HealthController;
use App\Http\Controllers\Api\V1\TestimonialController;
use Illuminate\Support\Facades\Route;

// REST API routes for the Trigon Apex Technologies backend.
// Versioned under /api/v1.
Route::prefix('v1')->name('api.v1.')->group(function () {
    Route::get('/health', HealthController::class)->name('health');

    // Public — returns only permission-approved testimonials.
    Route::get('/testimonials', [TestimonialController::class, 'index'])->name('testimonials.index');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::post('/login', [AuthController::class, 'login'])->name('login');

        Route::middleware('auth:sanctum')->group(function () {
            Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
            Route::get('/me', [AuthController::class, 'me'])->name('me');

            Route::get('/testimonials', [AdminTestimonialController::class, 'index'])->name('testimonials.index');
            Route::get('/testimonials/{testimonial}', [AdminTestimonialController::class, 'show'])->name('testimonials.show');
            Route::post('/testimonials', [AdminTestimonialController::class, 'store'])->name('testimonials.store');
            // POST, not PUT/PATCH — PHP does not reliably parse multipart
            // (file upload) bodies on PUT/PATCH requests.
            Route::post('/testimonials/{testimonial}', [AdminTestimonialController::class, 'update'])->name('testimonials.update');
            Route::delete('/testimonials/{testimonial}', [AdminTestimonialController::class, 'destroy'])->name('testimonials.destroy');
        });
    });
});
