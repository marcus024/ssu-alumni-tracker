import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { FundRaising } from '@/types';

export default function Edit({ fundraising }: { fundraising: FundRaising }) {
    const { data, setData, post, processing, errors } = useForm({
        title: fundraising.title || '',
        description: fundraising.description || '',
        goal_amount: fundraising.goal_amount?.toString() || '',
        current_amount: fundraising.current_amount?.toString() || '0',
        image: null as File | null,
        start_date: fundraising.start_date?.split('T')[0] || '',
        end_date: fundraising.end_date?.split('T')[0] || '',
        account_name: fundraising.account_name || '',
        account_number: fundraising.account_number || '',
        is_active: fundraising.is_active ?? true,
        _method: 'PUT',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/admin/fundraisings/${fundraising.id}`);
    };

    return (
        <AdminLayout header="Edit Fundraising Campaign">
            <Head title="Edit Fundraising Campaign" />

            <div className="max-w-3xl">
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
                    <form onSubmit={submit} className="p-6 space-y-6">
                        <div>
                            <InputLabel htmlFor="title" value="Campaign Title" />
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
                                <InputLabel htmlFor="goal_amount" value="Goal Amount (PHP)" />
                                <TextInput
                                    id="goal_amount"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                    value={data.goal_amount}
                                    onChange={(e) => setData('goal_amount', e.target.value)}
                                    required
                                />
                                <InputError message={errors.goal_amount} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="current_amount" value="Current Amount (PHP)" />
                                <TextInput
                                    id="current_amount"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                    value={data.current_amount}
                                    onChange={(e) => setData('current_amount', e.target.value)}
                                    required
                                />
                                <InputError message={errors.current_amount} className="mt-2" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="start_date" value="Start Date" />
                                <TextInput
                                    id="start_date"
                                    type="date"
                                    className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    required
                                />
                                <InputError message={errors.start_date} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="end_date" value="End Date (Optional)" />
                                <TextInput
                                    id="end_date"
                                    type="date"
                                    className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                />
                                <InputError message={errors.end_date} className="mt-2" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="account_name" value="Account Name (Optional)" />
                                <TextInput
                                    id="account_name"
                                    type="text"
                                    className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                    value={data.account_name}
                                    onChange={(e) => setData('account_name', e.target.value)}
                                />
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Bank account name for donations
                                </p>
                                <InputError message={errors.account_name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="account_number" value="Account Number (Optional)" />
                                <TextInput
                                    id="account_number"
                                    type="text"
                                    className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                    value={data.account_number}
                                    onChange={(e) => setData('account_number', e.target.value)}
                                />
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Bank account number for donations
                                </p>
                                <InputError message={errors.account_number} className="mt-2" />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="image" value="Campaign Image" />
                            {fundraising.image && (
                                <div className="mt-2 mb-3">
                                    <img
                                        src={`/uploads/${fundraising.image}`}
                                        alt={fundraising.title}
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
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 dark:border-gray-700 text-blue-600 shadow-sm focus:ring-blue-500 dark:bg-gray-900"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Active Campaign</span>
                            </label>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <Link
                                href="/admin/fundraisings"
                                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                            >
                                Cancel
                            </Link>
                            <PrimaryButton disabled={processing}>
                                {processing ? 'Updating...' : 'Update Campaign'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
