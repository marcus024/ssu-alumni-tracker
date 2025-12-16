import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        location: '',
        image: null as File | null,
        event_date: '',
        event_end_date: '',
        is_featured: false,
        is_active: true,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/events');
    };

    return (
        <AdminLayout header="Create Event">
            <Head title="Create Event" />

            <div className="max-w-3xl">
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
                    <form onSubmit={submit} className="p-6 space-y-6">
                        <div>
                            <InputLabel htmlFor="title" value="Event Title" />
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
                            <InputLabel htmlFor="description" value="Description" />
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="event_date" value="Start Date" />
                                <TextInput
                                    id="event_date"
                                    type="date"
                                    className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                    value={data.event_date}
                                    onChange={(e) => setData('event_date', e.target.value)}
                                    required
                                />
                                <InputError message={errors.event_date} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="event_end_date" value="End Date (Optional)" />
                                <TextInput
                                    id="event_end_date"
                                    type="date"
                                    className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                    value={data.event_end_date}
                                    onChange={(e) => setData('event_end_date', e.target.value)}
                                />
                                <InputError message={errors.event_end_date} className="mt-2" />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="location" value="Location" />
                            <TextInput
                                id="location"
                                type="text"
                                className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                            />
                            <InputError message={errors.location} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="image" value="Event Image" />
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
                            <InputError message={errors.image} className="mt-2" />
                        </div>

                        <div className="flex items-center space-x-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 dark:border-gray-700 text-blue-600 shadow-sm focus:ring-blue-500 dark:bg-gray-900"
                                    checked={data.is_featured}
                                    onChange={(e) => setData('is_featured', e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Featured Event</span>
                            </label>

                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 dark:border-gray-700 text-blue-600 shadow-sm focus:ring-blue-500 dark:bg-gray-900"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Active</span>
                            </label>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <Link
                                href="/admin/events"
                                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                            >
                                Cancel
                            </Link>
                            <PrimaryButton disabled={processing}>
                                {processing ? 'Creating...' : 'Create Event'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
