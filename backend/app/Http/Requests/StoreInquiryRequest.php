<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

// Public write endpoint shared by two different forms: the /contact page
// (type: contact/consultation/demo_request, matching the comment on the
// inquiries migration and the "Talk to Us" / "Request Consultation" /
// "Request Product Demo" CTAs in content/ctas.ts) and the site-entry
// lead gate (type: site_entry, see components/common/SiteEntryGate.vue —
// a lighter-weight capture with no message field, hence `source` to tell
// the two apart in triage).
class StoreInquiryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type' => ['required', 'string', 'in:contact,consultation,demo_request,site_entry'],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'company' => ['nullable', 'string', 'max:255'],
            'message' => ['nullable', 'string', 'max:2000'],
            // Constrained the same way as `type` — an open free-text field
            // here would let a client stamp any label on its own
            // submission, polluting admin triage instead of just
            // identifying which of the two forms it came from.
            'source' => ['nullable', 'string', 'in:contact_page,site_gate'],
        ];
    }
}
