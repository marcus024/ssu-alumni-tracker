<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    protected $fillable = [
        'name',
        'description',
        'logo',
        'total_students',
        'total_teachers',
    ];

    public function graduates()
    {
        return $this->hasMany(Graduate::class);
    }
}
