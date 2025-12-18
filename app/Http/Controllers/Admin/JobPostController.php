<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JobPost;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class JobPostController extends Controller
{
    public function index(Request $request): Response
    {
        $query = JobPost::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('company', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%");
        }

        $jobPosts = $query->latest()->paginate(10);

        return Inertia::render('Admin/JobPosts/Index', [
            'jobPosts' => $jobPosts,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/JobPosts/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'description' => 'required|string',
            'requirements' => 'required|string',
            'location' => 'required|string|max:255',
            'application_url' => 'nullable|url|max:255',
        ]);

        JobPost::create($validated);

        return redirect()->route('admin.job-posts.index')
            ->with('success', 'Job post created successfully.');
    }

    public function edit(JobPost $jobPost): Response
    {
        return Inertia::render('Admin/JobPosts/Edit', [
            'jobPost' => $jobPost,
        ]);
    }

    public function update(Request $request, JobPost $jobPost): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'description' => 'required|string',
            'requirements' => 'required|string',
            'location' => 'required|string|max:255',
            'application_url' => 'nullable|url|max:255',
        ]);

        $jobPost->update($validated);

        return redirect()->route('admin.job-posts.index')
            ->with('success', 'Job post updated successfully.');
    }

    public function destroy(JobPost $jobPost): RedirectResponse
    {
        $jobPost->delete();

        return redirect()->route('admin.job-posts.index')
            ->with('success', 'Job post deleted successfully.');
    }
}
