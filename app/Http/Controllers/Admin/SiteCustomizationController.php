<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSettings;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class SiteCustomizationController extends Controller
{
    public function index()
    {
        $settings = SiteSettings::first();

        // Create default settings if none exist
        if (!$settings) {
            $settings = SiteSettings::create([]);
        }

        return Inertia::render('Admin/Customization', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'logo' => 'nullable|image|max:2048',
            'contact_email' => 'nullable|email|max:255',
            'contact_phone' => 'nullable|string|max:255',
            'contact_address' => 'nullable|string',
            'facebook_url' => 'nullable|url|max:255',
            'twitter_url' => 'nullable|url|max:255',
            'instagram_url' => 'nullable|url|max:255',
            'linkedin_url' => 'nullable|url|max:255',
            'youtube_url' => 'nullable|url|max:255',
        ]);

        $settings = SiteSettings::first();

        if (!$settings) {
            $settings = new SiteSettings();
        }

        // Handle logo upload
        if ($request->hasFile('logo')) {
            // Delete old logo
            if ($settings->logo) {
                Storage::disk('public')->delete($settings->logo);
            }
            $validated['logo'] = $request->file('logo')->store('site-settings', 'public');
        }

        $settings->fill($validated);
        $settings->save();

        return redirect()->back()->with('success', 'Site settings updated successfully.');
    }
}
