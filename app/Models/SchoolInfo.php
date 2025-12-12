<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SchoolInfo extends Model
{
    protected $table = 'school_info';

    protected $fillable = [
        'total_teachers',
        'total_departments',
        'total_branches',
        'years_established',
        'mission',
        'vision',
        'logo',
    ];
}
