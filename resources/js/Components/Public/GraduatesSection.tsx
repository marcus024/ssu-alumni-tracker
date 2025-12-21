import { Graduate, Department } from '@/types';
import { useState } from 'react';
import { Link } from '@inertiajs/react';
import GraduateRegistrationModal from './GraduateRegistrationModal';
import GraduateChatModal from './GraduateChatModal';

interface GraduatesSectionProps {
    graduates: Graduate[];
    departments: Department[];
}

export default function GraduatesSection({ graduates, departments }: GraduatesSectionProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);
    const [showChatModal, setShowChatModal] = useState(false);
    const [selectedGraduate, setSelectedGraduate] = useState<Graduate | null>(null);

    const filteredGraduates = graduates.filter(
        (grad) =>
            grad.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            grad.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
            grad.current_work.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Show only first 3 graduates
    const displayedGraduates = filteredGraduates.slice(0, 3);

    return (
        <section id="graduates" className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Our Graduates
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                        Celebrating the success of our alumni across various industries
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-md mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search graduates by name, course, or company..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                            <svg
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {displayedGraduates.length > 0 ? (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
                            {displayedGraduates.map((graduate) => (
                                <div
                                    key={graduate.id}
                                    className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
                                >
                                    {/* Avatar */}
                                    <div className="flex items-center mb-4">
                                        <div className="w-16 h-16 rounded-full mr-4 overflow-hidden border-2 border-blue-500 dark:border-blue-400">
                                            {graduate.profile_picture ? (
                                                <img
                                                    src={`/uploads/${graduate.profile_picture}`}
                                                    alt={graduate.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                        {graduate.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                                {graduate.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Class of {graduate.year}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-2">
                                        <div className="flex items-start">
                                            <span className="text-gray-500 dark:text-gray-400 mr-2">🎓</span>
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Course</p>
                                                <p className="text-gray-900 dark:text-white font-medium">
                                                    {graduate.course}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <span className="text-gray-500 dark:text-gray-400 mr-2">💼</span>
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Current Position</p>
                                                <p className="text-gray-900 dark:text-white font-medium">
                                                    {graduate.current_work}
                                                </p>
                                            </div>
                                        </div>
                                        {graduate.department && (
                                            <div className="flex items-start">
                                                <span className="text-gray-500 dark:text-gray-400 mr-2">🏛️</span>
                                                <div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Department</p>
                                                    <p className="text-gray-900 dark:text-white font-medium">
                                                        {graduate.department.name}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons - Minimalist */}
                                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => {
                                                setSelectedGraduate(graduate);
                                                setShowChatModal(true);
                                            }}
                                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                                            title="Send a message"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            <span>Message</span>
                                        </button>

                                        <span className="text-gray-300 dark:text-gray-600">|</span>

                                        <Link
                                            href={`/graduates/${graduate.id}/chat`}
                                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-md transition-colors"
                                            title="View public chat"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            <span>View Chat</span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredGraduates.length > 3 && (
                            <div className="text-center">
                                <Link
                                    href="/graduates"
                                    className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                                >
                                    See All Graduates
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🎓</div>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            {searchQuery ? 'No graduates found matching your search.' : 'No graduates information available yet.'}
                        </p>
                    </div>
                )}
            </div>

            <GraduateRegistrationModal
                show={showRegistrationModal}
                onClose={() => setShowRegistrationModal(false)}
                departments={departments}
            />

            {selectedGraduate && (
                <GraduateChatModal
                    isOpen={showChatModal}
                    onClose={() => {
                        setShowChatModal(false);
                        setSelectedGraduate(null);
                    }}
                    graduate={selectedGraduate}
                />
            )}
        </section>
    );
}
