# Remaining Admin Modules - Implementation Guide

## Modules Still Needed

The following modules follow the exact same pattern as the implemented modules (Events, Fundraising, News, JobPosts, Contacts). You can use these as templates:

### 1. Users Management
**Files to Create:**
- `resources/js/Pages/Admin/Users/Index.tsx`
- `resources/js/Pages/Admin/Users/Create.tsx`
- `resources/js/Pages/Admin/Users/Edit.tsx`

**Controller to Update:**
- `app/Http/Controllers/Admin/UserController.php`

**Reference:** Use NewsController and News pages as template

**Fields:**
- name (string)
- email (string)
- password (password, only on create)
- role (select: admin, user)

---

### 2. Posts Management
**Files to Create:**
- `resources/js/Pages/Admin/Posts/Index.tsx`
- `resources/js/Pages/Admin/Posts/Create.tsx`
- `resources/js/Pages/Admin/Posts/Edit.tsx`

**Controller to Update:**
- `app/Http/Controllers/Admin/PostController.php`

**Reference:** Use NewsController and News pages as template

**Fields:**
- title (string)
- content (textarea)
- image (file upload)
- is_published (boolean)
- user_id (auto-filled from auth)

---

### 3. Departments Management
**Files to Create:**
- `resources/js/Pages/Admin/Departments/Index.tsx`
- `resources/js/Pages/Admin/Departments/Create.tsx`
- `resources/js/Pages/Admin/Departments/Edit.tsx`

**Controller to Update:**
- `app/Http/Controllers/Admin/DepartmentController.php`

**Reference:** Use NewsController and News pages as template

**Fields:**
- name (string)
- description (textarea)
- logo (file upload)
- total_students (number)
- total_teachers (number)

---

### 4. Graduates Management
**Files to Create:**
- `resources/js/Pages/Admin/Graduates/Index.tsx`
- `resources/js/Pages/Admin/Graduates/Create.tsx`
- `resources/js/Pages/Admin/Graduates/Edit.tsx`

**Controller to Update:**
- `app/Http/Controllers/Admin/GraduateController.php`

**Reference:** Use JobPostController and JobPosts pages as template

**Fields:**
- name (string)
- year (number)
- course (string)
- current_work (string)
- department_id (select from departments)

---

### 5. Gallery Management
**Files to Create:**
- `resources/js/Pages/Admin/Gallery/Index.tsx` - Grid view with upload
- `resources/js/Pages/Admin/Gallery/Create.tsx` - Bulk upload interface

**Controller to Update:**
- `app/Http/Controllers/Admin/GalleryController.php`

**Reference:** Use EventController for image handling

**Special Features:**
- Grid layout instead of table
- Bulk image upload support
- Lightbox preview
- Image title and description

**Fields:**
- title (string)
- description (textarea, optional)
- image (file upload, required)

---

## Quick Implementation Pattern

For each module, follow these steps:

### Step 1: Create Index Page
```tsx
// Example structure based on News/Index.tsx
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { YourType, PageProps } from '@/types';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import DeleteModal from '@/Components/Admin/DeleteModal';

// 1. Define props interface
// 2. Add search state
// 3. Add delete modal state
// 4. Create table/grid layout
// 5. Add search form
// 6. Add pagination if needed
```

### Step 2: Create Create Page
```tsx
// Example structure based on News/Create.tsx
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

// 1. Define form fields with useForm
// 2. Create submit handler
// 3. Build form with proper validation
// 4. Add cancel/save buttons
```

### Step 3: Create Edit Page
```tsx
// Example structure based on News/Edit.tsx
// Same as Create but:
// 1. Accept resource as prop
// 2. Initialize form with existing data
// 3. Use PUT method (_method: 'PUT')
// 4. Show current image/data if exists
```

