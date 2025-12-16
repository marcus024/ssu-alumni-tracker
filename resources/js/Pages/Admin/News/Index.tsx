import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { News, PageProps } from '@/types';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import DeleteModal from '@/Components/Admin/DeleteModal';

interface NewsIndexProps extends PageProps {
    news: {
        data: News[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
    };
}

export default function Index({ news, filters }: NewsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingItem, setDeletingItem] = useState<News | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/news', { search }, { preserveState: true });
    };

    const handleDelete = (item: News) => {
        setDeletingItem(item);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (deletingItem) {
            router.delete(`/admin/news/${deletingItem.id}`, {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setDeletingItem(null);
                },
            });
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <AdminLayout header="News Management">
            <Head title="News Management" />

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <form onSubmit={handleSearch} className="flex-1 max-w-md">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search news..."
                            className="flex-1 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <PrimaryButton type="submit">Search</PrimaryButton>
                    </div>
                </form>

                <Link href="/admin/news/create">
                    <PrimaryButton>
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add News
                    </PrimaryButton>
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Content Preview
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {news.data.length > 0 ? (
                                news.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                {item.image && (
                                                    <img
                                                        src={`/storage/${item.image}`}
                                                        alt={item.title}
                                                        className="h-10 w-10 rounded object-cover mr-3"
                                                    />
                                                )}
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {item.title}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                                {item.content}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {formatDate(item.created_at)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link
                                                href={`/admin/news/${item.id}/edit`}
                                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item)}
                                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                                        No news articles found. Create your first article to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {news.last_page > 1 && (
                    <div className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                Showing page {news.current_page} of {news.last_page}
                            </div>
                            <div className="flex gap-2">
                                {news.current_page > 1 && (
                                    <Link
                                        href={`/admin/news?page=${news.current_page - 1}${search ? `&search=${search}` : ''}`}
                                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        Previous
                                    </Link>
                                )}
                                {news.current_page < news.last_page && (
                                    <Link
                                        href={`/admin/news?page=${news.current_page + 1}${search ? `&search=${search}` : ''}`}
                                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        Next
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <DeleteModal
                show={showDeleteModal}
                title="Delete News Article"
                message={`Are you sure you want to delete "${deletingItem?.title}"? This action cannot be undone.`}
                onConfirm={confirmDelete}
                onCancel={() => setShowDeleteModal(false)}
            />
        </AdminLayout>
    );
}
