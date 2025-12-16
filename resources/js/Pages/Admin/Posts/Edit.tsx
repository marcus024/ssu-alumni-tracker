import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Post } from '@/types';

export default function Edit({ post }: { post: Post }) {
    const { data, setData, post: postForm, processing, errors } = useForm({
        title: post.title || '',
        content: post.content || '',
        image: null as File | null,
        is_published: post.is_published || false,
        _method: 'PUT',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        postForm(`/admin/posts/${post.id}`);
    };

    return (
        <AdminLayout header="Edit Post">
            <Head title="Edit Post" />

            <div className="max-w-3xl">
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
                    <form onSubmit={submit} className="p-6 space-y-6">
                        <div>
                            <InputLabel htmlFor="title" value="Title" />
                            <TextInput
                                id="title"
                                type="text"
                                className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                required
                                isFocused
                            />
                            <InputError message={errors.title} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="content" value="Content" />
                            <textarea
                                id="content"
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                rows={10}
                                required
                            />
                            <InputError message={errors.content} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="image" value="Featured Image" />
                            {post.image && (
                                <div className="mt-2 mb-3">
                                    <img
                                        src={`/storage/${post.image}`}
                                        alt={post.title}
                                        className="h-32 w-auto rounded-lg object-cover"
                                    />
                                </div>
                            )}
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
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Leave empty to keep current image
                            </p>
                            <InputError message={errors.image} className="mt-2" />
                        </div>

                        <div className="flex items-center">
                            <input
                                id="is_published"
                                type="checkbox"
                                className="rounded border-gray-300 dark:border-gray-700 text-blue-600 shadow-sm focus:ring-blue-500 dark:bg-gray-900 dark:focus:ring-offset-gray-800"
                                checked={data.is_published}
                                onChange={(e) => setData('is_published', e.target.checked)}
                            />
                            <InputLabel htmlFor="is_published" value="Published" className="ml-2" />
                            <InputError message={errors.is_published} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <Link
                                href="/admin/posts"
                                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                            >
                                Cancel
                            </Link>
                            <PrimaryButton disabled={processing}>
                                {processing ? 'Updating...' : 'Update Post'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
