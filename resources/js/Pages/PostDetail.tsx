import { Head, Link } from '@inertiajs/react';
import { Post, SchoolInfo, User } from '@/types';
import Header from '@/Components/Public/Header';
import Footer from '@/Components/Public/Footer';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PostDetailProps {
    post: Post & { user: User };
    schoolInfo: SchoolInfo | null;
}

export default function PostDetail({ post, schoolInfo }: PostDetailProps) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        setIsDark(!isDark);
        if (!isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <>
            <Head title={`${post.title} - SSU Alumni Post`} />

            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
                <Header isDark={isDark} toggleTheme={toggleTheme} />

                <main className="pt-20">
                    {/* Back Button */}
                    <div className="container mx-auto px-4 py-6">
                        <Link
                            href="/"
                            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Home
                        </Link>
                    </div>

                    {/* Hero Section */}
                    <motion.div
                        className="relative h-96 overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        {post.image ? (
                            <div className="absolute inset-0">
                                <img
                                    src={`/uploads/${post.image}`}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                            </div>
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-800 dark:from-purple-800 dark:to-gray-900"></div>
                        )}

                        <div className="relative h-full container mx-auto px-4 flex items-end pb-12">
                            <div className="text-white max-w-4xl">
                                <span className="inline-flex items-center bg-purple-500 text-white text-sm px-4 py-1 rounded-full mb-4">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Blog Post
                                </span>
                                <motion.h1
                                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    {post.title}
                                </motion.h1>
                                <motion.div
                                    className="flex items-center gap-4 text-white/90"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{post.user.name}</p>
                                            <p className="text-sm text-white/70">{formatDate(post.created_at)}</p>
                                        </div>
                                    </div>
                                    {post.is_published && (
                                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            Published
                                        </span>
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <div className="container mx-auto px-4 py-12">
                        <div className="max-w-4xl mx-auto">
                            <motion.article
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12"
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                {/* Author Info */}
                                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
                                        {post.user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {post.user.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {post.user.email}
                                        </p>
                                    </div>
                                </div>

                                {/* Article Meta */}
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Published on {formatDate(post.created_at)}
                                    </div>
                                    {post.updated_at !== post.created_at && (
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            Updated on {formatDate(post.updated_at)}
                                        </div>
                                    )}
                                </div>

                                {/* Article Content */}
                                <div className="prose prose-lg dark:prose-invert max-w-none">
                                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed text-lg">
                                        {post.content}
                                    </div>
                                </div>

                                {/* Share Section */}
                                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Share this post
                                    </h3>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => {
                                                if (navigator.share) {
                                                    navigator.share({
                                                        title: post.title,
                                                        text: post.content.substring(0, 100) + '...',
                                                        url: window.location.href,
                                                    });
                                                }
                                            }}
                                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                            </svg>
                                            Share
                                        </button>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(window.location.href);
                                                alert('Link copied to clipboard!');
                                            }}
                                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors flex items-center"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            Copy Link
                                        </button>
                                    </div>
                                </div>

                                {/* About Author */}
                                <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                        About the Author
                                    </h3>
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                                            {post.user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                {post.user.name}
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {post.user.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.article>

                            {/* Back to Home Button */}
                            <div className="mt-8 text-center">
                                <Link
                                    href="/"
                                    className="inline-flex items-center px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
