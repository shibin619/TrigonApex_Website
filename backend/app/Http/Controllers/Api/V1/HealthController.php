<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Responses\ApiResponse;
use Illuminate\Http\JsonResponse;

class HealthController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return ApiResponse::success([
            'application' => config('app.name'),
            'api_version' => 'v1',
            'laravel_version' => app()->version(),
            'environment' => app()->environment(),
            'timestamp' => now()->toIso8601String(),
        ], 'API is healthy.');
    }
}
