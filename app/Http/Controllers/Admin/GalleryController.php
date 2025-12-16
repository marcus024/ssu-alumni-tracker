<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index()
    {
        $images = GalleryImage::latest()->get();

        return Inertia::render('Admin/Gallery/Index', [
            'images' => $images,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|image|max:5120',
        ]);

        $validated['image'] = $request->file('image')->store('gallery', 'uploads');

        GalleryImage::create($validated);

        return redirect()->route('admin.gallery.index')
            ->with('success', 'Image uploaded successfully.');
    }

    public function destroy(GalleryImage $gallery)
    {
        if ($gallery->image) {
            Storage::disk('uploads')->delete($gallery->image);
        }

        $gallery->delete();

        return redirect()->route('admin.gallery.index')
            ->with('success', 'Image deleted successfully.');
    }
}
