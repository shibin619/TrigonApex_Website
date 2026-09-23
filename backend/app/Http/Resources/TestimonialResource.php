<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

// Shapes each row to match the frontend's existing Testimonial TypeScript
// interface (frontend/app/content/testimonials.ts) so the public section
// component needs no field-mapping of its own.
class TestimonialResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'clientName' => $this->client_name,
            'photo' => $this->photo_path ? [
                'src' => $this->photo_url,
                'alt' => $this->client_name,
            ] : null,
            'company' => $this->company,
            'designation' => $this->designation,
            'industry' => $this->industry,
            'testimonial' => $this->testimonial,
            'relatedCaseStudy' => $this->related_case_study,
            'permissionStatus' => $this->permission_status,
        ];
    }
}
