<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInquiryRequest;
use App\Http\Responses\ApiResponse;
use App\Models\Inquiry;
use Illuminate\Http\JsonResponse;

// Public write endpoint backing the /contact page. No data is read back
// out to the client — this only ever creates a new, unreviewed inquiry
// (status defaults to "new") for admin triage, same source/ip/user-agent
// capture the inquiries migration was built for.
class InquiryController extends Controller
{
    public function store(StoreInquiryRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['status'] = 'new';
        $data['source'] = 'contact_page';
        $data['ip_address'] = $request->ip();
        $data['user_agent'] = $request->userAgent();

        Inquiry::create($data);

        return ApiResponse::success(null, 'Thanks — we\'ll be in touch.', 201);
    }
}
