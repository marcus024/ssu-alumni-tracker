<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Campus;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $departments = Department::with('campus')->latest()->get();

        return Inertia::render('Admin/Departments/Index', [
            'departments' => $departments,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $campuses = Campus::where('is_active', true)->orderBy('name')->get();

        return Inertia::render('Admin/Departments/Create', [
            'campuses' => $campuses,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'logo' => 'nullable|image|max:2048',
            'total_students' => 'required|integer|min:0',
            'total_teachers' => 'required|integer|min:0',
            'campus_id' => 'required|exists:campuses,id',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('departments', 'uploads');
        }

        Department::create($validated);

        return redirect()->route('admin.departments.index')
            ->with('success', 'Department created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Department $department)
    {
        return Inertia::render('Admin/Departments/Show', [
            'department' => $department,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Department $department)
    {
        $campuses = Campus::where('is_active', true)->orderBy('name')->get();

        return Inertia::render('Admin/Departments/Edit', [
            'department' => $department->load('campus'),
            'campuses' => $campuses,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Department $department)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'logo' => 'nullable|image|max:2048',
            'total_students' => 'required|integer|min:0',
            'total_teachers' => 'required|integer|min:0',
            'campus_id' => 'required|exists:campuses,id',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('logo')) {
            if ($department->logo) {
                Storage::disk('uploads')->delete($department->logo);
            }
            $validated['logo'] = $request->file('logo')->store('departments', 'uploads');
        }

        $department->update($validated);

        return redirect()->route('admin.departments.index')
            ->with('success', 'Department updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        if ($department->logo) {
            Storage::disk('uploads')->delete($department->logo);
        }

        $department->delete();

        return redirect()->route('admin.departments.index')
            ->with('success', 'Department deleted successfully.');
    }
}
