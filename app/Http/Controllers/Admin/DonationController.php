<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use App\Models\FundRaising;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DonationController extends Controller
{
    public function index(Request $request)
    {
        $query = Donation::with('fundRaising');

        // Search filter
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('donor_name', 'like', "%{$search}%")
                  ->orWhere('donor_phone', 'like', "%{$search}%");
            });
        }

        // Status filter
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $donations = $query->latest()->paginate(15);

        return Inertia::render('Admin/Donations/Index', [
            'donations' => $donations,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function updateStatus(Request $request, Donation $donation)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,verified,rejected',
        ]);

        $oldStatus = $donation->status;
        $donation->update(['status' => $validated['status']]);

        // Update fundraising current_amount when donation is verified
        if ($validated['status'] === 'verified' && $oldStatus !== 'verified') {
            $fundraising = $donation->fundRaising;
            $fundraising->increment('current_amount', $donation->amount);
        }

        // Decrease fundraising current_amount if previously verified donation is rejected
        if ($validated['status'] === 'rejected' && $oldStatus === 'verified') {
            $fundraising = $donation->fundRaising;
            $fundraising->decrement('current_amount', $donation->amount);
        }

        return redirect()->back()->with('success', 'Donation status updated successfully.');
    }
}
