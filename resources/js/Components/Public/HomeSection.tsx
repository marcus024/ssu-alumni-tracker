import { News, JobPost } from '@/types';

interface HomeSectionProps {
    news: News[];
    jobPosts: JobPost[];
}

export default function HomeSection({ news, jobPosts }: HomeSectionProps) {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-gray-900 dark:from-gray-900 dark:via-blue-900 dark:to-black">
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-32">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
                        Welcome to SSU
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                        Connecting Alumni, Sharing Opportunities, Building Futures
                    </p>
                </div>

                {/* News and Job Posts Grid */}
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Recent News */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                            <span className="mr-2">📰</span> Recent News
                        </h2>
                        <div className="space-y-4">
                            {news.length > 0 ? (
                                news.slice(0, 3).map((item) => (
                                    <div key={item.id} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                                        {item.image && (
                                            <img
                                                src={`/storage/${item.image}`}
                                                alt={item.title}
                                                className="w-full h-32 object-cover rounded-lg mb-3"
                                            />
                                        )}
                                        <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                                        <p className="text-white/80 text-sm line-clamp-2">{item.content}</p>
                                        <p className="text-white/60 text-xs mt-2">
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-white/70 text-center py-8">No news available yet</p>
                            )}
                        </div>
                    </div>

                    {/* Recent Job Posts */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                            <span className="mr-2">💼</span> Latest Jobs
                        </h2>
                        <div className="space-y-4">
                            {jobPosts.length > 0 ? (
                                jobPosts.slice(0, 3).map((job) => (
                                    <div key={job.id} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                                        <h3 className="text-lg font-semibold text-white mb-1">{job.title}</h3>
                                        <p className="text-blue-300 text-sm mb-2">{job.company}</p>
                                        <p className="text-white/80 text-sm line-clamp-2 mb-2">{job.description}</p>
                                        <div className="flex items-center justify-between text-xs text-white/60">
                                            <span>📍 {job.location}</span>
                                            <span>{new Date(job.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-white/70 text-center py-8">No job posts available yet</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Scroll Down Indicator */}
                <div className="text-center mt-16">
                    <button
                        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-white/80 hover:text-white transition-colors animate-bounce"
                    >
                        <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                        <span className="text-sm">Scroll Down</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
