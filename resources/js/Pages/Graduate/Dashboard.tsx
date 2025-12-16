import { Head, Link } from '@inertiajs/react';
import GraduateLayout from '@/Layouts/GraduateLayout';
import { PageProps, Event, FundRaising, JobPost, News, User } from '@/types';

interface GraduateDashboardProps extends PageProps {
    latestNews: News[];
    latestJobs: JobPost[];
    upcomingEvents: Event[];
    activeFundraisings: FundRaising[];
    user: User;
}

export default function Dashboard({
    latestNews,
    latestJobs,
    upcomingEvents,
    activeFundraisings,
    user,
}: GraduateDashboardProps) {
    const getStatusBadge = (status: string) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        };
        return colors[status as keyof typeof colors] || colors.pending;
    };

    return (
        <GraduateLayout header="Dashboard">
            <Head title="Graduate Dashboard" />

            <div className="space-y-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
                    <p className="text-blue-100">
                        {user.course && `Class of ${user.year} - ${user.course}`}
                    </p>
                    {user.status && (
                        <div className="mt-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(user.status)}`}>
                                Account Status: {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </span>
                        </div>
                    )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Latest News</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{latestNews.length}</p>
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
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Job Openings</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{latestJobs.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Upcoming Events</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{upcomingEvents.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                                <svg className="h-6 w-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Campaigns</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeFundraisings.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Latest News */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Latest News</h3>
                        <div className="space-y-4">
                            {latestNews.length > 0 ? (
                                latestNews.map((news) => (
                                    <div key={news.id} className="flex items-start space-x-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                                        {news.image && (
                                            <img
                                                src={`/uploads/${news.image}`}
                                                alt={news.title}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900 dark:text-white">{news.title}</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                {new Date(news.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-8">No news available</p>
                            )}
                        </div>
                    </div>

                    {/* Latest Job Openings */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Job Openings</h3>
                        <div className="space-y-4">
                            {latestJobs.length > 0 ? (
                                latestJobs.map((job) => (
                                    <div key={job.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <h4 className="font-medium text-gray-900 dark:text-white">{job.title}</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{job.company}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{job.location}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-8">No job openings available</p>
                            )}
                        </div>
                    </div>

                    {/* Upcoming Events */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Events</h3>
                        <div className="space-y-4">
                            {upcomingEvents.length > 0 ? (
                                upcomingEvents.map((event) => (
                                    <div key={event.id} className="flex items-start space-x-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                                        <div className="flex-shrink-0 text-center bg-blue-100 dark:bg-blue-900 rounded p-2">
                                            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                                {new Date(event.event_date).getDate()}
                                            </div>
                                            <div className="text-xs text-blue-600 dark:text-blue-400">
                                                {new Date(event.event_date).toLocaleDateString('en-US', { month: 'short' })}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900 dark:text-white">{event.title}</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{event.location}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-8">No upcoming events</p>
                            )}
                        </div>
                    </div>

                    {/* Active Fundraisings */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Support Our Campaigns</h3>
                        <div className="space-y-4">
                            {activeFundraisings.length > 0 ? (
                                activeFundraisings.map((campaign) => {
                                    const progress = (campaign.current_amount / campaign.goal_amount) * 100;
                                    return (
                                        <div key={campaign.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <h4 className="font-medium text-gray-900 dark:text-white">{campaign.title}</h4>
                                            <div className="mt-3">
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-gray-600 dark:text-gray-300">
                                                        ₱{campaign.current_amount.toLocaleString()}
                                                    </span>
                                                    <span className="text-gray-600 dark:text-gray-300">
                                                        ₱{campaign.goal_amount.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                                    <div
                                                        className="bg-green-600 h-2 rounded-full"
                                                        style={{ width: `${Math.min(progress, 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-8">No active campaigns</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </GraduateLayout>
    );
}
