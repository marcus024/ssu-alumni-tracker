import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps, Graduate, Department } from '@/types';
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
    departments: (Department & { graduates_count: number })[];
    totalGraduates: number;
    filters?: {
        search?: string;
        department?: string;
    };
}

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export default function Index({ auth, graduates, departments, totalGraduates, filters = {} }: GraduatesIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedDepartment, setSelectedDepartment] = useState(filters.department || '');

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(route('admin.graduates.index'), { search: value, department: selectedDepartment }, { preserveState: true });
    };

    const handleDepartmentFilter = (value: string) => {
        setSelectedDepartment(value);
        router.get(route('admin.graduates.index'), { search, department: value }, { preserveState: true });
    };

    const handleClearFilters = () => {
        setSearch('');
        setSelectedDepartment('');
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

            {/* Department Count Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Total Card */}
                <div
                    onClick={() => handleDepartmentFilter('')}
                    className={`bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-lg shadow-lg p-6 cursor-pointer transition-transform hover:scale-105 ${!selectedDepartment ? 'ring-4 ring-blue-300' : ''}`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-blue-100">Total Alumni</p>
                            <p className="text-3xl font-bold text-white mt-2">{totalGraduates}</p>
                        </div>
                        <div className="bg-blue-400 bg-opacity-30 rounded-full p-3">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Department Cards */}
                {departments.slice(0, 3).map((dept) => (
                    <div
                        key={dept.id}
                        onClick={() => handleDepartmentFilter(dept.id.toString())}
                        className={`bg-gradient-to-br from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-700 rounded-lg shadow-lg p-6 cursor-pointer transition-transform hover:scale-105 ${selectedDepartment === dept.id.toString() ? 'ring-4 ring-indigo-300' : ''}`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-indigo-100">{dept.name}</p>
                                <p className="text-3xl font-bold text-white mt-2">{dept.graduates_count}</p>
                            </div>
                            <div className="bg-indigo-400 bg-opacity-30 rounded-full p-3">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Additional Departments Dropdown */}
            {departments.length > 3 && (
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Filter by Department
                    </label>
                    <select
                        value={selectedDepartment}
                        onChange={(e) => handleDepartmentFilter(e.target.value)}
                        className="w-full md:w-1/3 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">All Departments ({totalGraduates})</option>
                        {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                                {dept.name} ({dept.graduates_count})
                            </option>
                        ))}
                    </select>
                </div>
            )}

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
