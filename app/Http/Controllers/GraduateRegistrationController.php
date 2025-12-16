<?php

namespace App\Http\Controllers;

use App\Models\Graduate;
use App\Models\Department;
use Illuminate\Http\Request;

class GraduateRegistrationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 10),
            'course' => 'required|string|max:255',
            'current_work' => 'required|string|max:255',
            'department_id' => 'required|exists:departments,id',
        ]);

        $validated['status'] = 'pending';

        Graduate::create($validated);

        return redirect()->back()->with('success', 'Your graduate registration has been submitted for review. Thank you!');
    }
}
