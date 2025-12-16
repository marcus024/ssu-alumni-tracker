import { Department } from '@/types';
import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

interface DepartmentsSectionProps {
    departments: Department[];
}

export default function DepartmentsSection({ departments }: DepartmentsSectionProps) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <section id="departments" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Our Departments
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Explore our diverse academic departments and programs
                    </p>
                </motion.div>

                {departments.length > 0 ? (
                    <div className="max-w-6xl mx-auto">
                        {/* Department Tabs */}
                        <div className="flex overflow-x-auto mb-8 space-x-2 pb-2">
                            {departments.map((dept, index) => (
                                <button
                                    key={dept.id}
                                    onClick={() => setActiveTab(index)}
                                    className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                                        activeTab === index
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    {dept.name}
                                </button>
                            ))}
                        </div>

                        {/* Active Department Content */}
                        <AnimatePresence mode="wait">
                            {departments[activeTab] && (
                                <motion.div
                                    key={activeTab}
                                    className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 md:p-12"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                <div className="grid md:grid-cols-3 gap-8">
                                    {/* Department Logo */}
                                    <div className="md:col-span-1 flex flex-col items-center">
                                        {departments[activeTab].logo ? (
                                            <img
                                                src={`/storage/${departments[activeTab].logo}`}
                                                alt={departments[activeTab].name}
                                                className="w-48 h-48 object-contain rounded-lg mb-4"
                                            />
                                        ) : (
                                            <div className="w-48 h-48 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                                                <span className="text-6xl">🎓</span>
                                            </div>
                                        )}

                                        {/* Stats */}
                                        <div className="w-full space-y-3">
                                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                    {departments[activeTab].total_students}
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">Students</div>
                                            </div>
                                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                    {departments[activeTab].total_teachers}
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">Teachers</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Department Info */}
                                    <div className="md:col-span-2">
                                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                            {departments[activeTab].name}
                                        </h3>
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 whitespace-pre-line">
                                            {departments[activeTab].description}
                                        </p>

                                        <Link
                                            href={`/departments/${departments[activeTab].id}`}
                                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                                        >
                                            View Department Details
                                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🎓</div>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Department information will be available soon.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
