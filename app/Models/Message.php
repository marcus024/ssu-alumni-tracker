<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'graduate_id',
        'sender_name',
        'sender_email',
        'message',
        'is_from_graduate',
        'is_read',
    ];

    protected $casts = [
        'is_from_graduate' => 'boolean',
        'is_read' => 'boolean',
    ];

    /**
     * Get the graduate that the message belongs to
     */
    public function graduate()
    {
        return $this->belongsTo(Graduate::class);
    }
}
