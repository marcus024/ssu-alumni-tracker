<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FundRaising;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class FundRaisingController extends Controller
{
    public function index(Request $request): Response
    {
        $query = FundRaising::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
        }

        $fundraisings = $query->latest()->paginate(10);

        return Inertia::render('Admin/Fundraisings/Index', [
            'fundraisings' => $fundraisings,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Fundraisings/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'goal_amount' => 'required|numeric|min:0',
            'current_amount' => 'required|numeric|min:0',
            'image' => 'nullable|image|max:2048',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'account_name' => 'nullable|string|max:255',
            'account_number' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('fundraisings', 'public');
        }

        FundRaising::create($validated);

        return redirect()->route('admin.fundraisings.index')
            ->with('success', 'Fundraising campaign created successfully.');
    }

    public function edit(FundRaising $fundraising): Response
    {
        return Inertia::render('Admin/Fundraisings/Edit', [
            'fundraising' => $fundraising,
        ]);
    }

    public function update(Request $request, FundRaising $fundraising): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'goal_amount' => 'required|numeric|min:0',
            'current_amount' => 'required|numeric|min:0',
            'image' => 'nullable|image|max:2048',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'account_name' => 'nullable|string|max:255',
            'account_number' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($fundraising->image) {
                Storage::disk('public')->delete($fundraising->image);
            }
            $validated['image'] = $request->file('image')->store('fundraisings', 'public');
        }

        $fundraising->update($validated);

        return redirect()->route('admin.fundraisings.index')
            ->with('success', 'Fundraising campaign updated successfully.');
    }

    public function destroy(FundRaising $fundraising): RedirectResponse
    {
        if ($fundraising->image) {
            Storage::disk('public')->delete($fundraising->image);
        }

        $fundraising->delete();

        return redirect()->route('admin.fundraisings.index')
            ->with('success', 'Fundraising campaign deleted successfully.');
    }
}
