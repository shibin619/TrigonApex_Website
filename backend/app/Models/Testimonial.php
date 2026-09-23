<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

#[Fillable([
    'client_name',
    'company',
    'designation',
    'industry',
    'testimonial',
    'photo_path',
    'related_case_study',
    'permission_status',
])]
class Testimonial extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * Resolve the stored disk path into a publicly reachable URL.
     */
    public function getPhotoUrlAttribute(): ?string
    {
        return $this->photo_path ? Storage::disk('public')->url($this->photo_path) : null;
    }

    protected function casts(): array
    {
        return [
            'permission_status' => 'string',
        ];
    }

    public function scopeApproved($query)
    {
        return $query->where('permission_status', 'approved');
    }
}
