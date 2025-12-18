<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Graduate;
use App\Models\Department;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register', [
            'departments' => Department::all(),
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            // Account & Authentication
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],

            // Section A: General Information
            'surname' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
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

            // Advanced Studies (Optional)
            'advance_study_school' => 'nullable|string|max:255',
            'advance_study_date_started' => 'nullable|string|max:255',
            'advance_study_units_earned' => 'nullable|string|max:255',
            'advance_study_date_graduated' => 'nullable|date',
            'advance_study_reasons' => 'nullable|array',
            'advance_study_reasons_other' => 'nullable|string',

            // Section C: Professional Examination (Optional)
            'exam_name' => 'nullable|string|max:255',
            'exam_license_date' => 'nullable|date',
            'exam_year_taken' => 'nullable|string|max:255',
            'exam_rating' => 'nullable|string',

            // Section D: Trainings (Optional)
            'training_title_1' => 'nullable|string|max:255',
            'training_title_2' => 'nullable|string|max:255',
            'training_title_3' => 'nullable|string|max:255',

            // Section E: Employment Data
            'ever_employed' => 'required|in:Yes,No',

            // Current/Recent Employment (Required if employed)
            'company_name' => $request->ever_employed === 'Yes' ? 'required|string|max:255' : 'nullable|string|max:255',
            'company_nature' => $request->ever_employed === 'Yes' ? 'nullable|string|max:255' : 'nullable|string|max:255',
            'company_email' => 'nullable|email|max:255',
            'company_contact' => 'nullable|string|max:255',
            'company_address' => 'nullable|string',
            'employment_status' => 'nullable|array',
            'recent_position' => 'nullable|array',
            'current_work' => 'nullable|string|max:255',

            // Self-Employment (Optional)
            'business_name' => 'nullable|string|max:255',
            'business_address' => 'nullable|string',
            'business_nature' => 'nullable|string|max:255',

            // Employment Reasons
            'reasons_for_staying' => 'nullable|array',
            'reasons_for_staying_other' => 'nullable|string',
            'reasons_for_unemployment' => 'nullable|array',
            'reasons_for_unemployment_other' => 'nullable|string',

            // First Job Details
            'first_job_related' => 'nullable|in:Yes,No',
            'unrelated_job_reasons' => 'nullable|array',
            'unrelated_job_reasons_other' => 'nullable|string',
            'job_change_reasons' => 'nullable|array',
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

            // Activity Images
            'activity_images.*' => 'nullable|image|max:5120', // Max 5MB each
        ]);

        // Handle profile picture upload
        $profilePicturePath = null;
        if ($request->hasFile('profile_picture')) {
            $profilePicture = $request->file('profile_picture');
            $filename = time() . '_' . $profilePicture->getClientOriginalName();
            $profilePicturePath = $profilePicture->storeAs('profile_pictures', $filename, 'public');
        }

        // Handle activity images upload
        $activityImagePaths = [];
        if ($request->hasFile('activity_images')) {
            foreach ($request->file('activity_images') as $index => $image) {
                $filename = time() . '_activity_' . $index . '_' . $image->getClientOriginalName();
                $path = $image->storeAs('activity_images', $filename, 'public');
                $activityImagePaths[] = $path;
            }
        }

        // Compose full name from parts
        $fullName = trim($validated['first_name'] . ' ' . ($validated['middle_name'] ?? '') . ' ' . $validated['surname']);

        // Create User for authentication
        $user = User::create([
            'name' => $fullName,
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'graduate',
            'phone' => $validated['phone'],
            'year' => $validated['year'],
            'course' => $validated['course'],
            'current_work' => $validated['current_work'] ?? 'Not specified',
            'department_id' => $validated['department_id'],
            'status' => 'pending', // Graduate accounts need approval
        ]);

        // Create Graduate profile with all tracer survey data
        Graduate::create([
            'name' => $fullName,
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'year' => $validated['year'],
            'course' => $validated['course'],
            'current_work' => $validated['current_work'] ?? 'Not specified',
            'department_id' => $validated['department_id'],
            'status' => 'pending',

            // Section A: General Information
            'surname' => $validated['surname'],
            'first_name' => $validated['first_name'],
            'middle_name' => $validated['middle_name'],
            'permanent_address' => $validated['permanent_address'],
            'sex' => $validated['sex'],
            'civil_status' => $validated['civil_status'],

            // Section B: Educational Background
            'college_campus' => $validated['college_campus'],
            'program' => $validated['program'],
            'major' => $validated['major'],
            'advance_study_school' => $validated['advance_study_school'],
            'advance_study_date_started' => $validated['advance_study_date_started'],
            'advance_study_units_earned' => $validated['advance_study_units_earned'],
            'advance_study_date_graduated' => $validated['advance_study_date_graduated'],
            'advance_study_reasons' => $validated['advance_study_reasons'],
            'advance_study_reasons_other' => $validated['advance_study_reasons_other'],

            // Section C: Professional Examination
            'exam_name' => $validated['exam_name'],
            'exam_license_date' => $validated['exam_license_date'],
            'exam_year_taken' => $validated['exam_year_taken'],
            'exam_rating' => $validated['exam_rating'],

            // Section D: Trainings
            'training_title_1' => $validated['training_title_1'],
            'training_title_2' => $validated['training_title_2'],
            'training_title_3' => $validated['training_title_3'],

            // Section E: Employment Data
            'ever_employed' => $validated['ever_employed'],
            'company_name' => $validated['company_name'],
            'company_nature' => $validated['company_nature'],
            'company_email' => $validated['company_email'],
            'company_contact' => $validated['company_contact'],
            'company_address' => $validated['company_address'],
            'employment_status' => $validated['employment_status'],
            'recent_position' => $validated['recent_position'],
            'business_name' => $validated['business_name'],
            'business_address' => $validated['business_address'],
            'business_nature' => $validated['business_nature'],
            'reasons_for_staying' => $validated['reasons_for_staying'],
            'reasons_for_staying_other' => $validated['reasons_for_staying_other'],
            'reasons_for_unemployment' => $validated['reasons_for_unemployment'],
            'reasons_for_unemployment_other' => $validated['reasons_for_unemployment_other'],
            'first_job_related' => $validated['first_job_related'],
            'unrelated_job_reasons' => $validated['unrelated_job_reasons'],
            'unrelated_job_reasons_other' => $validated['unrelated_job_reasons_other'],
            'job_change_reasons' => $validated['job_change_reasons'],
            'job_change_reasons_other' => $validated['job_change_reasons_other'],
            'first_job_duration' => $validated['first_job_duration'],
            'first_job_duration_other' => $validated['first_job_duration_other'],
            'how_found_first_job' => $validated['how_found_first_job'],
            'how_found_first_job_other' => $validated['how_found_first_job_other'],
            'time_to_land_job' => $validated['time_to_land_job'],
            'time_to_land_job_other' => $validated['time_to_land_job_other'],
            'initial_gross_monthly_earning' => $validated['initial_gross_monthly_earning'],
            'recent_gross_monthly_earning' => $validated['recent_gross_monthly_earning'],

            // Profile Picture
            'profile_picture' => $profilePicturePath,

            // Activity Images
            'activity_images' => $activityImagePaths,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect()->route('graduate.dashboard');
    }
}
