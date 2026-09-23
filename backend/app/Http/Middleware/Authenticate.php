<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

// This is an API-only app with no "login" web route to redirect to, so an
// unauthenticated request must always get a 401 JSON response — never a
// redirect attempt, which would crash with RouteNotFoundException for any
// client that doesn't send Accept: application/json.
class Authenticate extends Middleware
{
    protected function redirectTo(Request $request): ?string
    {
        return null;
    }
}
