import { Head, Link } from '@inertiajs/react';
import { Event, SchoolInfo } from '@/types';
import Header from '@/Components/Public/Header';
import Footer from '@/Components/Public/Footer';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface EventDetailProps {
    event: Event;
    schoolInfo: SchoolInfo | null;
}

export default function EventDetail({ event, schoolInfo }: EventDetailProps) {
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
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const isUpcoming = new Date(event.event_date) >= new Date();
    const isPast = new Date(event.event_date) < new Date();

    return (
        <>
            <Head title={`${event.title} - SSU Alumni`} />

            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
                <Header isDark={isDark} toggleTheme={toggleTheme} />

                <main className="pt-20">
                    {/* Back Button */}
                    <div className="container mx-auto px-4 py-6">
                        <Link
                            href="/#events"
                            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Events
                        </Link>
                    </div>

                    {/* Hero Section */}
                    <motion.div
                        className="relative h-96 overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        {event.image ? (
                            <div className="absolute inset-0">
                                <img
                                    src={`/uploads/${event.image}`}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                            </div>
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-800 dark:to-gray-900"></div>
                        )}

                        <div className="relative h-full container mx-auto px-4 flex items-end pb-12">
                            <div className="text-white">
                                {event.is_featured && (
                                    <span className="inline-block bg-blue-500 text-white text-sm px-4 py-1 rounded-full mb-4">
                                        Featured Event
                                    </span>
                                )}
                                <motion.h1
                                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    {event.title}
                                </motion.h1>
                                <motion.div
                                    className="flex flex-wrap items-center gap-4 text-white/90"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    <div className="flex items-center">
                                        <span className="mr-2 text-xl">📅</span>
                                        <span className="text-lg">{formatDate(event.event_date)}</span>
                                    </div>
                                    {event.location && (
                                        <div className="flex items-center">
                                            <span className="mr-2 text-xl">📍</span>
                                            <span className="text-lg">{event.location}</span>
                                        </div>
                                    )}
                                    <div>
                                        {isUpcoming && (
                                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                Upcoming
                                            </span>
                                        )}
                                        {isPast && (
                                            <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                Past Event
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <div className="container mx-auto px-4 py-12">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12"
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                {/* Event Details */}
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                        Event Details
                                    </h2>

                                    <div className="space-y-4 text-gray-600 dark:text-gray-300">
                                        <div className="flex items-start">
                                            <span className="mr-3 text-blue-600 dark:text-blue-400 text-xl">📅</span>
                                            <div>
                                                <p className="font-semibold text-gray-900 dark:text-white">Date & Time</p>
                                                <p>{formatDate(event.event_date)}</p>
                                                {event.event_end_date && (
                                                    <p className="mt-1">
                                                        <span className="text-sm">Ends: </span>
                                                        {formatDate(event.event_end_date)}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {event.location && (
                                            <div className="flex items-start">
                                                <span className="mr-3 text-blue-600 dark:text-blue-400 text-xl">📍</span>
                                                <div>
                                                    <p className="font-semibold text-gray-900 dark:text-white">Location</p>
                                                    <p>{event.location}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                        About This Event
                                    </h2>
                                    <div className="prose prose-lg dark:prose-invert max-w-none">
                                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                                            {event.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Call to Action */}
                                {isUpcoming && (
                                    <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                            Join Us!
                                        </h3>
                                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                                            We look forward to seeing you at this event. For more information or to register, please contact us.
                                        </p>
                                        <Link
                                            href="/#contact"
                                            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                                        >
                                            Contact Us
                                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </Link>
                                    </div>
                                )}
                            </motion.div>

                            {/* Back to Events Button */}
                            <div className="mt-8 text-center">
                                <Link
                                    href="/#events"
                                    className="inline-flex items-center px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    View All Events
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
