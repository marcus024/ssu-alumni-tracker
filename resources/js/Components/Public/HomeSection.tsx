import { News, JobPost, SchoolInfo, Graduate } from '@/types';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

interface HomeSectionProps {
    news: News[];
    jobPosts: JobPost[];
    schoolInfo?: SchoolInfo | null;
    graduates: Graduate[];
}

export default function HomeSection({ news, jobPosts, schoolInfo, graduates }: HomeSectionProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Extract all activity images from graduates
    const activityImages: string[] = [];
    graduates.forEach(graduate => {
        if (graduate.activity_images && Array.isArray(graduate.activity_images)) {
            graduate.activity_images.forEach(image => {
                activityImages.push(`/uploads/${image}`);
            });
        }
    });

    // Auto-scroll carousel every 5 seconds
    useEffect(() => {
        if (activityImages.length > 0) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % activityImages.length);
            }, 5000); // Change image every 5 seconds

            return () => clearInterval(interval);
        }
    }, [activityImages.length]);
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

                {/* Alumni Activities Carousel */}
                {activityImages.length > 0 && (
                    <motion.div
                        className="max-w-7xl mx-auto mb-16"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                            {/* Carousel Images */}
                            <div className="relative h-96 md:h-[32rem] lg:h-[36rem]">
                                {activityImages.map((image, index) => (
                                    <motion.div
                                        key={index}
                                        className="absolute inset-0"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: index === currentImageIndex ? 1 : 0,
                                            scale: index === currentImageIndex ? 1 : 1.1,
                                        }}
                                        transition={{ duration: 1 }}
                                    >
                                        <img
                                            src={image}
                                            alt={`Alumni Activity ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Carousel Caption */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 text-white">
                                <motion.h3
                                    className="text-3xl md:text-4xl font-bold mb-3"
                                    key={currentImageIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    Alumni Previous Activities
                                </motion.h3>
                                <p className="text-white/90 text-lg md:text-xl">Showcasing memorable moments from our alumni community</p>
                            </div>

                            {/* Carousel Controls */}
                            <div className="absolute top-1/2 left-6 right-6 flex justify-between items-center -translate-y-1/2">
                                <button
                                    onClick={() => setCurrentImageIndex((currentImageIndex - 1 + activityImages.length) % activityImages.length)}
                                    className="bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full p-4 transition-all hover:scale-110 shadow-lg"
                                >
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setCurrentImageIndex((currentImageIndex + 1) % activityImages.length)}
                                    className="bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full p-4 transition-all hover:scale-110 shadow-lg"
                                >
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Carousel Indicators */}
                            <div className="absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 flex gap-3">
                                {activityImages.slice(0, 10).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`h-1.5 rounded-full transition-all ${
                                            index === currentImageIndex % 10 ? 'bg-white w-12' : 'bg-white/50 w-8 hover:bg-white/70'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

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
                                    <Link key={item.id} href={`/news/${item.id}`}>
                                        <motion.div
                                            className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer"
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
                                            <h3 className="text-lg font-semibold text-white mb-2 hover:text-blue-300 transition-colors">{item.title}</h3>
                                            <p className="text-white/80 text-sm line-clamp-2">{item.content}</p>
                                            <div className="flex items-center justify-between mt-2">
                                                <p className="text-white/60 text-xs">
                                                    {new Date(item.created_at).toLocaleDateString()}
                                                </p>
                                                <span className="text-blue-300 text-xs font-semibold flex items-center">
                                                    Read More
                                                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </motion.div>
                                    </Link>
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
