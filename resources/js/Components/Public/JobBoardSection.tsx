import { JobPost } from '@/types';
import { Link } from '@inertiajs/react';

interface JobBoardSectionProps {
    jobPosts: JobPost[];
}

export default function JobBoardSection({ jobPosts }: JobBoardSectionProps) {
    const displayedJobs = jobPosts.slice(0, 6);

    const handleApplyNow = (job: JobPost) => {
        if (job.application_url) {
            window.open(job.application_url, '_blank', 'noopener,noreferrer');
        } else {
            alert('Application URL not available for this job posting.');
        }
    };

    return (
        <section id="job-board" className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Job Board
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Explore career opportunities shared by our alumni network
                    </p>
                </div>

                {displayedJobs.length > 0 ? (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
                            {displayedJobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                            <span className="text-2xl">💼</span>
                                        </div>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {new Date(job.created_at).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {job.title}
                                    </h3>
                                    <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">
                                        {job.company}
                                    </p>

                                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                                        {job.description}
                                    </p>

                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                            <span className="mr-2">📍</span>
                                            <span>{job.location}</span>
                                        </div>
                                        <details className="text-sm">
                                            <summary className="cursor-pointer text-blue-600 dark:text-blue-400 font-medium">
                                                View Requirements
                                            </summary>
                                            <p className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-line">
                                                {job.requirements}
                                            </p>
                                        </details>
                                        <button
                                            onClick={() => handleApplyNow(job)}
                                            className="w-full mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                                        >
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {jobPosts.length > 6 && (
                            <div className="text-center">
                                <Link
                                    href="/jobs"
                                    className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                                >
                                    View All Jobs
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">💼</div>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            No job postings available at the moment. Check back soon!
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
