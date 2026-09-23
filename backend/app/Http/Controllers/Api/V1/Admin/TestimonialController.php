<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTestimonialRequest;
use App\Http\Requests\Admin\UpdateTestimonialRequest;
use App\Http\Resources\TestimonialResource;
use App\Http\Responses\ApiResponse;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

// Admin-only CRUD, behind auth:sanctum (see routes/api.php). Photos are
// stored on the local "public" disk (storage/app/public/testimonials) per
// the project's explicit choice not to add a cloud storage dependency.
class TestimonialController extends Controller
{
    public function index(): JsonResponse
    {
        $testimonials = Testimonial::latest()->get();

        return ApiResponse::success(TestimonialResource::collection($testimonials));
    }

    public function show(Testimonial $testimonial): JsonResponse
    {
        return ApiResponse::success(new TestimonialResource($testimonial));
    }

    public function store(StoreTestimonialRequest $request): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('photo')) {
            $data['photo_path'] = $request->file('photo')->store('testimonials', 'public');
        }

        // The admin portal publishes immediately on upload — no
        // pending/review step — so every new row is created as approved.
        $data['permission_status'] = 'approved';

        $testimonial = Testimonial::create($data);

        return ApiResponse::success(new TestimonialResource($testimonial), 'Testimonial published.', 201);
    }

    public function update(UpdateTestimonialRequest $request, Testimonial $testimonial): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('photo')) {
            if ($testimonial->photo_path) {
                Storage::disk('public')->delete($testimonial->photo_path);
            }
            $data['photo_path'] = $request->file('photo')->store('testimonials', 'public');
        }

        $testimonial->update($data);

        return ApiResponse::success(new TestimonialResource($testimonial), 'Testimonial updated.');
    }

    public function destroy(Testimonial $testimonial): JsonResponse
    {
        if ($testimonial->photo_path) {
            Storage::disk('public')->delete($testimonial->photo_path);
        }

        $testimonial->delete();

        return ApiResponse::success(null, 'Testimonial removed.');
    }
}
