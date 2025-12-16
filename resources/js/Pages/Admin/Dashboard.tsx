import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

interface DashboardProps {
    stats: {
        totalUsers: number;
        totalGraduates: number;
        activeEvents: number;
        activeFundraisings: number;
        totalJobApplications: number;
        pendingDonations: number;
    };
    activityTrend: Array<{ date: string; users: number; graduates: number; contacts: number }>;
    departmentStats: Array<{ name: string; count: number }>;
    fundraisingProgress: Array<{ title: string; percentage: number; raised: number; goal: number }>;
    jobApplicationStats: {
        pending: number;
        reviewing: number;
        shortlisted: number;
        interview: number;
        offered: number;
        rejected: number;
    };
    recentActivity: {
        jobApplications: Array<any>;
        donations: Array<any>;
    };
}

export default function Dashboard({
    stats,
    activityTrend,
    departmentStats,
    fundraisingProgress,
    jobApplicationStats,
    recentActivity,
}: DashboardProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
        }).format(amount);
    };

    // Calculate max value for activity trend chart
    const maxValue = Math.max(
        ...activityTrend.map((d) => Math.max(d.users, d.graduates, d.contacts)),
        1
    );

    // Calculate max for department chart
    const maxDeptCount = Math.max(...departmentStats.map((d) => d.count), 1);

    const statusColors: Record<string, string> = {
        pending: '#EAB308',
        reviewing: '#3B82F6',
        shortlisted: '#8B5CF6',
        interview: '#6366F1',
        offered: '#10B981',
        rejected: '#EF4444',
    };

    return (
        <AdminLayout header="Dashboard">
            <Head title="Dashboard" />

            {/* Key Stats Cards - Only 6 important ones */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Link
                    href="/admin/users"
                    className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white hover:shadow-lg transition-shadow"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100 text-sm font-medium">Total Users</p>
                            <p className="text-4xl font-bold mt-2">{stats.totalUsers}</p>
                        </div>
                        <div className="bg-white bg-opacity-20 rounded-full p-4">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                    </div>
                </Link>

                <Link
                    href="/admin/graduates"
                    className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white hover:shadow-lg transition-shadow"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-100 text-sm font-medium">Total Graduates</p>
                            <p className="text-4xl font-bold mt-2">{stats.totalGraduates}</p>
                        </div>
                        <div className="bg-white bg-opacity-20 rounded-full p-4">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                            </svg>
                        </div>
                    </div>
                </Link>

                <Link
                    href="/admin/events"
                    className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white hover:shadow-lg transition-shadow"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-100 text-sm font-medium">Active Events</p>
                            <p className="text-4xl font-bold mt-2">{stats.activeEvents}</p>
                        </div>
                        <div className="bg-white bg-opacity-20 rounded-full p-4">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                </Link>

                <Link
                    href="/admin/fundraisings"
                    className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white hover:shadow-lg transition-shadow"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-yellow-100 text-sm font-medium">Active Fundraising</p>
                            <p className="text-4xl font-bold mt-2">{stats.activeFundraisings}</p>
                        </div>
                        <div className="bg-white bg-opacity-20 rounded-full p-4">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </Link>

                <Link
                    href="/admin/job-applications"
                    className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 text-white hover:shadow-lg transition-shadow"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-indigo-100 text-sm font-medium">Job Applications</p>
                            <p className="text-4xl font-bold mt-2">{stats.totalJobApplications}</p>
                        </div>
                        <div className="bg-white bg-opacity-20 rounded-full p-4">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                    </div>
                </Link>

                <Link
                    href="/admin/donations"
                    className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white hover:shadow-lg transition-shadow"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-red-100 text-sm font-medium">Pending Donations</p>
                            <p className="text-4xl font-bold mt-2">{stats.pendingDonations}</p>
                        </div>
                        <div className="bg-white bg-opacity-20 rounded-full p-4">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Activity Trend Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Activity Trend (Last 7 Days)
                    </h3>
                    <div className="h-64">
                        <svg className="w-full h-full" viewBox="0 0 400 200">
                            {/* Grid lines */}
                            {[0, 1, 2, 3, 4].map((i) => (
                                <line
                                    key={i}
                                    x1="40"
                                    y1={20 + i * 40}
                                    x2="380"
                                    y2={20 + i * 40}
                                    stroke="#e5e7eb"
                                    strokeWidth="1"
                                />
                            ))}

                            {/* Y-axis labels */}
                            {[0, 1, 2, 3, 4].map((i) => (
                                <text
                                    key={i}
                                    x="30"
                                    y={25 + i * 40}
                                    className="text-xs fill-gray-500"
                                    textAnchor="end"
                                >
                                    {Math.round((4 - i) * (maxValue / 4))}
                                </text>
                            ))}

                            {/* Lines */}
                            {activityTrend.map((point, i) => {
                                if (i === 0) return null;
                                const prevPoint = activityTrend[i - 1];
                                const x1 = 60 + (i - 1) * 50;
                                const x2 = 60 + i * 50;
                                return (
                                    <g key={i}>
                                        <line
                                            x1={x1}
                                            y1={180 - (prevPoint.users / maxValue) * 160}
                                            x2={x2}
                                            y2={180 - (point.users / maxValue) * 160}
                                            stroke="#3B82F6"
                                            strokeWidth="2"
                                        />
                                        <line
                                            x1={x1}
                                            y1={180 - (prevPoint.graduates / maxValue) * 160}
                                            x2={x2}
                                            y2={180 - (point.graduates / maxValue) * 160}
                                            stroke="#10B981"
                                            strokeWidth="2"
                                        />
                                    </g>
                                );
                            })}

                            {/* X-axis labels */}
                            {activityTrend.map((point, i) => (
                                <text
                                    key={i}
                                    x={60 + i * 50}
                                    y="195"
                                    className="text-xs fill-gray-500"
                                    textAnchor="middle"
                                >
                                    {point.date}
                                </text>
                            ))}
                        </svg>
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Users</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Graduates</span>
                        </div>
                    </div>
                </div>

                {/* Department Graduates Bar Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Graduates by Department
                    </h3>
                    <div className="space-y-3">
                        {departmentStats.map((dept) => (
                            <div key={dept.name}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{dept.name}</span>
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{dept.count}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all"
                                        style={{ width: `${(dept.count / maxDeptCount) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Job Application Status Breakdown */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Job Application Status
                    </h3>
                    <div className="space-y-2">
                        {Object.entries(jobApplicationStats).map(([status, count]) => (
                            <div key={status} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: statusColors[status] }}
                                    ></div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                                        {status}
                                    </span>
                                </div>
                                <span className="text-sm font-bold text-gray-900 dark:text-white">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fundraising Progress */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Fundraising Progress
                        </h3>
                        <Link href="/admin/fundraisings" className="text-sm text-blue-600 hover:text-blue-700">
                            View all
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {fundraisingProgress.length > 0 ? (
                            fundraisingProgress.map((fr, i) => (
                                <div key={i}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {fr.title}
                                        </span>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {fr.percentage.toFixed(0)}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
                                        <div
                                            className="bg-gradient-to-r from-green-500 to-emerald-600 h-2.5 rounded-full transition-all"
                                            style={{ width: `${fr.percentage}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                        <span>{formatCurrency(fr.raised)} raised</span>
                                        <span>Goal: {formatCurrency(fr.goal)}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                                No active fundraising campaigns
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
