import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { FundRaising, PageProps } from '@/types';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';

interface FundraisingsIndexProps extends PageProps {
    fundraisings: {
        data: FundRaising[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
    };
}

export default function Index({ fundraisings, filters }: FundraisingsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingItem, setDeletingItem] = useState<FundRaising | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/fundraisings', { search }, { preserveState: true });
    };

    const handleDelete = (item: FundRaising) => {
        setDeletingItem(item);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (deletingItem) {
            router.delete(`/admin/fundraisings/${deletingItem.id}`, {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setDeletingItem(null);
                },
            });
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <AdminLayout header="Fundraising Management">
            <Head title="Fundraising Management" />

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <form onSubmit={handleSearch} className="flex-1 max-w-md">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search campaigns..."
                            className="flex-1 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <PrimaryButton type="submit">Search</PrimaryButton>
                    </div>
                </form>

                <Link href="/admin/fundraisings/create">
                    <PrimaryButton>
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Campaign
                    </PrimaryButton>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {fundraisings.data.length > 0 ? (
                    fundraisings.data.map((campaign) => (
                        <div key={campaign.id} className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                            {campaign.image && (
                                <img
                                    src={`/storage/${campaign.image}`}
                                    alt={campaign.title}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {campaign.title}
                                    </h3>
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            campaign.is_active
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                        }`}
                                    >
                                        {campaign.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                    {campaign.description}
                                </p>

                                <div className="mb-4">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {Math.min(((campaign.current_amount / campaign.goal_amount) * 100), 100).toFixed(0)}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all"
                                            style={{ width: `${Math.min(((campaign.current_amount / campaign.goal_amount) * 100), 100)}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-sm mt-1">
                                        <span className="text-gray-600 dark:text-gray-400">
                                            {formatCurrency(campaign.current_amount)} raised
                                        </span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            of {formatCurrency(campaign.goal_amount)}
                                        </span>
                                    </div>
                                </div>

                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                                    <div>Start: {formatDate(campaign.start_date)}</div>
                                    {campaign.end_date && <div>End: {formatDate(campaign.end_date)}</div>}
                                </div>

                                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <Link
                                        href={`/admin/fundraisings/${campaign.id}/edit`}
                                        className="flex-1 text-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(campaign)}
                                        className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-2 text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400">
                            No campaigns found. Create your first fundraising campaign to get started.
                        </p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {fundraisings.last_page > 1 && (
                <div className="mt-6 bg-white dark:bg-gray-800 px-4 py-3 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                            Showing page {fundraisings.current_page} of {fundraisings.last_page}
                        </div>
                        <div className="flex gap-2">
                            {fundraisings.current_page > 1 && (
                                <Link
                                    href={`/admin/fundraisings?page=${fundraisings.current_page - 1}${search ? `&search=${search}` : ''}`}
                                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    Previous
                                </Link>
                            )}
                            {fundraisings.current_page < fundraisings.last_page && (
                                <Link
                                    href={`/admin/fundraisings?page=${fundraisings.current_page + 1}${search ? `&search=${search}` : ''}`}
                                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && deletingItem && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowDeleteModal(false)}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-red-600 dark:text-red-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                            Delete Campaign
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Are you sure you want to delete "{deletingItem.title}"? This action cannot be undone.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <DangerButton onClick={confirmDelete} className="w-full sm:w-auto sm:ml-3">
                                    Delete
                                </DangerButton>
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteModal(false)}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 sm:mt-0 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
