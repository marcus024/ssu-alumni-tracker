import { useState } from 'react';

interface Graduate {
    id: number;
    name: string;
    email: string;
    phone: string;
    year: string;
    course: string;
    profile_picture?: string;
    activity_images?: string[];
    surname: string;
    first_name: string;
    middle_name?: string;
    permanent_address: string;
    sex: string;
    civil_status: string;
    college_campus: string;
    program: string;
    major?: string;
    advance_study_school?: string;
    advance_study_date_started?: string;
    advance_study_units_earned?: string;
    advance_study_date_graduated?: string;
    advance_study_reasons?: string[];
    advance_study_reasons_other?: string;
    exam_name?: string;
    exam_license_date?: string;
    exam_year_taken?: string;
    exam_rating?: string;
    training_title_1?: string;
    training_title_2?: string;
    training_title_3?: string;
    ever_employed: string;
    company_name?: string;
    company_nature?: string;
    company_email?: string;
    company_contact?: string;
    company_address?: string;
    employment_status?: string[];
    recent_position?: string[];
    business_name?: string;
    business_address?: string;
    business_nature?: string;
    reasons_for_staying?: string[];
    reasons_for_staying_other?: string;
    reasons_for_unemployment?: string[];
    reasons_for_unemployment_other?: string;
    first_job_related?: string;
    unrelated_job_reasons?: string[];
    unrelated_job_reasons_other?: string;
    job_change_reasons?: string[];
    job_change_reasons_other?: string;
    first_job_duration?: string;
    first_job_duration_other?: string;
    how_found_first_job?: string;
    how_found_first_job_other?: string;
    time_to_land_job?: string;
    time_to_land_job_other?: string;
    initial_gross_monthly_earning?: string;
    recent_gross_monthly_earning?: string;
}

interface ViewGraduateProfileProps {
    graduate: Graduate | null;
}

