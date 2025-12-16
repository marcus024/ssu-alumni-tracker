<?php

namespace App\Http\Controllers\Graduate;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\FundRaising;
use App\Models\JobPost;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return Inertia::render('Graduate/Dashboard', [
            'latestNews' => News::latest()->take(5)->get(),
            'latestJobs' => JobPost::latest()->take(5)->get(),
            'upcomingEvents' => Event::where('is_active', true)
                ->where('event_date', '>=', now())
                ->orderBy('event_date', 'asc')
                ->take(5)
                ->get(),
            'activeFundraisings' => FundRaising::where('is_active', true)
                ->where('end_date', '>=', now())
                ->latest()
                ->take(3)
                ->get(),
            'user' => $user->load('department'),
        ]);
    }
}
