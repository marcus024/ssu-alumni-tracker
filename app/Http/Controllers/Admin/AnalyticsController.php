<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Graduate;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function index()
    {
        // Total graduates
        $totalGraduates = Graduate::count();
        $approvedGraduates = Graduate::where('status', 'approved')->count();
        $pendingGraduates = Graduate::where('status', 'pending')->count();

        // Graduates by work status
        $graduatesByWorkStatus = Graduate::where('status', 'approved')
            ->select('current_work', DB::raw('count(*) as count'))
            ->groupBy('current_work')
            ->orderByDesc('count')
            ->get();

        // Categorize work status
        $employed = Graduate::where('status', 'approved')
            ->where('current_work', '!=', '')
            ->where('current_work', '!=', 'Unemployed')
            ->where('current_work', '!=', 'Looking for Work')
            ->where('current_work', '!=', 'Not Working')
            ->count();

        $unemployed = Graduate::where('status', 'approved')
            ->where(function($query) {
                $query->where('current_work', '=', 'Unemployed')
                    ->orWhere('current_work', '=', 'Looking for Work')
                    ->orWhere('current_work', '=', 'Not Working')
                    ->orWhere('current_work', '=', '');
            })
            ->count();

        // Graduates by course
        $graduatesByCourse = Graduate::where('status', 'approved')
            ->select('course', DB::raw('count(*) as count'))
            ->groupBy('course')
            ->orderByDesc('count')
            ->get();

        // Graduates by year
        $graduatesByYear = Graduate::where('status', 'approved')
            ->select('year', DB::raw('count(*) as count'))
            ->groupBy('year')
            ->orderBy('year', 'desc')
            ->get();

        // Users who joined vs not joined
        // Joined = graduates who have email matching a user account
        $totalUsers = User::count();
        $graduatesWithEmail = Graduate::whereNotNull('email')
            ->where('email', '!=', '')
            ->where('status', 'approved')
            ->count();

        // Find graduates whose email matches a user account
        $joinedUsers = Graduate::where('status', 'approved')
            ->whereNotNull('email')
            ->where('email', '!=', '')
            ->whereIn('email', User::pluck('email'))
            ->count();

        $notJoinedGraduates = $graduatesWithEmail - $joinedUsers;

        // Recent graduate registrations (last 30 days)
        $recentGraduates = Graduate::where('created_at', '>=', now()->subDays(30))
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->groupBy('date')
            ->orderBy('date', 'desc')
            ->get();

        return Inertia::render('Admin/Analytics', [
            'stats' => [
                'totalGraduates' => $totalGraduates,
                'approvedGraduates' => $approvedGraduates,
                'pendingGraduates' => $pendingGraduates,
                'employed' => $employed,
                'unemployed' => $unemployed,
                'totalUsers' => $totalUsers,
                'joinedUsers' => $joinedUsers,
                'notJoinedGraduates' => $notJoinedGraduates,
            ],
            'graduatesByWorkStatus' => $graduatesByWorkStatus,
            'graduatesByCourse' => $graduatesByCourse,
            'graduatesByYear' => $graduatesByYear,
            'recentGraduates' => $recentGraduates,
        ]);
    }
}
