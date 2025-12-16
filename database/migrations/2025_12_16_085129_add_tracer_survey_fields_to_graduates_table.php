<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('graduates', function (Blueprint $table) {
            // Section A: General Information
            $table->string('surname')->nullable();
            $table->string('first_name')->nullable();
            $table->string('middle_name')->nullable();
            $table->text('permanent_address')->nullable();
            $table->enum('sex', ['Male', 'Female'])->nullable();
            $table->enum('civil_status', ['Single', 'Married', 'Separated/Divorced', 'Widow/Widower', 'Single Parent'])->nullable();

            // Section B: Educational Background
            $table->string('college_campus')->nullable();
            $table->string('program')->nullable();
            $table->string('major')->nullable();

            // Advanced Studies
            $table->string('advance_study_school')->nullable();
            $table->string('advance_study_date_started')->nullable();
            $table->string('advance_study_units_earned')->nullable();
            $table->date('advance_study_date_graduated')->nullable();
            $table->json('advance_study_reasons')->nullable(); // Multiple choice
            $table->text('advance_study_reasons_other')->nullable();

            // Section C: Professional Examination
            $table->string('exam_name')->nullable();
            $table->date('exam_license_date')->nullable();
            $table->string('exam_year_taken')->nullable();
            $table->text('exam_rating')->nullable();

            // Section D: Trainings
            $table->string('training_title_1')->nullable();
            $table->string('training_title_2')->nullable();
            $table->string('training_title_3')->nullable();

            // Section E: Employment Data
            $table->enum('ever_employed', ['Yes', 'No'])->nullable();

            // Current/Recent Employment
            $table->string('company_name')->nullable();
            $table->string('company_nature')->nullable();
            $table->string('company_email')->nullable();
            $table->string('company_contact')->nullable();
            $table->text('company_address')->nullable();
            $table->json('employment_status')->nullable(); // Multiple choice
            $table->json('recent_position')->nullable(); // Multiple choice

            // Self-Employment
            $table->string('business_name')->nullable();
            $table->text('business_address')->nullable();
            $table->string('business_nature')->nullable();

            // Employment Reasons
            $table->json('reasons_for_staying')->nullable();
            $table->text('reasons_for_staying_other')->nullable();
            $table->json('reasons_for_unemployment')->nullable();
            $table->text('reasons_for_unemployment_other')->nullable();

            // First Job Details
            $table->enum('first_job_related', ['Yes', 'No'])->nullable();
            $table->json('unrelated_job_reasons')->nullable();
            $table->text('unrelated_job_reasons_other')->nullable();
            $table->json('job_change_reasons')->nullable();
            $table->text('job_change_reasons_other')->nullable();
            $table->string('first_job_duration')->nullable();
            $table->text('first_job_duration_other')->nullable();

            // Job Search
            $table->string('how_found_first_job')->nullable();
            $table->text('how_found_first_job_other')->nullable();
            $table->string('time_to_land_job')->nullable();
            $table->text('time_to_land_job_other')->nullable();

            // Salary
            $table->string('initial_gross_monthly_earning')->nullable();
            $table->string('recent_gross_monthly_earning')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('graduates', function (Blueprint $table) {
            $table->dropColumn([
                'surname', 'first_name', 'middle_name', 'permanent_address', 'sex', 'civil_status',
                'college_campus', 'program', 'major',
                'advance_study_school', 'advance_study_date_started', 'advance_study_units_earned',
                'advance_study_date_graduated', 'advance_study_reasons', 'advance_study_reasons_other',
                'exam_name', 'exam_license_date', 'exam_year_taken', 'exam_rating',
                'training_title_1', 'training_title_2', 'training_title_3',
                'ever_employed', 'company_name', 'company_nature', 'company_email', 'company_contact',
                'company_address', 'employment_status', 'recent_position',
                'business_name', 'business_address', 'business_nature',
                'reasons_for_staying', 'reasons_for_staying_other',
                'reasons_for_unemployment', 'reasons_for_unemployment_other',
                'first_job_related', 'unrelated_job_reasons', 'unrelated_job_reasons_other',
                'job_change_reasons', 'job_change_reasons_other',
                'first_job_duration', 'first_job_duration_other',
                'how_found_first_job', 'how_found_first_job_other',
                'time_to_land_job', 'time_to_land_job_other',
                'initial_gross_monthly_earning', 'recent_gross_monthly_earning',
            ]);
        });
    }
};
