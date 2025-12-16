import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { JobApplication, PageProps } from '@/types';
import TableFilters from '@/Components/Admin/TableFilters';
import { useState } from 'react';
import { exportToCSV } from '@/utils/exportHelpers';

interface JobApplicationsIndexProps extends PageProps {
    applications: {
        data: JobApplication[];
        current_page: number;
        last_page: number;
        total: number;
    };
    filters?: {
        search?: string;
        status?: string;
    };
}

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    reviewing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    shortlisted: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    interview: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    offered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export default function Index({ applications, filters = {} }: JobApplicationsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');

    const updateStatus = (applicationId: number, status: string) => {
        router.patch(route('admin.job-applications.updateStatus', applicationId), { status });
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(route('admin.job-applications.index'), { search: value, status: statusFilter }, { preserveState: true });
    };

    const handleStatusFilter = (value: string) => {
        setStatusFilter(value);
        router.get(route('admin.job-applications.index'), { search, status: value }, { preserveState: true });
    };

    const handleClearFilters = () => {
        setSearch('');
        setStatusFilter('');
        router.get(route('admin.job-applications.index'));
    };

    const handleExport = () => {
        const exportData = applications.data.map(app => ({
            applicant_name: app.applicant_name,
            applicant_email: app.applicant_email,
            applicant_phone: app.applicant_phone,
            job_position: app.job_post?.title || '',
            company: app.job_post?.company || '',
            status: app.status,
            applied_date: new Date(app.created_at).toLocaleDateString(),
        }));

        exportToCSV(
            exportData,
            ['applicant_name', 'applicant_email', 'applicant_phone', 'job_position', 'company', 'status', 'applied_date'],
            'job_applications'
        );
    };

    return (
        <AdminLayout header="Job Applications">
            <Head title="Job Applications" />

            <TableFilters
                searchValue={search}
                onSearchChange={handleSearch}
                searchPlaceholder="Search by name, email, or phone..."
                filters={[
                    {
                        name: 'status',
                        label: 'Filter by Status',
                        value: statusFilter,
                        onChange: handleStatusFilter,
                        options: [
                            { value: 'pending', label: 'Pending' },
                            { value: 'reviewing', label: 'Reviewing' },
                            { value: 'shortlisted', label: 'Shortlisted' },
                            { value: 'interview', label: 'Interview' },
                            { value: 'offered', label: 'Offered' },
                            { value: 'rejected', label: 'Rejected' },
                        ],
                    },
                ]}
                onExport={handleExport}
                onClear={handleClearFilters}
            />

            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Applicant</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Job Position</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Applied On</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {applications.data.map((application) => (
                                <tr key={application.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{application.applicant_name}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{application.applicant_email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 dark:text-white">{application.job_post?.title}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{application.job_post?.company}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                        {application.applicant_phone}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(application.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            value={application.status}
                                            onChange={(e) => updateStatus(application.id, e.target.value)}
                                            className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[application.status]}`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="reviewing">Reviewing</option>
                                            <option value="shortlisted">Shortlisted</option>
                                            <option value="interview">Interview</option>
                                            <option value="offered">Offered</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <Link
                                            href={route('admin.job-applications.show', application.id)}
                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
                                        >
                                            View Details
                                        </Link>
                                        {application.resume_path && (
                                            <a
                                                href={`/uploads/${application.resume_path}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ml-3 text-green-600 hover:text-green-900 dark:text-green-400"
                                            >
                                                Resume
                                            </a>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {applications.last_page > 1 && (
                    <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-sm text-gray-700 dark:text-gray-300 text-center">
                            Showing {applications.data.length} of {applications.total} applications
                        </div>
                    </div>
                )}

                {applications.data.length === 0 && (
                    <div className="px-6 py-12 text-center">
                        <p className="text-gray-500 dark:text-gray-400">No job applications yet.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
