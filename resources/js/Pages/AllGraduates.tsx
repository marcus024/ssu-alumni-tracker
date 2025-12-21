import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { PageProps, Department, Graduate } from '@/types';
import Header from '@/Components/Public/Header';
import Footer from '@/Components/Public/Footer';
import GraduateChatModal from '@/Components/Public/GraduateChatModal';

interface AllGraduatesProps extends PageProps {
    departments: Department[];
    graduates: Graduate[];
}

export default function AllGraduates({ departments, graduates }: AllGraduatesProps) {
    const [isDark, setIsDark] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
    const [selectedYear, setSelectedYear] = useState<string>('all');
    const [showChatModal, setShowChatModal] = useState(false);
    const [selectedGraduate, setSelectedGraduate] = useState<Graduate | null>(null);

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

    // Get unique years from graduates for filter dropdown
    const availableYears = Array.from(new Set(graduates.map(g => g.year)))
        .sort((a, b) => b - a);

    const currentYear = new Date().getFullYear();

    const filteredGraduates = graduates.filter((grad) => {
        const matchesSearch =
            grad.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            grad.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
            grad.current_work.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesDepartment =
            selectedDepartment === 'all' ||
            grad.department_id?.toString() === selectedDepartment;

        const matchesYear =
            selectedYear === 'all' ||
            grad.year.toString() === selectedYear;

        return matchesSearch && matchesDepartment && matchesYear;
    });

    // Analytics calculations
    const totalGraduates = graduates.length;
    const graduatesThisYear = graduates.filter(g => g.year === currentYear).length;

    // Analytics for filtered results
    const filteredTotal = filteredGraduates.length;
    const filteredThisYear = filteredGraduates.filter(g => g.year === currentYear).length;

    return (
        <>
            <Head title="All Graduates - SSU Alumni" />

            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
                <Header isDark={isDark} toggleTheme={toggleTheme} />

                <main className="py-20">
                    <div className="container mx-auto px-4">
                        {/* Header Section */}
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                                All Graduates
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                Browse our complete directory of alumni
                            </p>
                        </div>

                        {/* Analytics Section */}
                        <div className="max-w-6xl mx-auto mb-12">
                            <div className="grid md:grid-cols-3 gap-6">
                                {/* Total Graduates Card */}
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl p-6 text-white shadow-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-sm font-medium opacity-90">Total Graduates</h3>
                                        <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-4xl font-bold mb-1">
                                        {selectedDepartment === 'all' && selectedYear === 'all' ? totalGraduates : filteredTotal}
                                    </p>
                                    <p className="text-sm opacity-80">
                                        {selectedDepartment !== 'all' || selectedYear !== 'all' ? 'Matching filters' : 'All time'}
                                    </p>
                                </div>

                                {/* Graduates This Year Card */}
                                <div className="bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-xl p-6 text-white shadow-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-sm font-medium opacity-90">Graduates {currentYear}</h3>
                                        <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                        </svg>
                                    </div>
                                    <p className="text-4xl font-bold mb-1">
                                        {selectedDepartment === 'all' && selectedYear === 'all' ? graduatesThisYear : filteredThisYear}
                                    </p>
                                    <p className="text-sm opacity-80">
                                        {selectedDepartment !== 'all' || selectedYear !== 'all' ? 'Matching filters' : 'This year'}
                                    </p>
                                </div>

                                {/* Average per Year Card */}
                                <div className="bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 rounded-xl p-6 text-white shadow-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-sm font-medium opacity-90">Active Filters</h3>
                                        <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                        </svg>
                                    </div>
                                    <p className="text-2xl font-bold mb-1">
                                        {(selectedDepartment !== 'all' ? 1 : 0) + (selectedYear !== 'all' ? 1 : 0) + (searchQuery ? 1 : 0)}
                                    </p>
                                    <p className="text-sm opacity-80">
                                        {selectedDepartment === 'all' && selectedYear === 'all' && !searchQuery ? 'No filters applied' : 'Applied'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Filters Section */}
                        <div className="max-w-6xl mx-auto mb-12">
                            <div className="grid md:grid-cols-3 gap-4">
                                {/* Search Bar */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search by name, course, or company..."
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

                                {/* Department Filter */}
                                <div className="relative">
                                    <select
                                        value={selectedDepartment}
                                        onChange={(e) => setSelectedDepartment(e.target.value)}
                                        className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none"
                                    >
                                        <option value="all">All Departments</option>
                                        {departments.map((dept) => (
                                            <option key={dept.id} value={dept.id.toString()}>
                                                {dept.name}
                                            </option>
                                        ))}
                                    </select>
                                    <svg
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <svg
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                {/* Year Filter */}
                                <div className="relative">
                                    <select
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                        className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none"
                                    >
                                        <option value="all">All Years</option>
                                        {availableYears.map((year) => (
                                            <option key={year} value={year.toString()}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                    <svg
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <svg
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Results Count & Clear Filters */}
                            <div className="mt-4 flex justify-between items-center">
                                <p className="text-gray-600 dark:text-gray-400">
                                    Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredGraduates.length}</span> graduate{filteredGraduates.length !== 1 ? 's' : ''}
                                </p>
                                {(selectedDepartment !== 'all' || selectedYear !== 'all' || searchQuery) && (
                                    <button
                                        onClick={() => {
                                            setSelectedDepartment('all');
                                            setSelectedYear('all');
                                            setSearchQuery('');
                                        }}
                                        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Clear All Filters
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Graduates Grid */}
                        {filteredGraduates.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                                {filteredGraduates.map((graduate) => (
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

                                        {/* Action Buttons */}
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
                        ) : (
                            <div className="text-center py-20">
                                <div className="text-6xl mb-4">🎓</div>
                                <p className="text-gray-600 dark:text-gray-400 text-lg">
                                    {searchQuery || selectedDepartment !== 'all'
                                        ? 'No graduates found matching your filters.'
                                        : 'No graduates information available yet.'}
                                </p>
                            </div>
                        )}
                    </div>
                </main>

                <Footer />
            </div>

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
        </>
    );
}
