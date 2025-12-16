<?php

use App\Http\Controllers\ProfileController;
use App\Models\News;
use App\Models\JobPost;
use App\Models\Department;
use App\Models\Graduate;
use App\Models\GalleryImage;
use App\Models\SchoolInfo;
use App\Models\Contact;
use App\Models\Event;
use App\Models\FundRaising;
use App\Models\Post;
use App\Models\ChatMessage;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'news' => News::latest()->get(),
        'jobPosts' => JobPost::latest()->get(),
        'departments' => Department::all(),
        'graduates' => Graduate::with('department')->where('status', 'approved')->latest()->get(),
        'galleryImages' => GalleryImage::latest()->get(),
        'schoolInfo' => SchoolInfo::first(),
        'events' => Event::where('is_active', true)->orderBy('event_date', 'asc')->get(),
        'fundraisings' => FundRaising::where('is_active', true)->latest()->get(),
    ]);
});

Route::post('/contact', function () {
    request()->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'message' => 'required|string',
    ]);

    Contact::create(request()->only(['name', 'email', 'message']));

    return redirect()->back();
})->name('contact.store');

Route::post('/donate', [App\Http\Controllers\DonationController::class, 'store'])->name('donate.store');

Route::post('/job-applications', [App\Http\Controllers\JobApplicationController::class, 'store'])->name('job-applications.store');

Route::post('/graduate/register', [App\Http\Controllers\GraduateRegistrationController::class, 'store'])->name('graduate.register');

// Public Department Details
Route::get('/departments/{department}', function (Department $department) {
    return Inertia::render('DepartmentDetails', [
        'department' => $department->load('graduates'),
        'schoolInfo' => SchoolInfo::first(),
    ]);
})->name('departments.show');

// Redirect /dashboard based on user role
Route::get('/dashboard', function () {
    $user = auth()->user();

    if ($user && $user->isAdmin()) {
        return redirect()->route('admin.dashboard');
    }

    return redirect()->route('graduate.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Graduate routes
Route::prefix('graduate')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\Graduate\DashboardController::class, 'index'])->name('graduate.dashboard');
});

