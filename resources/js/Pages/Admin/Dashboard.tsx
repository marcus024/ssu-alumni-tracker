import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

interface DashboardStats {
    totalNews: number;
    totalJobPosts: number;
    totalDepartments: number;
    totalGraduates: number;
    totalContacts: number;
    totalGalleryImages: number;
}

interface RecentActivity {
    news: Array<{ id: number; title: string; created_at: string }>;
    jobPosts: Array<{ id: number; title: string; company: string; created_at: string }>;
    contacts: Array<{ id: number; name: string; email: string; created_at: string }>;
}

export default function Dashboard({
    stats,
    recentActivity,
}: {
    stats: DashboardStats;
    recentActivity: RecentActivity;
}) {
    const statCards = [
        {
            name: 'Total News',
            value: stats.totalNews,
            icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
            link: '/admin/news',
            color: 'blue',
        },
        {
            name: 'Job Posts',
            value: stats.totalJobPosts,
            icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
            link: '/admin/job-posts',
            color: 'green',
        },
        {
            name: 'Departments',
            value: stats.totalDepartments,
            icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
            link: '/admin/departments',
            color: 'purple',
        },
        {
            name: 'Graduates',
            value: stats.totalGraduates,
            icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
            link: '/admin/graduates',
            color: 'yellow',
        },
        {
            name: 'Gallery Images',
            value: stats.totalGalleryImages,
            icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
            link: '/admin/gallery',
            color: 'pink',
        },
        {
            name: 'Contact Messages',
            value: stats.totalContacts,
            icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
            link: '/admin/contacts',
            color: 'red',
        },
    ];

    const getColorClasses = (color: string) => {
        const colors: Record<string, { bg: string; text: string; hover: string }> = {
            blue: { bg: 'bg-blue-500', text: 'text-blue-600', hover: 'hover:bg-blue-50' },
            green: { bg: 'bg-green-500', text: 'text-green-600', hover: 'hover:bg-green-50' },
            purple: { bg: 'bg-purple-500', text: 'text-purple-600', hover: 'hover:bg-purple-50' },
            yellow: { bg: 'bg-yellow-500', text: 'text-yellow-600', hover: 'hover:bg-yellow-50' },
            pink: { bg: 'bg-pink-500', text: 'text-pink-600', hover: 'hover:bg-pink-50' },
            red: { bg: 'bg-red-500', text: 'text-red-600', hover: 'hover:bg-red-50' },
        };
        return colors[color];
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <AdminLayout header="Dashboard">
            <Head title="Admin Dashboard" />

            {/* Welcome message */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Welcome back!
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Here's what's happening with SSU Alumni Tracker today.
                </p>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                {statCards.map((stat) => {
                    const colors = getColorClasses(stat.color);
                    return (
                        <Link
                            key={stat.name}
                            href={stat.link}
                            className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-all ${colors.hover} dark:hover:bg-gray-700`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        {stat.name}
                                    </p>
                                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className={`p-3 rounded-full ${colors.bg} bg-opacity-10`}>
                                    <svg
                                        className={`h-8 w-8 ${colors.text}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d={stat.icon}
                                        />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent News */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Recent News
                        </h3>
                        <Link
                            href="/admin/news"
                            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            View all
                        </Link>
                    </div>
                    <div className="p-6">
                        {recentActivity.news.length > 0 ? (
                            <div className="space-y-4">
                                {recentActivity.news.map((item) => (
                                    <div key={item.id} className="flex items-start space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="h-2 w-2 rounded-full bg-blue-500 mt-2"></div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <Link
                                                href={`/admin/news/${item.id}/edit`}
                                                className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                                            >
                                                {item.title}
                                            </Link>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {formatDate(item.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                No news articles yet.
                            </p>
                        )}
                    </div>
                </div>

                {/* Recent Job Posts */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Recent Job Posts
                        </h3>
                        <Link
                            href="/admin/job-posts"
                            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            View all
                        </Link>
                    </div>
                    <div className="p-6">
                        {recentActivity.jobPosts.length > 0 ? (
                            <div className="space-y-4">
                                {recentActivity.jobPosts.map((item) => (
                                    <div key={item.id} className="flex items-start space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="h-2 w-2 rounded-full bg-green-500 mt-2"></div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <Link
                                                href={`/admin/job-posts/${item.id}/edit`}
                                                className="text-sm font-medium text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400"
                                            >
                                                {item.title}
                                            </Link>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {item.company} • {formatDate(item.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                No job posts yet.
                            </p>
                        )}
                    </div>
                </div>

                {/* Recent Contacts */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow lg:col-span-2">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Recent Contact Messages
                        </h3>
                        <Link
                            href="/admin/contacts"
                            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            View all
                        </Link>
                    </div>
                    <div className="p-6">
                        {recentActivity.contacts.length > 0 ? (
                            <div className="space-y-4">
                                {recentActivity.contacts.map((item) => (
                                    <div key={item.id} className="flex items-start space-x-3 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                                        <div className="flex-shrink-0">
                                            <div className="h-10 w-10 rounded-full bg-red-500 bg-opacity-10 flex items-center justify-center">
                                                <svg
                                                    className="h-5 w-5 text-red-600"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {item.name}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {formatDate(item.created_at)}
                                                </p>
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                {item.email}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                No contact messages yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Quick Actions
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <Link
                        href="/admin/news/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 text-center transition-colors"
                    >
                        <svg className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-sm font-medium">Add News</span>
                    </Link>
                    <Link
                        href="/admin/job-posts/create"
                        className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-4 text-center transition-colors"
                    >
                        <svg className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-sm font-medium">Add Job</span>
                    </Link>
                    <Link
                        href="/admin/departments/create"
                        className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-4 text-center transition-colors"
                    >
                        <svg className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-sm font-medium">Add Department</span>
                    </Link>
                    <Link
                        href="/admin/graduates/create"
                        className="bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg p-4 text-center transition-colors"
                    >
                        <svg className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-sm font-medium">Add Graduate</span>
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}
