import { Head, Link, router, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps, GalleryImage } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

interface GalleryIndexProps extends PageProps {
    images: GalleryImage[];
}

export default function Index({ auth, images }: GalleryIndexProps) {
    const [uploading, setUploading] = useState(false);
    const { data, setData, post, processing, reset } = useForm({
        title: '',
        description: '',
        image: null as File | null,
    });

    const handleUpload: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.gallery.store'), {
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this image?')) {
            router.delete(route('admin.gallery.destroy', id));
        }
    };

    return (
        <AdminLayout header="Gallery Management">
            <Head title="Gallery Management" />

            <div className="space-y-6">
                {/* Upload Form */}
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Upload New Image</h2>
                        <form onSubmit={handleUpload} className="space-y-4">
                            <div>
                                <InputLabel htmlFor="title" value="Title" />
                                <TextInput id="title" type="text" value={data.title} className="mt-1 block w-full" onChange={(e) => setData('title', e.target.value)} required />
                            </div>
                            <div>
                                <InputLabel htmlFor="description" value="Description (Optional)" />
                                <TextInput id="description" type="text" value={data.description || ''} className="mt-1 block w-full" onChange={(e) => setData('description', e.target.value)} />
                            </div>
                            <div>
                                <InputLabel htmlFor="image" value="Image" />
                                <input id="image" type="file" accept="image/*" onChange={(e) => setData('image', e.target.files?.[0] || null)} className="mt-1 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-50 dark:file:bg-indigo-900/50 file:text-indigo-700 dark:file:text-indigo-300" required />
                            </div>
                            <PrimaryButton disabled={processing}>Upload Image</PrimaryButton>
                        </form>
                    </div>

                    {/* Gallery Grid */}
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Gallery Images</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {images.map((img) => (
                                <div key={img.id} className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                                    <img src={`/storage/${img.image}`} alt={img.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                        <h3 className="text-white font-bold truncate">{img.title}</h3>
                                        {img.description && <p className="text-white/80 text-sm truncate">{img.description}</p>}
                                        <button onClick={() => handleDelete(img.id)} className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {images.length === 0 && (
                            <p className="text-center text-gray-500 dark:text-gray-400 py-12">No images uploaded yet.</p>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
