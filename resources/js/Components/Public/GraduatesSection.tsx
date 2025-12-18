import { Graduate, Department } from '@/types';
import { useState } from 'react';
import GraduateRegistrationModal from './GraduateRegistrationModal';

interface GraduatesSectionProps {
    graduates: Graduate[];
    departments: Department[];
}

export default function GraduatesSection({ graduates, departments }: GraduatesSectionProps) {
    const [showAll, setShowAll] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);

    const filteredGraduates = graduates.filter(
        (grad) =>
            grad.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            grad.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
            grad.current_work.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const displayedGraduates = showAll
        ? filteredGraduates
        : filteredGraduates.slice(0, 6);

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

                    {/* Register Button */}
                    <div className="mb-8">
                        <button
                            onClick={() => setShowRegistrationModal(true)}
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all shadow-lg"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Register as Graduate
                        </button>
                    </div>

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
                                                    src={`/storage/${graduate.profile_picture}`}
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
                                </div>
                            ))}
                        </div>

                        {!showAll && filteredGraduates.length > 6 && (
                            <div className="text-center">
                                <button
                                    onClick={() => setShowAll(true)}
                                    className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                                >
                                    Show More Graduates
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                        )}

                        {showAll && (
                            <div className="text-center">
                                <button
                                    onClick={() => setShowAll(false)}
                                    className="inline-flex items-center px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                                >
                                    Show Less
                                    <svg className="w-5 h-5 ml-2 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
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
        </section>
    );
}
