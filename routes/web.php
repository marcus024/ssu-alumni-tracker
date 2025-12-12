<?php

use App\Http\Controllers\ProfileController;
use App\Models\News;
use App\Models\JobPost;
use App\Models\Department;
use App\Models\Graduate;
use App\Models\GalleryImage;
use App\Models\SchoolInfo;
use App\Models\Contact;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'news' => News::latest()->get(),
        'jobPosts' => JobPost::latest()->get(),
        'departments' => Department::all(),
        'graduates' => Graduate::with('department')->latest()->get(),
        'galleryImages' => GalleryImage::latest()->get(),
        'schoolInfo' => SchoolInfo::first(),
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

// Redirect /dashboard to admin dashboard
Route::get('/dashboard', function () {
    return redirect('/admin/dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin routes
Route::prefix('admin')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('admin.dashboard');

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
});

require __DIR__.'/auth.php';
