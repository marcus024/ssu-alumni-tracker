import { Head, useForm, Link } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Campus } from '@/types';

interface Props {
    campuses: Campus[];
}

export default function Create({ campuses }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        total_students: 0,
        total_teachers: 0,
        campus_id: '',
        is_active: true,
        logo: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.departments.store'));
    };

    return (
        <AdminLayout>
            <Head title="Create Department" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    Create New Department
                                </h2>
                                <Link
                                    href={route('admin.departments.index')}
                                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                                >
                                    Back to List
                                </Link>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Department Name" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="campus_id" value="Campus *" />
                                    <select
                                        id="campus_id"
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                        value={data.campus_id}
                                        onChange={(e) => setData('campus_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Select a campus</option>
                                        {campuses.map((campus) => (
                                            <option key={campus.id} value={campus.id}>
                                                {campus.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.campus_id} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="description" value="Description" />
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm"
                                        rows={4}
                                        required
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel htmlFor="total_students" value="Total Students" />
                                        <TextInput
                                            id="total_students"
                                            type="number"
                                            value={data.total_students}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('total_students', parseInt(e.target.value))}
                                            required
                                        />
                                        <InputError message={errors.total_students} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="total_teachers" value="Total Teachers" />
                                        <TextInput
                                            id="total_teachers"
                                            type="number"
                                            value={data.total_teachers}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('total_teachers', parseInt(e.target.value))}
                                            required
                                        />
                                        <InputError message={errors.total_teachers} className="mt-2" />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="logo" value="Department Logo" />
                                    <input
                                        id="logo"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('logo', e.target.files?.[0] || null)}
                                        className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-md file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-indigo-50 file:text-indigo-700
                                            hover:file:bg-indigo-100
                                            dark:file:bg-indigo-900/50 dark:file:text-indigo-300"
                                    />
                                    <InputError message={errors.logo} className="mt-2" />
                                </div>

                                {/* Active Status */}
                                <div className="flex items-center">
                                    <input
                                        id="is_active"
                                        type="checkbox"
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-700"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                    />
                                    <InputLabel htmlFor="is_active" value="Active" className="ml-2" />
                                </div>

                                <div className="flex items-center justify-end gap-4">
                                    <Link
                                        href={route('admin.departments.index')}
                                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                                    >
                                        Cancel
                                    </Link>
                                    <PrimaryButton disabled={processing}>
                                        Create Department
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
