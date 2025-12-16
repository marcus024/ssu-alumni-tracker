<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobApplication extends Model
{
    protected $fillable = [
        'job_post_id',
        'applicant_name',
        'applicant_email',
        'applicant_phone',
        'cover_letter',
        'resume_path',
        'status',
        'notes',
    ];

    public function jobPost(): BelongsTo
    {
        return $this->belongsTo(JobPost::class);
    }
}
