<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SchoolInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class SchoolInfoController extends Controller
{
    public function index(): Response
    {
        $schoolInfo = SchoolInfo::first();

        return Inertia::render('Admin/Settings', [
            'schoolInfo' => $schoolInfo,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'total_teachers' => 'required|integer|min:0',
            'total_departments' => 'required|integer|min:0',
            'total_branches' => 'required|integer|min:0',
            'years_established' => 'required|integer|min:0',
            'mission' => 'required|string',
            'vision' => 'required|string',
            'logo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('school', 'public');
        }

        SchoolInfo::create($validated);

        return redirect()->route('admin.school-info.index')
            ->with('success', 'School settings created successfully.');
    }

    public function update(Request $request, SchoolInfo $schoolInfo): RedirectResponse
    {
        $validated = $request->validate([
            'total_teachers' => 'required|integer|min:0',
            'total_departments' => 'required|integer|min:0',
            'total_branches' => 'required|integer|min:0',
            'years_established' => 'required|integer|min:0',
            'mission' => 'required|string',
            'vision' => 'required|string',
            'logo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            if ($schoolInfo->logo) {
                Storage::disk('public')->delete($schoolInfo->logo);
            }
            $validated['logo'] = $request->file('logo')->store('school', 'public');
        }

        $schoolInfo->update($validated);

        return redirect()->route('admin.school-info.index')
            ->with('success', 'School settings updated successfully.');
    }
}
