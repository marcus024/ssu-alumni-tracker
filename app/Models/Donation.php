<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Donation extends Model
{
    protected $fillable = [
        'fund_raising_id',
        'donor_name',
        'donor_phone',
        'donor_address',
        'amount',
        'receipt_path',
        'status',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
    ];

    public function fundRaising(): BelongsTo
    {
        return $this->belongsTo(FundRaising::class);
    }
}
