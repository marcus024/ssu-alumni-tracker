import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { PageProps, Department, Graduate, SchoolInfo } from '@/types';
import { motion } from 'framer-motion';
import Header from '@/Components/Public/Header';
import Footer from '@/Components/Public/Footer';

interface DepartmentDetailsProps extends PageProps {
    department: Department & { graduates: Graduate[] };
    schoolInfo: SchoolInfo | null;
}

export default function DepartmentDetails({ department, schoolInfo }: DepartmentDetailsProps) {
    const approvedGraduates = department.graduates?.filter((grad: Graduate) => grad.status === 'approved') || [];
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

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Head title={`${department.name} - SSU Alumni Tracker`} />

            <Header isDark={isDark} toggleTheme={toggleTheme} />

            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-gray-900 dark:from-gray-900 dark:via-blue-900 dark:to-black">
                <div className="absolute inset-0 bg-black/20"></div>

                <div className="relative z-10 container mx-auto px-4">
                    <motion.div
                        className="max-w-5xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Back Button */}
                        <Link
                            href="/#departments"
                            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Departments
                        </Link>

                        <div className="grid md:grid-cols-3 gap-8 items-center">
                            {/* Department Logo */}
                            <motion.div
                                className="md:col-span-1 flex justify-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                {department.logo ? (
                                    <img
                                        src={`/uploads/${department.logo}`}
                                        alt={department.name}
                                        className="w-64 h-64 object-contain bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                                    />
                                ) : (
                                    <div className="w-64 h-64 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                                        <span className="text-8xl">🎓</span>
                                    </div>
                                )}
                            </motion.div>

                            {/* Department Info */}
                            <motion.div
                                className="md:col-span-2"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                    {department.name}
                                </h1>
                                <p className="text-xl text-white/90 mb-6 leading-relaxed whitespace-pre-line">
                                    {department.description}
                                </p>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4">
                                    <motion.div
                                        className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 text-center"
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="text-3xl font-bold text-white mb-1">
                                            {department.total_students}
                                        </div>
                                        <div className="text-sm text-white/80">Students</div>
                                    </motion.div>
                                    <motion.div
                                        className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 text-center"
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="text-3xl font-bold text-white mb-1">
                                            {department.total_teachers}
                                        </div>
                                        <div className="text-sm text-white/80">Teachers</div>
                                    </motion.div>
                                    <motion.div
                                        className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 text-center"
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="text-3xl font-bold text-white mb-1">
                                            {approvedGraduates.length}
                                        </div>
                                        <div className="text-sm text-white/80">Alumni</div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Alumni Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Our Alumni
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Proud graduates making a difference in their fields
                        </p>
                    </motion.div>

                    {approvedGraduates.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {approvedGraduates.map((graduate: Graduate, index: number) => (
                                <motion.div
                                    key={graduate.id}
                                    className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                    {graduate.name?.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                                                {graduate.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Class of {graduate.year}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-sm">
                                        {graduate.course && (
                                            <div className="flex items-start">
                                                <span className="text-gray-500 dark:text-gray-400 mr-2">🎓</span>
                                                <span className="text-gray-700 dark:text-gray-300">{graduate.course}</span>
                                            </div>
                                        )}
                                        {graduate.current_work && (
                                            <div className="flex items-start">
                                                <span className="text-gray-500 dark:text-gray-400 mr-2">💼</span>
                                                <span className="text-gray-700 dark:text-gray-300">{graduate.current_work}</span>
                                            </div>
                                        )}
                                        {graduate.phone && (
                                            <div className="flex items-start">
                                                <span className="text-gray-500 dark:text-gray-400 mr-2">📱</span>
                                                <span className="text-gray-700 dark:text-gray-300">{graduate.phone}</span>
                                            </div>
                                        )}
                                        {graduate.email && (
                                            <div className="flex items-start">
                                                <span className="text-gray-500 dark:text-gray-400 mr-2">✉️</span>
                                                <span className="text-gray-700 dark:text-gray-300 truncate">{graduate.email}</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            className="text-center py-20"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="text-6xl mb-4">👥</div>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                No alumni records available for this department yet.
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-blue-600 dark:bg-blue-900">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Are you an alumnus of {department.name}?
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Join our alumni network and stay connected
                        </p>
                        <Link
                            href="/register"
                            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
                        >
                            Register Now
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
