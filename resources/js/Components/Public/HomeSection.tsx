import { News, JobPost, SchoolInfo } from '@/types';
import { motion } from 'framer-motion';

interface HomeSectionProps {
    news: News[];
    jobPosts: JobPost[];
    schoolInfo?: SchoolInfo | null;
}

export default function HomeSection({ news, jobPosts, schoolInfo }: HomeSectionProps) {
    const heroImage = schoolInfo?.hero_image
        ? `/uploads/${schoolInfo.hero_image}`
        : '/images/hero-bg.jpg';
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${heroImage})`,
                        backgroundPosition: 'center center',
                    }}
                >
                    {/* Fallback gradient if image is not available */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-gray-900 dark:from-gray-900 dark:via-blue-900 dark:to-black opacity-50"></div>
                </div>
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-32">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold text-white mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        SSU Alumni Management System
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Connecting Alumni, Sharing Opportunities, Building Futures
                    </motion.p>
                </motion.div>

                {/* News and Job Posts Grid */}
                <motion.div
                    className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    {/* Recent News */}
                    <motion.div
                        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                            <span className="mr-2">📰</span> Recent News
                        </h2>
                        <div className="space-y-4">
                            {news.length > 0 ? (
                                news.slice(0, 3).map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                                        whileHover={{ x: 5 }}
                                    >
                                        {item.image && (
                                            <img
                                                src={`/uploads/${item.image}`}
                                                alt={item.title}
                                                className="w-full h-32 object-cover rounded-lg mb-3"
                                            />
                                        )}
                                        <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                                        <p className="text-white/80 text-sm line-clamp-2">{item.content}</p>
                                        <p className="text-white/60 text-xs mt-2">
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </p>
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-white/70 text-center py-8">No news available yet</p>
                            )}
                        </div>
                    </motion.div>

                    {/* Recent Job Posts */}
                    <motion.div
                        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                            <span className="mr-2">💼</span> Latest Jobs
                        </h2>
                        <div className="space-y-4">
                            {jobPosts.length > 0 ? (
                                jobPosts.slice(0, 3).map((job, index) => (
                                    <motion.div
                                        key={job.id}
                                        className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                                        whileHover={{ x: -5 }}
                                    >
                                        <h3 className="text-lg font-semibold text-white mb-1">{job.title}</h3>
                                        <p className="text-blue-300 text-sm mb-2">{job.company}</p>
                                        <p className="text-white/80 text-sm line-clamp-2 mb-2">{job.description}</p>
                                        <div className="flex items-center justify-between text-xs text-white/60">
                                            <span>📍 {job.location}</span>
                                            <span>{new Date(job.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-white/70 text-center py-8">No job posts available yet</p>
                            )}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Scroll Down Indicator */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                >
                    <button
                        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-white/80 hover:text-white transition-colors animate-bounce"
                    >
                        <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                        <span className="text-sm">Scroll Down</span>
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
