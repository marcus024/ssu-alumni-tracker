import { SchoolInfo } from '@/types';

interface AboutSectionProps {
    schoolInfo: SchoolInfo | null;
}

export default function AboutSection({ schoolInfo }: AboutSectionProps) {
    const currentYear = new Date().getFullYear();
    const yearsInOperation = schoolInfo
        ? currentYear - schoolInfo.years_established
        : 0;

    return (
        <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        About SSU
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Discover our mission, vision, and commitment to excellence
                    </p>
                </div>

                {schoolInfo ? (
                    <div className="max-w-6xl mx-auto">
                        {/* School Logo and Stats */}
                        <div className="grid md:grid-cols-2 gap-12 mb-16">
                            {/* Logo and Basic Info */}
                            <div className="flex flex-col items-center justify-center">
                                {schoolInfo.logo ? (
                                    <img
                                        src={`/storage/${schoolInfo.logo}`}
                                        alt="SSU Logo"
                                        className="w-64 h-64 object-contain mb-6"
                                    />
                                ) : (
                                    <div className="w-64 h-64 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                                        <span className="text-white text-6xl font-bold">SSU</span>
                                    </div>
                                )}
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    {yearsInOperation} Years of Excellence
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Established {schoolInfo.years_established}
                                </p>
                            </div>

                            {/* Statistics Grid */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg text-center">
                                    <div className="text-4xl font-bold text-blue-600 mb-2">
                                        {schoolInfo.total_teachers}
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-400">Teachers & Staff</div>
                                </div>
                                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg text-center">
                                    <div className="text-4xl font-bold text-blue-600 mb-2">
                                        {schoolInfo.total_departments}
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-400">Departments</div>
                                </div>
                                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg text-center">
                                    <div className="text-4xl font-bold text-blue-600 mb-2">
                                        {schoolInfo.total_branches}
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-400">Branches</div>
                                </div>
                                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg text-center">
                                    <div className="text-4xl font-bold text-blue-600 mb-2">
                                        {yearsInOperation}+
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-400">Years</div>
                                </div>
                            </div>
                        </div>

                        {/* Mission and Vision */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Mission */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                                        <span className="text-2xl">🎯</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Our Mission
                                    </h3>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {schoolInfo.mission}
                                </p>
                            </div>

                            {/* Vision */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                                        <span className="text-2xl">👁️</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Our Vision
                                    </h3>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {schoolInfo.vision}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            School information will be available soon.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
