<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Graduate;
use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GraduateController extends Controller
{
    public function index(Request $request)
    {
        $query = Graduate::with('department');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('course', 'like', "%{$search}%")
                  ->orWhere('current_work', 'like', "%{$search}%");
            });
        }

        $graduates = $query->latest()->paginate(15);

        return Inertia::render('Admin/Graduates/Index', [
            'graduates' => $graduates,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Graduates/Create', [
            'departments' => Department::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 10),
            'course' => 'required|string|max:255',
            'current_work' => 'required|string|max:255',
            'department_id' => 'required|exists:departments,id',
        ]);

        Graduate::create($validated);

        return redirect()->route('admin.graduates.index')
            ->with('success', 'Graduate record created successfully.');
    }

    public function edit(Graduate $graduate)
    {
        return Inertia::render('Admin/Graduates/Edit', [
            'graduate' => $graduate->load('department'),
            'departments' => Department::all(),
        ]);
    }

    public function update(Request $request, Graduate $graduate)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 10),
            'course' => 'required|string|max:255',
            'current_work' => 'required|string|max:255',
            'department_id' => 'required|exists:departments,id',
        ]);

        $graduate->update($validated);

        return redirect()->route('admin.graduates.index')
            ->with('success', 'Graduate record updated successfully.');
    }

    public function destroy(Graduate $graduate)
    {
        $graduate->delete();

        return redirect()->route('admin.graduates.index')
            ->with('success', 'Graduate record deleted successfully.');
    }

    public function updateStatus(Request $request, Graduate $graduate)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,approved,rejected',
        ]);

        $graduate->update(['status' => $validated['status']]);

        return redirect()->back()->with('success', 'Graduate status updated successfully.');
    }
}
