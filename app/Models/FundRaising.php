<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FundRaising extends Model
{
    protected $fillable = [
        'title',
        'description',
        'goal_amount',
        'current_amount',
        'image',
        'start_date',
        'end_date',
        'account_name',
        'account_number',
        'is_active',
    ];

    protected $casts = [
        'goal_amount' => 'decimal:2',
        'current_amount' => 'decimal:2',
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'is_active' => 'boolean',
    ];

    public function getProgressPercentageAttribute()
    {
        if ($this->goal_amount == 0) {
            return 0;
        }
        return min(100, ($this->current_amount / $this->goal_amount) * 100);
    }

    public function donations(): HasMany
    {
        return $this->hasMany(Donation::class);
    }
}
