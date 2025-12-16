import { Event } from '@/types';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

interface EventsSectionProps {
    events: Event[];
}

export default function EventsSection({ events }: EventsSectionProps) {
    const activeEvents = events.filter(event => event.is_active);
    const featuredEvents = activeEvents.filter(event => event.is_featured);
    const upcomingEvents = activeEvents.filter(event => new Date(event.event_date) >= new Date());

    return (
        <section id="events" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Upcoming Events
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Join us in our exciting events and activities
                    </p>
                </motion.div>

                {/* Featured Events */}
                {featuredEvents.length > 0 && (
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Events</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredEvents.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden border-4 border-blue-500"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -10 }}
                                >
                                    <Link href={`/events/${event.id}`}>
                                        {event.image && (
                                            <img
                                                src={`/uploads/${event.image}`}
                                                alt={event.title}
                                                className="w-full h-48 object-cover"
                                            />
                                        )}
                                    </Link>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                                                Featured
                                            </span>
                                        </div>
                                        <Link href={`/events/${event.id}`}>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                {event.title}
                                            </h3>
                                        </Link>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                                            {event.description}
                                        </p>
                                        <div className="space-y-2 text-sm mb-4">
                                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                                                <span className="mr-2">📅</span>
                                                <span>{new Date(event.event_date).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}</span>
                                            </div>
                                            {event.location && (
                                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                                    <span className="mr-2">📍</span>
                                                    <span>{event.location}</span>
                                                </div>
                                            )}
                                        </div>
                                        <Link
                                            href={`/events/${event.id}`}
                                            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold transition-colors"
                                        >
                                            Read More
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* All Upcoming Events */}
                {upcomingEvents.length > 0 ? (
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">All Events</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {upcomingEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                                >
                                    <Link href={`/events/${event.id}`}>
                                        {event.image && (
                                            <img
                                                src={`/uploads/${event.image}`}
                                                alt={event.title}
                                                className="w-full h-48 object-cover"
                                            />
                                        )}
                                    </Link>
                                    <div className="p-6">
                                        <Link href={`/events/${event.id}`}>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                {event.title}
                                            </h3>
                                        </Link>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                                            {event.description}
                                        </p>
                                        <div className="space-y-2 text-sm mb-4">
                                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                                                <span className="mr-2">📅</span>
                                                <span>{new Date(event.event_date).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}</span>
                                            </div>
                                            {event.location && (
                                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                                    <span className="mr-2">📍</span>
                                                    <span>{event.location}</span>
                                                </div>
                                            )}
                                        </div>
                                        <Link
                                            href={`/events/${event.id}`}
                                            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold transition-colors"
                                        >
                                            Read More
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            No upcoming events at the moment. Check back soon!
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
