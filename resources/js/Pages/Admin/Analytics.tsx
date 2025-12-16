import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps } from '@/types';

interface GraduateWorkStatus {
    current_work: string;
    count: number;
}

interface GraduateByCourse {
    course: string;
    count: number;
}

interface GraduateByYear {
    year: number;
    count: number;
}

interface RecentGraduate {
    date: string;
    count: number;
}

interface AnalyticsStats {
    totalGraduates: number;
    approvedGraduates: number;
    pendingGraduates: number;
    employed: number;
    unemployed: number;
    totalUsers: number;
    joinedUsers: number;
    notJoinedGraduates: number;
}

interface AnalyticsProps extends PageProps {
    stats: AnalyticsStats;
    graduatesByWorkStatus: GraduateWorkStatus[];
    graduatesByCourse: GraduateByCourse[];
    graduatesByYear: GraduateByYear[];
    recentGraduates: RecentGraduate[];
}

export default function Analytics({
    stats,
    graduatesByWorkStatus,
    graduatesByCourse,
    graduatesByYear,
    recentGraduates,
}: AnalyticsProps) {
    const employmentRate = stats.approvedGraduates > 0
        ? ((stats.employed / stats.approvedGraduates) * 100).toFixed(1)
        : '0';

    const joinedRate = stats.approvedGraduates > 0
        ? ((stats.joinedUsers / stats.approvedGraduates) * 100).toFixed(1)
        : '0';

    return (
        <AdminLayout header="Analytics & Reports">
            <Head title="Analytics & Reports" />

            <div className="space-y-6">
                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Graduates</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalGraduates}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {stats.approvedGraduates} approved, {stats.pendingGraduates} pending
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                                <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Employment Rate</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{employmentRate}%</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {stats.employed} employed, {stats.unemployed} unemployed
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">System Users</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Registered accounts
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                                <svg className="h-6 w-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Participation Rate</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{joinedRate}%</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {stats.joinedUsers} joined, {stats.notJoinedGraduates} not joined
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Graduates by Course */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Graduates by Course
                        </h3>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {graduatesByCourse.map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {item.course}
                                            </span>
                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                {item.count}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full"
                                                style={{
                                                    width: `${(item.count / stats.approvedGraduates) * 100}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Graduates by Year */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Graduates by Year
                        </h3>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {graduatesByYear.map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Class of {item.year}
                                            </span>
                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                {item.count}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-green-600 dark:bg-green-500 h-2 rounded-full"
                                                style={{
                                                    width: `${(item.count / stats.approvedGraduates) * 100}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Work Status and Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Graduates by Work Status */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Top Current Employers
                        </h3>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {graduatesByWorkStatus.slice(0, 10).map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {item.current_work || 'Not Specified'}
                                    </span>
                                    <span className="px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                                        {item.count} {item.count === 1 ? 'graduate' : 'graduates'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Graduate Registrations */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Recent Registrations (Last 30 Days)
                        </h3>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {recentGraduates.length > 0 ? (
                                recentGraduates.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {new Date(item.date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </span>
                                        <span className="px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 dark:bg-green-900 dark:text-green-200 rounded-full">
                                            +{item.count} {item.count === 1 ? 'graduate' : 'graduates'}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                                    No recent registrations in the last 30 days
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                        <h4 className="text-sm font-medium opacity-90 mb-2">Total Courses</h4>
                        <p className="text-3xl font-bold mb-1">{graduatesByCourse.length}</p>
                        <p className="text-sm opacity-75">Unique degree programs</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
                        <h4 className="text-sm font-medium opacity-90 mb-2">Graduation Years</h4>
                        <p className="text-3xl font-bold mb-1">{graduatesByYear.length}</p>
                        <p className="text-sm opacity-75">Different class years</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
                        <h4 className="text-sm font-medium opacity-90 mb-2">Employment Data</h4>
                        <p className="text-3xl font-bold mb-1">{graduatesByWorkStatus.length}</p>
                        <p className="text-sm opacity-75">Unique employers tracked</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
