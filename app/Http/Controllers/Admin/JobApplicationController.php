<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobApplicationController extends Controller
{
    public function index(Request $request)
    {
        $query = JobApplication::with('jobPost');

        // Search filter
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('applicant_name', 'like', "%{$search}%")
                  ->orWhere('applicant_email', 'like', "%{$search}%")
                  ->orWhere('applicant_phone', 'like', "%{$search}%");
            });
        }

        // Status filter
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Job post filter
        if ($request->filled('job_post_id')) {
            $query->where('job_post_id', $request->job_post_id);
        }

        $applications = $query->latest()->paginate(15);

        return Inertia::render('Admin/JobApplications/Index', [
            'applications' => $applications,
            'filters' => $request->only(['search', 'status', 'job_post_id']),
        ]);
    }

    public function show(JobApplication $application)
    {
        $application->load('jobPost');

        return Inertia::render('Admin/JobApplications/Show', [
            'application' => $application,
        ]);
    }

    public function updateStatus(Request $request, JobApplication $application)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,reviewing,shortlisted,interview,offered,rejected',
            'notes' => 'nullable|string',
        ]);

        $application->update($validated);

        return redirect()->back()->with('success', 'Application status updated successfully.');
    }
}
