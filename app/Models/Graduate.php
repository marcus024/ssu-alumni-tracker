<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Graduate extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'year',
        'course',
        'current_work',
        'department_id',
        'status',
        'profile_picture',
        // Section A: General Information
        'surname',
        'first_name',
        'middle_name',
        'permanent_address',
        'sex',
        'civil_status',
        // Section B: Educational Background
        'college_campus',
        'program',
        'major',
        'advance_study_school',
        'advance_study_date_started',
        'advance_study_units_earned',
        'advance_study_date_graduated',
        'advance_study_reasons',
        'advance_study_reasons_other',
        // Section C: Professional Examination
        'exam_name',
        'exam_license_date',
        'exam_year_taken',
        'exam_rating',
        // Section D: Trainings
        'training_title_1',
        'training_title_2',
        'training_title_3',
        // Section E: Employment Data
        'ever_employed',
        'company_name',
        'company_nature',
        'company_email',
        'company_contact',
        'company_address',
        'employment_status',
        'recent_position',
        'business_name',
        'business_address',
        'business_nature',
        'reasons_for_staying',
        'reasons_for_staying_other',
        'reasons_for_unemployment',
        'reasons_for_unemployment_other',
        'first_job_related',
        'unrelated_job_reasons',
        'unrelated_job_reasons_other',
        'job_change_reasons',
        'job_change_reasons_other',
        'first_job_duration',
        'first_job_duration_other',
        'how_found_first_job',
        'how_found_first_job_other',
        'time_to_land_job',
        'time_to_land_job_other',
        'initial_gross_monthly_earning',
        'recent_gross_monthly_earning',
    ];

    protected $casts = [
        'advance_study_reasons' => 'array',
        'employment_status' => 'array',
        'recent_position' => 'array',
        'reasons_for_staying' => 'array',
        'reasons_for_unemployment' => 'array',
        'unrelated_job_reasons' => 'array',
        'job_change_reasons' => 'array',
        'advance_study_date_graduated' => 'date',
        'exam_license_date' => 'date',
    ];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
