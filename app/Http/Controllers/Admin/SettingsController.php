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

        // Handle logo upload
        if ($request->hasFile('logo')) {
            if ($schoolInfo->logo) {
                Storage::disk('uploads')->delete($schoolInfo->logo);
            }
            $validated['logo'] = $request->file('logo')->store('school', 'uploads');
        }

        // Handle hero image upload
        if ($request->hasFile('hero_image')) {
            if ($schoolInfo->hero_image) {
                Storage::disk('uploads')->delete($schoolInfo->hero_image);
            }
            $validated['hero_image'] = $request->file('hero_image')->store('hero', 'uploads');
        }

        $schoolInfo->fill($validated);
        $schoolInfo->save();

        return redirect()->route('admin.settings.index')
            ->with('success', 'Settings updated successfully.');
    }
}
