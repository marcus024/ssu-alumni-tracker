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
        $stats = [
            'totalNews' => News::count(),
            'totalJobPosts' => JobPost::count(),
            'totalDepartments' => Department::count(),
            'totalGraduates' => Graduate::count(),
            'totalContacts' => Contact::count(),
            'totalGalleryImages' => GalleryImage::count(),
        ];

        $recentActivity = [
            'news' => News::latest()
                ->take(5)
                ->get(['id', 'title', 'created_at']),
            'jobPosts' => JobPost::latest()
                ->take(5)
                ->get(['id', 'title', 'company', 'created_at']),
            'contacts' => Contact::latest()
                ->take(5)
                ->get(['id', 'name', 'email', 'created_at']),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentActivity' => $recentActivity,
        ]);
    }
}
