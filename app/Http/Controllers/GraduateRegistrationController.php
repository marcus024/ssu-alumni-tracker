<?php

namespace App\Http\Controllers;

use App\Models\Graduate;
use App\Models\Department;
use Illuminate\Http\Request;

class GraduateRegistrationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            // Section A: General Information
            'surname' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:255',
            'permanent_address' => 'required|string',
            'sex' => 'required|in:Male,Female',
            'civil_status' => 'required|in:Single,Married,Separated/Divorced,Widow/Widower,Single Parent',

            // Section B: Educational Background
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 10),
            'college_campus' => 'required|string|max:255',
            'program' => 'required|string|max:255',
            'major' => 'nullable|string|max:255',
            'department_id' => 'required|exists:departments,id',
            'course' => 'required|string|max:255',

            // Advanced Studies
            'advance_study_school' => 'nullable|string|max:255',
            'advance_study_date_started' => 'nullable|string|max:255',
            'advance_study_units_earned' => 'nullable|string|max:255',
            'advance_study_date_graduated' => 'nullable|date',
            'advance_study_reasons' => 'nullable|array',
            'advance_study_reasons.*' => 'string',
            'advance_study_reasons_other' => 'nullable|string',

            // Section C: Professional Examination
            'exam_name' => 'nullable|string|max:255',
            'exam_license_date' => 'nullable|date',
            'exam_year_taken' => 'nullable|string|max:255',
            'exam_rating' => 'nullable|string',

            // Section D: Trainings
            'training_title_1' => 'nullable|string|max:255',
            'training_title_2' => 'nullable|string|max:255',
            'training_title_3' => 'nullable|string|max:255',

            // Section E: Employment Data
            'ever_employed' => 'required|in:Yes,No',

            // Current/Recent Employment (conditional)
            'company_name' => 'nullable|string|max:255',
            'company_nature' => 'nullable|string|max:255',
            'company_email' => 'nullable|email|max:255',
            'company_contact' => 'nullable|string|max:255',
            'company_address' => 'nullable|string',
            'employment_status' => 'nullable|array',
            'employment_status.*' => 'string',
            'recent_position' => 'nullable|array',
            'recent_position.*' => 'string',

            // Self-Employment
            'business_name' => 'nullable|string|max:255',
            'business_address' => 'nullable|string',
            'business_nature' => 'nullable|string|max:255',

            // Employment Reasons
            'reasons_for_staying' => 'nullable|array',
            'reasons_for_staying.*' => 'string',
            'reasons_for_staying_other' => 'nullable|string',
            'reasons_for_unemployment' => 'nullable|array',
            'reasons_for_unemployment.*' => 'string',
            'reasons_for_unemployment_other' => 'nullable|string',

            // First Job Details
            'first_job_related' => 'nullable|in:Yes,No',
            'unrelated_job_reasons' => 'nullable|array',
            'unrelated_job_reasons.*' => 'string',
            'unrelated_job_reasons_other' => 'nullable|string',
            'job_change_reasons' => 'nullable|array',
            'job_change_reasons.*' => 'string',
            'job_change_reasons_other' => 'nullable|string',
            'first_job_duration' => 'nullable|string|max:255',
            'first_job_duration_other' => 'nullable|string',

            // Job Search
            'how_found_first_job' => 'nullable|string|max:255',
            'how_found_first_job_other' => 'nullable|string',
            'time_to_land_job' => 'nullable|string|max:255',
            'time_to_land_job_other' => 'nullable|string',

            // Salary
            'initial_gross_monthly_earning' => 'nullable|string|max:255',
            'recent_gross_monthly_earning' => 'nullable|string|max:255',

            // Profile Picture
            'profile_picture' => 'nullable|image|max:2048', // Max 2MB
        ]);

        // Handle profile picture upload
        if ($request->hasFile('profile_picture')) {
            $profilePicture = $request->file('profile_picture');
            $filename = time() . '_' . $profilePicture->getClientOriginalName();
            $path = $profilePicture->storeAs('profile_pictures', $filename, 'public');
            $validated['profile_picture'] = $path;
        }

        // Compose full name from surname, first_name, and middle_name
        $validated['name'] = trim($validated['surname'] . ', ' . $validated['first_name'] . ' ' . ($validated['middle_name'] ?? ''));

        // Set current_work based on employment data or leave empty
        $validated['current_work'] = $validated['company_name'] ?? ($validated['business_name'] ?? 'Not specified');

        // Set status to pending for admin approval
        $validated['status'] = 'pending';

        Graduate::create($validated);

        return redirect()->back()->with('success', 'Your graduate registration has been submitted for review. Thank you!');
    }
}