export default function ViewGraduateProfile({ graduate }: ViewGraduateProfileProps) {
    const [currentSection, setCurrentSection] = useState(1);

    if (!graduate) {
        return (
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
                <p className="text-gray-500 dark:text-gray-400">No graduate profile data available.</p>
            </div>
        );
    }

    const sections = [
        { id: 1, title: 'General Info & Images' },
        { id: 2, title: 'Educational Background' },
        { id: 3, title: 'Professional Exam' },
        { id: 4, title: 'Trainings' },
        { id: 5, title: 'Employment Data' },
    ];

    const InfoField = ({ label, value }: { label: string; value?: string | string[] | null }) => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
            return null;
        }

        return (
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label}
                </label>
                <div className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    {Array.isArray(value) ? value.join(', ') : value}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">My Graduate Profile</h2>
                <p className="text-gray-600 dark:text-gray-400">View all your submitted tracer information</p>
            </div>

            {/* Section Navigation */}
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <nav className="flex flex-wrap -mb-px space-x-2">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setCurrentSection(section.id)}
                            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                                currentSection === section.id
                                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                            }`}
                        >
                            {section.title}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Section Content */}
            <div className="space-y-6">
                {/* Section 1: General Info & Images */}
                {currentSection === 1 && (
                    <div className="space-y-6">
                        {/* Profile Picture */}
                        {graduate.profile_picture && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Profile Picture
                                </label>
                                <img
                                    src={`/uploads/${graduate.profile_picture}`}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 dark:border-blue-400"
                                />
                            </div>
                        )}

                        {/* Activity Images */}
                        {graduate.activity_images && graduate.activity_images.length > 0 && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Activity Images
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {graduate.activity_images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={`/uploads/${image}`}
                                            alt={`Activity ${index + 1}`}
                                            className="w-full h-32 object-cover rounded-lg border-2 border-gray-300 dark:border-gray-600"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoField label="Surname" value={graduate.surname} />
                            <InfoField label="First Name" value={graduate.first_name} />
                            <InfoField label="Middle Name" value={graduate.middle_name} />
                            <InfoField label="Email" value={graduate.email} />
                            <InfoField label="Phone" value={graduate.phone} />
                            <InfoField label="Permanent Address" value={graduate.permanent_address} />
                            <InfoField label="Sex" value={graduate.sex} />
                            <InfoField label="Civil Status" value={graduate.civil_status} />
                            <InfoField label="Year Graduated" value={graduate.year} />
                            <InfoField label="Course" value={graduate.course} />
                        </div>
                    </div>
                )}

                {/* Section 2: Educational Background */}
                {currentSection === 2 && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoField label="College/Campus" value={graduate.college_campus} />
                            <InfoField label="Program" value={graduate.program} />
                            <InfoField label="Major" value={graduate.major} />
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Advanced Studies</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoField label="School" value={graduate.advance_study_school} />
                                <InfoField label="Date Started" value={graduate.advance_study_date_started} />
                                <InfoField label="Units Earned" value={graduate.advance_study_units_earned} />
                                <InfoField label="Date Graduated" value={graduate.advance_study_date_graduated} />
                                <InfoField label="Reasons for Pursuing Advanced Studies" value={graduate.advance_study_reasons} />
                                <InfoField label="Other Reasons" value={graduate.advance_study_reasons_other} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Section 3: Professional Exam */}
                {currentSection === 3 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InfoField label="Exam Name" value={graduate.exam_name} />
                        <InfoField label="License Date" value={graduate.exam_license_date} />
                        <InfoField label="Year Taken" value={graduate.exam_year_taken} />
                        <InfoField label="Rating" value={graduate.exam_rating} />
                    </div>
                )}

                {/* Section 4: Trainings */}
                {currentSection === 4 && (
                    <div className="space-y-4">
                        <InfoField label="Training 1" value={graduate.training_title_1} />
                        <InfoField label="Training 2" value={graduate.training_title_2} />
                        <InfoField label="Training 3" value={graduate.training_title_3} />
                    </div>
                )}

                {/* Section 5: Employment Data */}
                {currentSection === 5 && (
                    <div className="space-y-6">
                        <InfoField label="Ever Employed?" value={graduate.ever_employed} />

                        {graduate.ever_employed === 'Yes' && (
                            <>
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Company Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InfoField label="Company Name" value={graduate.company_name} />
                                        <InfoField label="Company Nature" value={graduate.company_nature} />
                                        <InfoField label="Company Email" value={graduate.company_email} />
                                        <InfoField label="Company Contact" value={graduate.company_contact} />
                                        <InfoField label="Company Address" value={graduate.company_address} />
                                        <InfoField label="Employment Status" value={graduate.employment_status} />
                                        <InfoField label="Recent Position" value={graduate.recent_position} />
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Business Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InfoField label="Business Name" value={graduate.business_name} />
                                        <InfoField label="Business Address" value={graduate.business_address} />
                                        <InfoField label="Business Nature" value={graduate.business_nature} />
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Employment Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InfoField label="Reasons for Staying" value={graduate.reasons_for_staying} />
                                        <InfoField label="Other Reasons for Staying" value={graduate.reasons_for_staying_other} />
                                        <InfoField label="Reasons for Unemployment" value={graduate.reasons_for_unemployment} />
                                        <InfoField label="Other Reasons for Unemployment" value={graduate.reasons_for_unemployment_other} />
                                        <InfoField label="First Job Related to Course?" value={graduate.first_job_related} />
                                        <InfoField label="Reasons for Unrelated Job" value={graduate.unrelated_job_reasons} />
                                        <InfoField label="Other Reasons for Unrelated Job" value={graduate.unrelated_job_reasons_other} />
                                        <InfoField label="Reasons for Job Change" value={graduate.job_change_reasons} />
                                        <InfoField label="Other Reasons for Job Change" value={graduate.job_change_reasons_other} />
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Job Search & Earnings</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InfoField label="First Job Duration" value={graduate.first_job_duration} />
                                        <InfoField label="Other Duration" value={graduate.first_job_duration_other} />
                                        <InfoField label="How Found First Job" value={graduate.how_found_first_job} />
                                        <InfoField label="Other Method" value={graduate.how_found_first_job_other} />
                                        <InfoField label="Time to Land Job" value={graduate.time_to_land_job} />
                                        <InfoField label="Other Time" value={graduate.time_to_land_job_other} />
                                        <InfoField label="Initial Gross Monthly Earning" value={graduate.initial_gross_monthly_earning} />
                                        <InfoField label="Recent Gross Monthly Earning" value={graduate.recent_gross_monthly_earning} />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
