<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Models\FundRaising;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DonationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'fund_raising_id' => 'required|exists:fund_raisings,id',
            'donor_name' => 'required|string|max:255',
            'donor_phone' => 'required|string|max:255',
            'donor_address' => 'required|string',
            'amount' => 'required|numeric|min:1',
            'receipt' => 'required|file|mimes:jpg,jpeg,png,pdf|max:5120',
        ]);

        // Store receipt file
        $receiptPath = $request->file('receipt')->store('donations/receipts', 'public');

        // Create donation
        Donation::create([
            'fund_raising_id' => $validated['fund_raising_id'],
            'donor_name' => $validated['donor_name'],
            'donor_phone' => $validated['donor_phone'],
            'donor_address' => $validated['donor_address'],
            'amount' => $validated['amount'],
            'receipt_path' => $receiptPath,
            'status' => 'pending',
        ]);

        return redirect()->back()->with('success', 'Thank you for your donation! Your submission is pending verification.');
    }
}
