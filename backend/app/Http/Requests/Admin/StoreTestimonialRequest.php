<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreTestimonialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'client_name' => ['required', 'string', 'max:255'],
            'company' => ['required', 'string', 'max:255'],
            'designation' => ['nullable', 'string', 'max:255'],
            'industry' => ['nullable', 'string', 'max:255'],
            'testimonial' => ['required', 'string', 'max:2000'],
            'related_case_study' => ['nullable', 'string', 'max:255'],
            // Local disk only — validated as a real image, not just by
            // extension. Kept small since it is served directly, unresized.
            'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }
}
