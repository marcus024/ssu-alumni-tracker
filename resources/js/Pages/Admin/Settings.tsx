import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { SchoolInfo } from '@/types';

export default function Settings({ schoolInfo }: { schoolInfo: SchoolInfo | null }) {
    const { data, setData, post, processing, errors } = useForm({
        total_teachers: schoolInfo?.total_teachers?.toString() || '',
        total_departments: schoolInfo?.total_departments?.toString() || '',
        total_branches: schoolInfo?.total_branches?.toString() || '',
        years_established: schoolInfo?.years_established?.toString() || '',
        mission: schoolInfo?.mission || '',
        vision: schoolInfo?.vision || '',
        logo: null as File | null,
        hero_image: null as File | null,
        _method: 'PATCH',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    return (
        <AdminLayout header="School Settings">
            <Head title="School Settings" />

            <div className="max-w-3xl">
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
                    <form onSubmit={submit} className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="total_teachers" value="Total Teachers" />
                                <TextInput
                                    id="total_teachers"
                                    type="number"
                                    min="0"
                                    className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                    value={data.total_teachers}
                                    onChange={(e) => setData('total_teachers', e.target.value)}
                                    required
                                />
                                <InputError message={errors.total_teachers} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="total_departments" value="Total Departments" />
                                <TextInput
                                    id="total_departments"
                                    type="number"
                                    min="0"
                                    className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                    value={data.total_departments}
                                    onChange={(e) => setData('total_departments', e.target.value)}
                                    required
                                />
                                <InputError message={errors.total_departments} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="total_branches" value="Total Branches" />
                                <TextInput
                                    id="total_branches"
                                    type="number"
                                    min="0"
                                    className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                    value={data.total_branches}
                                    onChange={(e) => setData('total_branches', e.target.value)}
                                    required
                                />
                                <InputError message={errors.total_branches} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="years_established" value="Years Established" />
                                <TextInput
                                    id="years_established"
                                    type="number"
                                    min="0"
                                    className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                    value={data.years_established}
                                    onChange={(e) => setData('years_established', e.target.value)}
                                    required
                                />
                                <InputError message={errors.years_established} className="mt-2" />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="mission" value="Mission Statement" />
                            <textarea
                                id="mission"
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                value={data.mission}
                                onChange={(e) => setData('mission', e.target.value)}
                                rows={4}
                                required
                            />
                            <InputError message={errors.mission} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="vision" value="Vision Statement" />
                            <textarea
                                id="vision"
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                value={data.vision}
                                onChange={(e) => setData('vision', e.target.value)}
                                rows={4}
                                required
                            />
                            <InputError message={errors.vision} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="logo" value="School Logo" />
                            {schoolInfo?.logo && (
                                <div className="mt-2 mb-3">
                                    <img
                                        src={`/uploads/${schoolInfo.logo}`}
                                        alt="School Logo"
                                        className="h-24 w-auto"
                                    />
                                </div>
                            )}
                            <input
                                id="logo"
                                type="file"
                                accept="image/*"
                                className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100
                                    dark:file:bg-gray-700 dark:file:text-gray-300"
                                onChange={(e) => setData('logo', e.target.files?.[0] || null)}
                            />
                            {schoolInfo && (
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Leave empty to keep current logo
                                </p>
                            )}
                            <InputError message={errors.logo} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="hero_image" value="Hero Background Image" />
                            {schoolInfo?.hero_image && (
                                <div className="mt-2 mb-3">
                                    <img
                                        src={`/uploads/${schoolInfo.hero_image}`}
                                        alt="Hero Background"
                                        className="h-40 w-full object-cover rounded-lg"
                                    />
                                </div>
                            )}
                            <input
                                id="hero_image"
                                type="file"
                                accept="image/*"
                                className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100
                                    dark:file:bg-gray-700 dark:file:text-gray-300"
                                onChange={(e) => setData('hero_image', e.target.files?.[0] || null)}
                            />
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                This image will be displayed on the home page hero section. Recommended: 1920x1080px
                            </p>
                            {schoolInfo && (
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Leave empty to keep current image
                                </p>
                            )}
                            <InputError message={errors.hero_image} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                            <PrimaryButton disabled={processing}>
                                {processing ? 'Saving...' : 'Save Settings'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
