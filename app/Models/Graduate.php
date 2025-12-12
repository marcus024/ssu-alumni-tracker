<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Graduate extends Model
{
    protected $fillable = [
        'name',
        'year',
        'course',
        'current_work',
        'department_id',
    ];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
