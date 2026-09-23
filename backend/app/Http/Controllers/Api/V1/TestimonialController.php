<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\TestimonialResource;
use App\Http\Responses\ApiResponse;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;

// Public, read-only endpoint. Per docs/CONTENT_ARCHITECTURE.md §7, a
// testimonial must never be shown unless permission-approved — enforced
// here at the query level, not left to the frontend to filter.
class TestimonialController extends Controller
{
    public function index(): JsonResponse
    {
        $testimonials = Testimonial::approved()->latest()->get();

        return ApiResponse::success(TestimonialResource::collection($testimonials));
    }
}
