import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps, Graduate } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';
import TableFilters from '@/Components/Admin/TableFilters';
import { exportToCSV } from '@/utils/exportHelpers';

interface GraduatesIndexProps extends PageProps {
    graduates: {
        data: Graduate[];
        current_page: number;
        last_page: number;
        total: number;
    };
    filters?: {
        search?: string;
    };
}

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export default function Index({ auth, graduates, filters = {} }: GraduatesIndexProps) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(route('admin.graduates.index'), { search: value }, { preserveState: true });
    };

    const handleClearFilters = () => {
        setSearch('');
        router.get(route('admin.graduates.index'));
    };

    const handleExport = () => {
        const exportData = graduates.data.map(graduate => ({
            name: graduate.name,
            year: graduate.year,
            course: graduate.course,
            department: graduate.department?.name || 'N/A',
            current_work: graduate.current_work,
            status: graduate.status || 'pending',
        }));

        exportToCSV(
            exportData,
            ['name', 'year', 'course', 'department', 'current_work', 'status'],
            'graduates'
        );
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this graduate record?')) {
            router.delete(route('admin.graduates.destroy', id));
        }
    };

    const updateStatus = (graduateId: number, status: string) => {
        router.patch(route('admin.graduates.updateStatus', graduateId), { status });
    };

    return (
        <AdminLayout header="Graduates/Tracer Records">
            <Head title="Graduates/Tracer Records" />

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Graduates/Tracer Records</h2>
                <Link href={route('admin.graduates.create')}>
                    <PrimaryButton>Add Graduate Record</PrimaryButton>
                </Link>
            </div>

            <TableFilters
                searchValue={search}
                onSearchChange={handleSearch}
                searchPlaceholder="Search by name, course, or current work..."
                onExport={handleExport}
                onClear={handleClearFilters}
            />

            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Year</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Course</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Department</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Current Work</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {graduates.data.map((graduate) => (
                                            <tr key={graduate.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium">{graduate.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">{graduate.year}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">{graduate.course}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {graduate.department?.name || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 text-sm">{graduate.current_work}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <select
                                                        value={graduate.status || 'pending'}
                                                        onChange={(e) => updateStatus(graduate.id, e.target.value)}
                                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[graduate.status || 'pending']}`}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="approved">Approved</option>
                                                        <option value="rejected">Rejected</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex justify-end gap-2">
                                                        <Link
                                                            href={route('admin.graduates.edit', graduate.id)}
                                                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(graduate.id)}
                                                            className="text-red-600 hover:text-red-900 dark:text-red-400"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                </table>
            </div>

            {graduates.last_page > 1 && (
                <div className="mt-6 flex justify-between items-center">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                        Showing {graduates.data.length} of {graduates.total} records
                    </div>
                    <div className="flex gap-2">
                        {Array.from({ length: graduates.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={route('admin.graduates.index', { page })}
                                className={`px-3 py-1 rounded ${
                                    page === graduates.current_page
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-200 dark:bg-gray-700'
                                }`}
                            >
                                {page}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