// Admin routes
Route::prefix('admin')->middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('admin.dashboard');

    // Analytics routes
    Route::get('/analytics', [App\Http\Controllers\Admin\AnalyticsController::class, 'index'])->name('admin.analytics.index');

    // News routes
    Route::resource('news', App\Http\Controllers\Admin\NewsController::class)->names([
        'index' => 'admin.news.index',
        'create' => 'admin.news.create',
        'store' => 'admin.news.store',
        'show' => 'admin.news.show',
        'edit' => 'admin.news.edit',
        'update' => 'admin.news.update',
        'destroy' => 'admin.news.destroy',
    ]);

    // Job Posts routes
    Route::resource('job-posts', App\Http\Controllers\Admin\JobPostController::class)->names([
        'index' => 'admin.job-posts.index',
        'create' => 'admin.job-posts.create',
        'store' => 'admin.job-posts.store',
        'show' => 'admin.job-posts.show',
        'edit' => 'admin.job-posts.edit',
        'update' => 'admin.job-posts.update',
        'destroy' => 'admin.job-posts.destroy',
    ]);

    // Departments routes
    Route::resource('departments', App\Http\Controllers\Admin\DepartmentController::class)->names([
        'index' => 'admin.departments.index',
        'create' => 'admin.departments.create',
        'store' => 'admin.departments.store',
        'show' => 'admin.departments.show',
        'edit' => 'admin.departments.edit',
        'update' => 'admin.departments.update',
        'destroy' => 'admin.departments.destroy',
    ]);

    // Graduates routes
    Route::resource('graduates', App\Http\Controllers\Admin\GraduateController::class)->names([
        'index' => 'admin.graduates.index',
        'create' => 'admin.graduates.create',
        'store' => 'admin.graduates.store',
        'show' => 'admin.graduates.show',
        'edit' => 'admin.graduates.edit',
        'update' => 'admin.graduates.update',
        'destroy' => 'admin.graduates.destroy',
    ]);
    Route::patch('/graduates/{graduate}/status', [App\Http\Controllers\Admin\GraduateController::class, 'updateStatus'])->name('admin.graduates.updateStatus');

    // Gallery routes
    Route::resource('gallery', App\Http\Controllers\Admin\GalleryController::class)->names([
        'index' => 'admin.gallery.index',
        'create' => 'admin.gallery.create',
        'store' => 'admin.gallery.store',
        'show' => 'admin.gallery.show',
        'edit' => 'admin.gallery.edit',
        'update' => 'admin.gallery.update',
        'destroy' => 'admin.gallery.destroy',
    ]);

    // School Info routes
    Route::get('/school-info', [App\Http\Controllers\Admin\SchoolInfoController::class, 'edit'])->name('admin.school-info.edit');
    Route::patch('/school-info', [App\Http\Controllers\Admin\SchoolInfoController::class, 'update'])->name('admin.school-info.update');

    // Contacts routes
    Route::get('/contacts', [App\Http\Controllers\Admin\ContactController::class, 'index'])->name('admin.contacts.index');
    Route::get('/contacts/{contact}', [App\Http\Controllers\Admin\ContactController::class, 'show'])->name('admin.contacts.show');
    Route::delete('/contacts/{contact}', [App\Http\Controllers\Admin\ContactController::class, 'destroy'])->name('admin.contacts.destroy');

    // Events routes
    Route::resource('events', App\Http\Controllers\Admin\EventController::class)->names([
        'index' => 'admin.events.index',
        'create' => 'admin.events.create',
        'store' => 'admin.events.store',
        'show' => 'admin.events.show',
        'edit' => 'admin.events.edit',
        'update' => 'admin.events.update',
        'destroy' => 'admin.events.destroy',
    ]);

    // FundRaising routes
    Route::resource('fundraisings', App\Http\Controllers\Admin\FundRaisingController::class)->names([
        'index' => 'admin.fundraisings.index',
        'create' => 'admin.fundraisings.create',
        'store' => 'admin.fundraisings.store',
        'show' => 'admin.fundraisings.show',
        'edit' => 'admin.fundraisings.edit',
        'update' => 'admin.fundraisings.update',
        'destroy' => 'admin.fundraisings.destroy',
    ]);

    // Posts routes
    Route::resource('posts', App\Http\Controllers\Admin\PostController::class)->names([
        'index' => 'admin.posts.index',
        'create' => 'admin.posts.create',
        'store' => 'admin.posts.store',
        'show' => 'admin.posts.show',
        'edit' => 'admin.posts.edit',
        'update' => 'admin.posts.update',
        'destroy' => 'admin.posts.destroy',
    ]);

    // Users routes
    Route::resource('users', App\Http\Controllers\Admin\UserController::class)->names([
        'index' => 'admin.users.index',
        'create' => 'admin.users.create',
        'store' => 'admin.users.store',
        'show' => 'admin.users.show',
        'edit' => 'admin.users.edit',
        'update' => 'admin.users.update',
        'destroy' => 'admin.users.destroy',
    ]);

    // Chat routes
    Route::get('/chat', [App\Http\Controllers\Admin\ChatController::class, 'index'])->name('admin.chat.index');
    Route::post('/chat', [App\Http\Controllers\Admin\ChatController::class, 'store'])->name('admin.chat.store');
    Route::get('/chat/messages', [App\Http\Controllers\Admin\ChatController::class, 'messages'])->name('admin.chat.messages');

    // Settings routes
    Route::get('/settings', [App\Http\Controllers\Admin\SettingsController::class, 'index'])->name('admin.settings.index');
    Route::patch('/settings', [App\Http\Controllers\Admin\SettingsController::class, 'update'])->name('admin.settings.update');

    // Site Customization routes
    Route::get('/customization', [App\Http\Controllers\Admin\SiteCustomizationController::class, 'index'])->name('admin.customization.index');
    Route::post('/customization', [App\Http\Controllers\Admin\SiteCustomizationController::class, 'update'])->name('admin.customization.update');

    // Job Applications routes
    Route::get('/job-applications', [App\Http\Controllers\Admin\JobApplicationController::class, 'index'])->name('admin.job-applications.index');
    Route::get('/job-applications/{application}', [App\Http\Controllers\Admin\JobApplicationController::class, 'show'])->name('admin.job-applications.show');
    Route::patch('/job-applications/{application}/status', [App\Http\Controllers\Admin\JobApplicationController::class, 'updateStatus'])->name('admin.job-applications.updateStatus');

    // Donations routes
    Route::get('/donations', [App\Http\Controllers\Admin\DonationController::class, 'index'])->name('admin.donations.index');
    Route::patch('/donations/{donation}/status', [App\Http\Controllers\Admin\DonationController::class, 'updateStatus'])->name('admin.donations.updateStatus');

    // Live View route
    Route::get('/live-view', function () {
        return Inertia::render('Admin/LiveView');
    })->name('admin.live-view');
});

require __DIR__.'/auth.php';
