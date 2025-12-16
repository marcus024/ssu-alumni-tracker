import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps } from '@/types';
import TableFilters from '@/Components/Admin/TableFilters';
import { useState } from 'react';
import { exportToCSV } from '@/utils/exportHelpers';

interface Donation {
    id: number;
    fund_raising_id: number;
    fund_raising?: {
        id: number;
        title: string;
    };
    donor_name: string;
    donor_phone: string;
    donor_address: string;
    amount: number;
    receipt_path: string;
    status: 'pending' | 'verified' | 'rejected';
    created_at: string;
}

interface DonationsIndexProps extends PageProps {
    donations: {
        data: Donation[];
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
    verified: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export default function Index({ donations, filters = {} }: DonationsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');

    const updateStatus = (donationId: number, status: string) => {
        router.patch(route('admin.donations.updateStatus', donationId), { status });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
        }).format(amount);
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(route('admin.donations.index'), { search: value, status: statusFilter }, { preserveState: true });
    };

    const handleStatusFilter = (value: string) => {
        setStatusFilter(value);
        router.get(route('admin.donations.index'), { search, status: value }, { preserveState: true });
    };

    const handleClearFilters = () => {
        setSearch('');
        setStatusFilter('');
        router.get(route('admin.donations.index'));
    };

    const handleExport = () => {
        const exportData = donations.data.map(donation => ({
            donor_name: donation.donor_name,
            donor_phone: donation.donor_phone,
            donor_address: donation.donor_address,
            campaign: donation.fund_raising?.title || '',
            amount: donation.amount,
            status: donation.status,
            date: new Date(donation.created_at).toLocaleDateString(),
        }));

        exportToCSV(
            exportData,
            ['donor_name', 'donor_phone', 'donor_address', 'campaign', 'amount', 'status', 'date'],
            'donations'
        );
    };

    return (
        <AdminLayout header="Donations Management">
            <Head title="Donations" />

            <TableFilters
                searchValue={search}
                onSearchChange={handleSearch}
                searchPlaceholder="Search by donor name or phone..."
                filters={[
                    {
                        name: 'status',
                        label: 'Filter by Status',
                        value: statusFilter,
                        onChange: handleStatusFilter,
                        options: [
                            { value: 'pending', label: 'Pending' },
                            { value: 'verified', label: 'Verified' },
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Donor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Campaign</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Receipt</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {donations.data.map((donation) => (
                                <tr key={donation.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{donation.donor_name}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{donation.donor_phone}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 dark:text-white">{donation.fund_raising?.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                                            {formatCurrency(donation.amount)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 dark:text-white">{donation.donor_phone}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{donation.donor_address}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(donation.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            value={donation.status}
                                            onChange={(e) => updateStatus(donation.id, e.target.value)}
                                            className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[donation.status]}`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="verified">Verified</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <a
                                            href={`/uploads/${donation.receipt_path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
                                        >
                                            View Receipt
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {donations.last_page > 1 && (
                    <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-sm text-gray-700 dark:text-gray-300 text-center">
                            Showing {donations.data.length} of {donations.total} donations
                        </div>
                    </div>
                )}

                {donations.data.length === 0 && (
                    <div className="px-6 py-12 text-center">
                        <p className="text-gray-500 dark:text-gray-400">No donations yet.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
