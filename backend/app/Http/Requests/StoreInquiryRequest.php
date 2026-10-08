<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

// Public contact form submission — the `type` values match the comment
// on the inquiries migration (contact, consultation, demo_request), one
// per "Talk to Us" / "Request Consultation" / "Request Product Demo" CTA
// in content/ctas.ts.
class StoreInquiryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type' => ['required', 'string', 'in:contact,consultation,demo_request'],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'company' => ['nullable', 'string', 'max:255'],
            'message' => ['nullable', 'string', 'max:2000'],
        ];
    }
}