### Step 4: Update Controller
```php
// Example structure based on NewsController.php
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\YourModel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class YourController extends Controller
{
    public function index(Request $request)
    {
        $query = YourModel::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where('field', 'like', "%{$search}%");
        }

        $items = $query->latest()->paginate(10);

        return Inertia::render('Admin/YourModule/Index', [
            'items' => $items,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/YourModule/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            // your validation rules
        ]);

        // Handle file upload if needed
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('folder', 'public');
        }

        YourModel::create($validated);

        return redirect()->route('admin.your-route.index')
            ->with('success', 'Item created successfully.');
    }

    public function edit(YourModel $item)
    {
        return Inertia::render('Admin/YourModule/Edit', [
            'item' => $item,
        ]);
    }

    public function update(Request $request, YourModel $item)
    {
        $validated = $request->validate([
            // your validation rules
        ]);

        if ($request->hasFile('image')) {
            if ($item->image) {
                Storage::disk('public')->delete($item->image);
            }
            $validated['image'] = $request->file('image')->store('folder', 'public');
        }

        $item->update($validated);

        return redirect()->route('admin.your-route.index')
            ->with('success', 'Item updated successfully.');
    }

    public function destroy(YourModel $item)
    {
        if ($item->image) {
            Storage::disk('public')->delete($item->image);
        }

        $item->delete();

        return redirect()->route('admin.your-route.index')
            ->with('success', 'Item deleted successfully.');
    }
}
```

### Step 5: Add Routes
```php
// In routes/web.php
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('your-route', YourController::class);
});
```

### Step 6: Update Model
```php
// Ensure your model has fillable fields
protected $fillable = [
    'field1',
    'field2',
    'field3',
    // ...
];
```

## Common Components to Reuse

All components are already available in the project:

1. **DeleteModal** - `resources/js/Components/Admin/DeleteModal.tsx`
2. **PrimaryButton** - `resources/js/Components/PrimaryButton.tsx`
3. **TextInput** - `resources/js/Components/TextInput.tsx`
4. **InputLabel** - `resources/js/Components/InputLabel.tsx`
5. **InputError** - `resources/js/Components/InputError.tsx`
6. **AdminLayout** - `resources/js/Layouts/AdminLayout.tsx`

## File Upload Pattern

For any module with images:

```tsx
// In form
<input
    id="image"
    type="file"
    accept="image/*"
    className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
        file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-50 file:text-blue-700
        hover:file:bg-blue-100
        dark:file:bg-gray-700 dark:file:text-gray-300"
    onChange={(e) => setData('image', e.target.files?.[0] || null)}
/>
```

## Search Pattern

```tsx
const [search, setSearch] = useState(filters.search || '');

const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get('/admin/your-route', { search }, { preserveState: true });
};
```

## Pagination Pattern

```tsx
{items.last_page > 1 && (
    <div className="bg-white dark:bg-gray-800 px-4 py-3 border-t">
        <div className="flex items-center justify-between">
            <div className="text-sm">
                Page {items.current_page} of {items.last_page}
            </div>
            <div className="flex gap-2">
                {/* Previous/Next buttons */}
            </div>
        </div>
    </div>
)}
```

## TypeScript Types

All types are defined in `resources/js/types/index.d.ts`. Make sure to add types for new models there.

## Estimated Time per Module

- **Simple module** (like News): 30-45 minutes
- **Module with relations** (like Graduates): 45-60 minutes
- **Gallery with special features**: 60-90 minutes

## Testing Each Module

1. Create a new item
2. Edit the item
3. Search for the item
4. Delete the item
5. Test image upload (if applicable)
6. Test form validation
7. Test pagination
8. Test dark mode
9. Test mobile view

## Tips

1. Copy an existing similar module and rename it
2. Use find/replace to change model names
3. Test each CRUD operation before moving to next
4. Always handle image cleanup on delete
5. Use consistent naming conventions
6. Add proper validation rules
7. Include success messages
8. Test error cases

Good luck! The patterns are all established, so these remaining modules should be straightforward to implement.
