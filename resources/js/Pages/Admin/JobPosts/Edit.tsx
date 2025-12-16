import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { JobPost } from '@/types';

export default function Edit({ jobPost }: { jobPost: JobPost }) {
    const { data, setData, put, processing, errors } = useForm({
        title: jobPost.title || '',
        company: jobPost.company || '',
        description: jobPost.description || '',
        requirements: jobPost.requirements || '',
        location: jobPost.location || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/admin/job-posts/${jobPost.id}`);
    };

    return (
        <AdminLayout header="Edit Job Post">
            <Head title="Edit Job Post" />

            <div className="max-w-3xl">
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
                    <form onSubmit={submit} className="p-6 space-y-6">
                        <div>
                            <InputLabel htmlFor="title" value="Job Title" />
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="company" value="Company" />
                                <TextInput
                                    id="company"
                                    type="text"
                                    className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                    value={data.company}
                                    onChange={(e) => setData('company', e.target.value)}
                                    required
                                />
                                <InputError message={errors.company} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="location" value="Location" />
                                <TextInput
                                    id="location"
                                    type="text"
                                    className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    required
                                />
                                <InputError message={errors.location} className="mt-2" />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="description" value="Job Description" />
                            <textarea
                                id="description"
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={5}
                                required
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="requirements" value="Requirements" />
                            <textarea
                                id="requirements"
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                value={data.requirements}
                                onChange={(e) => setData('requirements', e.target.value)}
                                rows={5}
                                required
                            />
                            <InputError message={errors.requirements} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <Link
                                href="/admin/job-posts"
                                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                            >
                                Cancel
                            </Link>
                            <PrimaryButton disabled={processing}>
                                {processing ? 'Updating...' : 'Update Job Post'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
