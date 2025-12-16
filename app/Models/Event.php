<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'title',
        'description',
        'location',
        'image',
        'event_date',
        'event_end_date',
        'is_featured',
        'is_active',
    ];

    protected $casts = [
        'event_date' => 'datetime',
        'event_end_date' => 'datetime',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
    ];
}
