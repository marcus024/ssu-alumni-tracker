<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SchoolInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        $schoolInfo = SchoolInfo::first();

        return Inertia::render('Admin/Settings', [
            'schoolInfo' => $schoolInfo,
        ]);
    }

    public function update(Request $request, $id = null)
    {
        $validated = $request->validate([
            'total_teachers' => 'required|integer|min:0',
            'total_departments' => 'required|integer|min:0',
            'total_branches' => 'required|integer|min:0',
            'years_established' => 'required|integer|min:0',
            'mission' => 'required|string',
            'vision' => 'required|string',
            'logo' => 'nullable|image|max:2048',
            'hero_image' => 'nullable|image|max:5120',
        ]);

        $schoolInfo = SchoolInfo::first();

        if (!$schoolInfo) {
            $schoolInfo = new SchoolInfo();
        }

        // Update basic fields
        $schoolInfo->total_teachers = $validated['total_teachers'];
        $schoolInfo->total_departments = $validated['total_departments'];
        $schoolInfo->total_branches = $validated['total_branches'];
        $schoolInfo->years_established = $validated['years_established'];
        $schoolInfo->mission = $validated['mission'];
        $schoolInfo->vision = $validated['vision'];

        // Handle logo upload - only update if a new file is provided
        if ($request->hasFile('logo')) {
            if ($schoolInfo->logo) {
                Storage::disk('uploads')->delete($schoolInfo->logo);
            }
            $schoolInfo->logo = $request->file('logo')->store('school', 'uploads');
        }

        // Handle hero image upload - only update if a new file is provided
        if ($request->hasFile('hero_image')) {
            if ($schoolInfo->hero_image) {
                Storage::disk('uploads')->delete($schoolInfo->hero_image);
            }
            $schoolInfo->hero_image = $request->file('hero_image')->store('hero', 'uploads');
        }

        $schoolInfo->save();

        return redirect()->route('admin.settings.index')
            ->with('success', 'Settings updated successfully.');
    }
}
