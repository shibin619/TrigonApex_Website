<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'type',
    'name',
    'email',
    'phone',
    'company',
    'message',
    'status',
    'source',
    'ip_address',
    'user_agent',
])]
class Inquiry extends Model
{
    use HasFactory, SoftDeletes;
}
