import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { JobPost, PageProps } from '@/types';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import DeleteModal from '@/Components/Admin/DeleteModal';

interface JobPostsIndexProps extends PageProps {
    jobPosts: {
        data: JobPost[];
        current_page: number;
        last_page: number;
        total: number;
    };
    filters: { search?: string };
}

export default function Index({ jobPosts, filters }: JobPostsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingItem, setDeletingItem] = useState<JobPost | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/job-posts', { search }, { preserveState: true });
    };

    const handleDelete = (item: JobPost) => {
        setDeletingItem(item);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (deletingItem) {
            router.delete(`/admin/job-posts/${deletingItem.id}`, {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setDeletingItem(null);
                },
            });
        }
    };

    return (
        <AdminLayout header="Job Posts Management">
            <Head title="Job Posts Management" />

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <form onSubmit={handleSearch} className="flex-1 max-w-md">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search jobs..."
                            className="flex-1 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <PrimaryButton type="submit">Search</PrimaryButton>
                    </div>
                </form>

                <Link href="/admin/job-posts/create">
                    <PrimaryButton>
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Job Post
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
                                    Company
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Location
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {jobPosts.data.length > 0 ? (
                                jobPosts.data.map((job) => (
                                    <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {job.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {job.company}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {job.location}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link
                                                href={`/admin/job-posts/${job.id}/edit`}
                                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 mr-4"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(job)}
                                                className="text-red-600 hover:text-red-900 dark:text-red-400"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                                        No job posts found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <DeleteModal
                show={showDeleteModal}
                title="Delete Job Post"
                message={`Are you sure you want to delete "${deletingItem?.title}"?`}
                onConfirm={confirmDelete}
                onCancel={() => setShowDeleteModal(false)}
            />
        </AdminLayout>
    );
}
