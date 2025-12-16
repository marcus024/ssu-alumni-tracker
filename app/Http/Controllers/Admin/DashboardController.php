<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\JobPost;
use App\Models\Department;
use App\Models\Graduate;
use App\Models\Contact;
use App\Models\GalleryImage;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index(): Response
    {
        // Key metrics
        $stats = [
            'totalUsers' => \App\Models\User::count(),
            'totalGraduates' => Graduate::count(),
            'activeEvents' => \App\Models\Event::where('is_active', true)->count(),
            'activeFundraisings' => \App\Models\FundRaising::where('is_active', true)->count(),
            'totalJobApplications' => \App\Models\JobApplication::count(),
            'pendingDonations' => \App\Models\Donation::where('status', 'pending')->count(),
        ];

        // Activity trend data (last 7 days)
        $activityTrend = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $activityTrend[] = [
                'date' => $date->format('M d'),
                'users' => \App\Models\User::whereDate('created_at', $date->toDateString())->count(),
                'graduates' => Graduate::whereDate('created_at', $date->toDateString())->count(),
                'contacts' => Contact::whereDate('created_at', $date->toDateString())->count(),
            ];
        }

        // Department stats for chart
        $departmentStats = Department::withCount('graduates')
            ->orderBy('graduates_count', 'desc')
            ->limit(6)
            ->get()
            ->map(function ($dept) {
                return [
                    'name' => $dept->name,
                    'count' => $dept->graduates_count,
                ];
            });

        // Fundraising progress
        $fundraisingProgress = \App\Models\FundRaising::where('is_active', true)
            ->get()
            ->map(function ($fr) {
                return [
                    'title' => $fr->title,
                    'percentage' => min(100, ($fr->current_amount / $fr->goal_amount) * 100),
                    'raised' => $fr->current_amount,
                    'goal' => $fr->goal_amount,
                ];
            });

        // Job application status breakdown
        $jobApplicationStats = [
            'pending' => \App\Models\JobApplication::where('status', 'pending')->count(),
            'reviewing' => \App\Models\JobApplication::where('status', 'reviewing')->count(),
            'shortlisted' => \App\Models\JobApplication::where('status', 'shortlisted')->count(),
            'interview' => \App\Models\JobApplication::where('status', 'interview')->count(),
            'offered' => \App\Models\JobApplication::where('status', 'offered')->count(),
            'rejected' => \App\Models\JobApplication::where('status', 'rejected')->count(),
        ];

        // Recent activity
        $recentActivity = [
            'jobApplications' => \App\Models\JobApplication::with('jobPost')
                ->latest()
                ->take(5)
                ->get(['id', 'job_post_id', 'applicant_name', 'status', 'created_at']),
            'donations' => \App\Models\Donation::with('fundRaising')
                ->latest()
                ->take(5)
                ->get(['id', 'fund_raising_id', 'donor_name', 'amount', 'status', 'created_at']),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'activityTrend' => $activityTrend,
            'departmentStats' => $departmentStats,
            'fundraisingProgress' => $fundraisingProgress,
            'jobApplicationStats' => $jobApplicationStats,
            'recentActivity' => $recentActivity,
        ]);
    }
}
