import { Department } from '@/types';
import Modal from '@/Components/Modal';
import SuccessModal from '@/Components/SuccessModal';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

interface GraduateRegistrationModalProps {
    show: boolean;
    onClose: () => void;
    departments: Department[];
}

export default function GraduateRegistrationModal({ show, onClose, departments }: GraduateRegistrationModalProps) {
    const [showSuccess, setShowSuccess] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);
    const [activityImagePreviews, setActivityImagePreviews] = useState<string[]>([]);
    const totalSteps = 5;

    const { data, setData, post, processing, errors, reset } = useForm({
        // Section A: General Information
        surname: '',
        first_name: '',
        middle_name: '',
        email: '',
        phone: '',
        permanent_address: '',
        sex: '',
        civil_status: '',

        // Section B: Educational Background
        year: '',
        college_campus: '',
        program: '',
        major: '',
        department_id: '',
        course: '',

        // Advanced Studies
        advance_study_school: '',
        advance_study_date_started: '',
        advance_study_units_earned: '',
        advance_study_date_graduated: '',
        advance_study_reasons: [] as string[],
        advance_study_reasons_other: '',

        // Section C: Professional Examination
        exam_name: '',
        exam_license_date: '',
        exam_year_taken: '',
        exam_rating: '',

        // Section D: Trainings
        training_title_1: '',
        training_title_2: '',
        training_title_3: '',

        // Section E: Employment Data
        ever_employed: '',
        company_name: '',
        company_nature: '',
        company_email: '',
        company_contact: '',
        company_address: '',
        employment_status: [] as string[],
        recent_position: [] as string[],
        current_work: '',

        // Self-Employment
        business_name: '',
        business_address: '',
        business_nature: '',

        // Employment Reasons
        reasons_for_staying: [] as string[],
        reasons_for_staying_other: '',
        reasons_for_unemployment: [] as string[],
        reasons_for_unemployment_other: '',

        // First Job Details
        first_job_related: '',
        unrelated_job_reasons: [] as string[],
        unrelated_job_reasons_other: '',
        job_change_reasons: [] as string[],
        job_change_reasons_other: '',
        first_job_duration: '',
        first_job_duration_other: '',

        // Job Search
        how_found_first_job: '',
        how_found_first_job_other: '',
        time_to_land_job: '',
        time_to_land_job_other: '',

        // Salary
        initial_gross_monthly_earning: '',
        recent_gross_monthly_earning: '',

        // Profile Picture
        profile_picture: null as File | null,

        // Activity Images
        activity_images: [] as File[],
    });

    const handleCheckboxChange = (field: keyof typeof data, value: string) => {
        const currentArray = data[field] as string[];
        const newArray = currentArray.includes(value)
            ? currentArray.filter(item => item !== value)
            : [...currentArray, value];
        setData(field, newArray as any);
    };

    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('profile_picture', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicturePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleActivityImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            const limitedFiles = files.slice(0, 5);
            const currentFiles = [...data.activity_images, ...limitedFiles].slice(0, 5);
            setData('activity_images', currentFiles);

            const previews: string[] = [];
            currentFiles.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    previews.push(reader.result as string);
                    if (previews.length === currentFiles.length) {
                        setActivityImagePreviews(previews);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeActivityImage = (index: number) => {
        const newFiles = data.activity_images.filter((_, i) => i !== index);
        const newPreviews = activityImagePreviews.filter((_, i) => i !== index);
        setData('activity_images', newFiles);
        setActivityImagePreviews(newPreviews);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('graduate.register'), {
            onSuccess: () => {
                reset();
                setCurrentStep(1);
                setShowSuccess(true);
            },
        });
    };

    const handleSuccessClose = () => {
        setShowSuccess(false);
        onClose();
    };

    const nextStep = () => {
        if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
    const inputClass = "mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500";
    const selectClass = "mt-1 block w-full border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 [&>option]:bg-white dark:[&>option]:bg-gray-800 [&>option]:text-gray-900 dark:[&>option]:text-gray-100";

    // Dropdown options - Dynamic year from current year back to 1950
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: currentYear - 1949 }, (_, i) => currentYear - i);
    const collegeOptions = ['COED', 'CAS', 'COENG', 'College of Industrial Technology', 'CONHS', 'Mercedes Campus', 'Paranas Campus', 'Graduate School'];
    const programOptions = ['BS Psychology', 'BSIT', 'BSN', 'PhD in Education', 'BSED', 'BEED', 'BSBA', 'BS Biology', 'BS Chemistry', 'BS Mathematics', 'BS Environmental Science', 'AB Political Science', 'AB English', 'AB Filipino', 'BSME', 'BSCE', 'BSEE', 'BSCpE', 'BSIE', 'Bachelor of Public Administration', 'BSA', 'BSF', 'BSFT', 'BSCrim', 'Master in Public Administration', 'Master in Business Administration', 'Master in Nursing', 'Master in Information Technology', 'Master of Arts in Education', 'Doctor of Education', 'Doctor of Philosophy', 'Others'];
    const majorOptions = ['Mathematics', 'English', 'Filipino', 'Science', 'Social Studies', 'TLE', 'MAPEH', 'Pre-school Education', 'Special Education', 'Educational Management', 'Guidance and Counseling', 'N/A', 'Others'];
    const advancedStudyReasons = ['For promotion', 'For professional development', 'Career advancement', 'Personal interest', 'Required by employer', 'To gain expertise', 'For teaching career', 'Research interest', 'Higher salary', 'Career change', 'Others'];
    const employmentStatusOptions = ['Regular/Permanent', 'Self-employed', 'Contractual', 'Casual', 'Temporary'];
    const positionOptions = ['Manager', 'Supervisor', 'Clerical', 'Academic/Teaching', 'Executive/Managerial', 'Professional (Doctor, Lawyer, Engineer)', 'Technical', 'Sales/Service Worker', 'Skilled Agricultural Worker', 'Others'];
    const stayingReasons = ['Career challenge', 'Salaries and benefits', 'Related to special skill', 'Related to course', 'Proximity to residence', 'Family business', 'Good working environment', 'Job security', 'Others'];
    const unemploymentReasons = ['Pursuing further studies', 'Family concerns', 'Health-related reasons', 'Lack of work experience', 'No job opportunity', 'Did not look for a job', 'Lack of interest to work', 'Inadequate salary', 'Others'];
    const unrelatedReasons = ['Better salary/benefits', 'Career advancement opportunity', 'Related to skills', 'Proximity to residence', 'Family business', 'Others'];
    const jobChangeReasons = ['Better salary/benefits', 'Career advancement', 'Healthier work environment', 'Family-related reasons', 'To gain experience', 'Others'];
    const durationOptions = ['Less than 1 month', '1-6 months', '7-11 months', '1-2 years', '2-3 years', '3-4 years', 'More than 4 years', 'Others'];
    const jobFindingMethods = ['Response to job advertisement', 'Walk-in application', 'Recommended by someone', 'Job fair/Public employment service', 'Arranged by school', 'Family business', 'Job posting in social media', 'Others'];
    const timeToJobOptions = ['Less than 1 month', '1-6 months', '7-11 months', '1 year to less than 2 years', '2 years to less than 3 years', '3 years to less than 4 years', '4 years or more', 'Others'];
    const salaryOptions = ['Below ₱5,000', '₱5,000 to ₱9,999', '₱10,000 to ₱14,999', '₱15,000 to ₱19,999', '₱20,000 to ₱24,999', '₱25,000 to ₱49,999', '₱50,000 to ₱99,999', '₱100,000 and above'];

    return (
        <>
            <Modal show={show} onClose={onClose} maxWidth="7xl">
                <div className="p-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Graduate Tracer Survey
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Complete all sections - Step {currentStep} of {totalSteps}
                        </p>

                        {/* Progress Bar */}
                        <div className="mt-4">
                            <div className="flex justify-between items-center">
                                {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                                    <div key={step} className="flex-1 relative">
                                        <div className={`h-2 ${step <= currentStep ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'} ${step === 1 ? 'rounded-l-full' : ''} ${step === totalSteps ? 'rounded-r-full' : ''}`}></div>
                                        <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step <= currentStep ? 'bg-indigo-600 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'}`}>
                                            {step}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submit}>
                        {/* Step 1: General Information */}
                        {currentStep === 1 && (
                            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">General Information</h3>

                                {/* Profile Picture Upload */}
                                <div className="flex flex-col items-center space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div className="text-center">
                                        <label className={labelClass}>Profile Picture</label>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Upload a professional photo (optional)</p>
                                    </div>
                                    {profilePicturePreview ? (
                                        <div className="relative">
                                            <img
                                                src={profilePicturePreview}
                                                alt="Profile Preview"
                                                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 dark:border-indigo-400"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setProfilePicturePreview(null);
                                                    setData('profile_picture', null);
                                                }}
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-4 border-dashed border-gray-300 dark:border-gray-600">
                                            <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        id="profile_picture"
                                        accept="image/*"
                                        onChange={handleProfilePictureChange}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="profile_picture"
                                        className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition text-sm"
                                    >
                                        {profilePicturePreview ? 'Change Photo' : 'Upload Photo'}
                                    </label>
                                    <InputError message={errors.profile_picture} className="mt-2" />
                                </div>

                                {/* Activity Images Upload */}
                                <div className="flex flex-col space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div className="text-center">
                                        <label className={labelClass}>Alumni Previous Activity Images *</label>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Upload up to 5 images of your previous activities (Required)</p>
                                    </div>

                                    {activityImagePreviews.length > 0 && (
                                        <div className="grid grid-cols-5 gap-2">
                                            {activityImagePreviews.map((preview, index) => (
                                                <div key={index} className="relative group">
                                                    <img
                                                        src={preview}
                                                        alt={`Activity ${index + 1}`}
                                                        className="w-full h-24 object-cover rounded-lg border-2 border-indigo-400"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeActivityImage(index)}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
                                                    >
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <input
                                        type="file"
                                        id="activity_images"
                                        accept="image/*"
                                        multiple
                                        onChange={handleActivityImagesChange}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="activity_images"
                                        className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-sm text-center"
                                    >
                                        {activityImagePreviews.length > 0 ? `Add More Images (${activityImagePreviews.length}/5)` : 'Upload Activity Images'}
                                    </label>
                                    <InputError message={errors.activity_images} className="mt-2" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label htmlFor="surname" className={labelClass}>Surname *</label>
                                        <TextInput id="surname" value={data.surname} className={inputClass} onChange={(e) => setData('surname', e.target.value)} required />
                                        <InputError message={errors.surname} className="mt-2" />
                                    </div>
                                    <div>
                                        <label htmlFor="first_name" className={labelClass}>First Name *</label>
                                        <TextInput id="first_name" value={data.first_name} className={inputClass} onChange={(e) => setData('first_name', e.target.value)} required />
                                        <InputError message={errors.first_name} className="mt-2" />
                                    </div>
                                    <div>
                                        <label htmlFor="middle_name" className={labelClass}>Middle Name</label>
                                        <TextInput id="middle_name" value={data.middle_name} className={inputClass} onChange={(e) => setData('middle_name', e.target.value)} />
                                        <InputError message={errors.middle_name} className="mt-2" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="email" className={labelClass}>Email Address *</label>
                                        <TextInput id="email" type="email" value={data.email} className={inputClass} onChange={(e) => setData('email', e.target.value)} required />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className={labelClass}>Phone Number *</label>
                                        <TextInput id="phone" value={data.phone} className={inputClass} onChange={(e) => setData('phone', e.target.value)} required />
                                        <InputError message={errors.phone} className="mt-2" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="permanent_address" className={labelClass}>Permanent Address *</label>
                                    <textarea id="permanent_address" value={data.permanent_address} className={inputClass} onChange={(e) => setData('permanent_address', e.target.value)} rows={3} required />
                                    <InputError message={errors.permanent_address} className="mt-2" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="sex" className={labelClass}>Sex *</label>
                                        <select id="sex" value={data.sex} className={selectClass} onChange={(e) => setData('sex', e.target.value)} required>
                                            <option value="">Select Sex</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                        <InputError message={errors.sex} className="mt-2" />
                                    </div>
                                    <div>
                                        <label htmlFor="civil_status" className={labelClass}>Civil Status *</label>
                                        <select id="civil_status" value={data.civil_status} className={selectClass} onChange={(e) => setData('civil_status', e.target.value)} required>
                                            <option value="">Select Civil Status</option>
                                            <option value="Single">Single</option>
                                            <option value="Married">Married</option>
                                            <option value="Separated/Divorced">Separated/Divorced</option>
                                            <option value="Widow/Widower">Widow/Widower</option>
                                            <option value="Single Parent">Single Parent</option>
                                        </select>
                                        <InputError message={errors.civil_status} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Educational Background */}
                        {currentStep === 2 && (
                            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">Educational Background</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="year" className={labelClass}>Year Graduated *</label>
                                        <select id="year" value={data.year} className={selectClass} onChange={(e) => setData('year', e.target.value)} required>
                                            <option value="">Select Year</option>
                                            {yearOptions.map(year => (<option key={year} value={year}>{year}</option>))}
                                        </select>
                                        <InputError message={errors.year} className="mt-2" />
                                    </div>
                                    <div>
                                        <label htmlFor="college_campus" className={labelClass}>College/Campus *</label>
                                        <select id="college_campus" value={data.college_campus} className={selectClass} onChange={(e) => setData('college_campus', e.target.value)} required>
                                            <option value="">Select College/Campus</option>
                                            {collegeOptions.map(college => (<option key={college} value={college}>{college}</option>))}
                                        </select>
                                        <InputError message={errors.college_campus} className="mt-2" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="program" className={labelClass}>Program *</label>
                                        <select id="program" value={data.program} className={selectClass} onChange={(e) => setData('program', e.target.value)} required>
                                            <option value="">Select Program</option>
                                            {programOptions.map(program => (<option key={program} value={program}>{program}</option>))}
                                        </select>
                                        <InputError message={errors.program} className="mt-2" />
                                    </div>
                                    <div>
                                        <label htmlFor="major" className={labelClass}>Major/Specialization</label>
                                        <select id="major" value={data.major} className={selectClass} onChange={(e) => setData('major', e.target.value)}>
                                            <option value="">Select Major</option>
                                            {majorOptions.map(major => (<option key={major} value={major}>{major}</option>))}
                                        </select>
                                        <InputError message={errors.major} className="mt-2" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="department_id" className={labelClass}>Department *</label>
                                        <select id="department_id" value={data.department_id} className={selectClass} onChange={(e) => setData('department_id', e.target.value)} required>
                                            <option value="">Select Department</option>
                                            {departments.map(dept => (<option key={dept.id} value={dept.id}>{dept.name}</option>))}
                                        </select>
                                        <InputError message={errors.department_id} className="mt-2" />
                                    </div>
                                    <div>
                                        <label htmlFor="course" className={labelClass}>Course *</label>
                                        <TextInput id="course" value={data.course} className={inputClass} onChange={(e) => setData('course', e.target.value)} required />
                                        <InputError message={errors.course} className="mt-2" />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-4">Advanced/Professional Studies (Optional)</h4>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="advance_study_school" className={labelClass}>Name of School</label>
                                            <TextInput id="advance_study_school" value={data.advance_study_school} className={inputClass} onChange={(e) => setData('advance_study_school', e.target.value)} />
                                        </div>
                                        <div>
                                            <label htmlFor="advance_study_date_started" className={labelClass}>Date Started</label>
                                            <TextInput id="advance_study_date_started" value={data.advance_study_date_started} className={inputClass} onChange={(e) => setData('advance_study_date_started', e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <div>
                                            <label htmlFor="advance_study_units_earned" className={labelClass}>Units Earned</label>
                                            <TextInput id="advance_study_units_earned" value={data.advance_study_units_earned} className={inputClass} onChange={(e) => setData('advance_study_units_earned', e.target.value)} />
                                        </div>
                                        <div>
                                            <label htmlFor="advance_study_date_graduated" className={labelClass}>Date Graduated</label>
                                            <input type="date" id="advance_study_date_graduated" value={data.advance_study_date_graduated} className={inputClass} onChange={(e) => setData('advance_study_date_graduated', e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label className={labelClass}>Reasons for Taking Advanced Studies</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                            {advancedStudyReasons.map((reason) => (
                                                <label key={reason} className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                                                    <input type="checkbox" checked={data.advance_study_reasons.includes(reason)} onChange={() => handleCheckboxChange('advance_study_reasons', reason)} className="mr-2 rounded" />
                                                    {reason}
                                                </label>
                                            ))}
                                        </div>
                                        {data.advance_study_reasons.includes('Others') && (
                                            <div className="mt-2">
                                                <TextInput placeholder="Please specify" value={data.advance_study_reasons_other} className={inputClass} onChange={(e) => setData('advance_study_reasons_other', e.target.value)} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Professional Examination & Trainings */}
                        {currentStep === 3 && (
                            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">Professional Examination & Trainings</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="exam_name" className={labelClass}>Examination Name</label>
                                        <TextInput id="exam_name" value={data.exam_name} className={inputClass} onChange={(e) => setData('exam_name', e.target.value)} placeholder="e.g., Licensure Exam for Teachers" />
                                    </div>
                                    <div>
                                        <label htmlFor="exam_license_date" className={labelClass}>Date of License/Certification</label>
                                        <input type="date" id="exam_license_date" value={data.exam_license_date} className={inputClass} onChange={(e) => setData('exam_license_date', e.target.value)} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="exam_year_taken" className={labelClass}>Year Taken</label>
                                        <TextInput id="exam_year_taken" value={data.exam_year_taken} className={inputClass} onChange={(e) => setData('exam_year_taken', e.target.value)} placeholder="e.g., 2023" />
                                    </div>
                                    <div>
                                        <label htmlFor="exam_rating" className={labelClass}>Rating/Score</label>
                                        <TextInput id="exam_rating" value={data.exam_rating} className={inputClass} onChange={(e) => setData('exam_rating', e.target.value)} placeholder="e.g., 85.5%" />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-4">Relevant Trainings/Seminars Attended</h4>

                                    <div className="space-y-3">
                                        <div>
                                            <label htmlFor="training_title_1" className={labelClass}>Training #1</label>
                                            <TextInput id="training_title_1" value={data.training_title_1} className={inputClass} onChange={(e) => setData('training_title_1', e.target.value)} placeholder="Title of training/seminar" />
                                        </div>
                                        <div>
                                            <label htmlFor="training_title_2" className={labelClass}>Training #2</label>
                                            <TextInput id="training_title_2" value={data.training_title_2} className={inputClass} onChange={(e) => setData('training_title_2', e.target.value)} placeholder="Title of training/seminar" />
                                        </div>
                                        <div>
                                            <label htmlFor="training_title_3" className={labelClass}>Training #3</label>
                                            <TextInput id="training_title_3" value={data.training_title_3} className={inputClass} onChange={(e) => setData('training_title_3', e.target.value)} placeholder="Title of training/seminar" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Employment Data - Part 1 */}
                        {currentStep === 4 && (
                            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">Employment Data - Part 1</h3>

                                <div>
                                    <label className={labelClass}>Ever Employed After Graduation? *</label>
                                    <div className="flex space-x-4 mt-2">
                                        <label className="flex items-center text-gray-700 dark:text-gray-300">
                                            <input type="radio" name="ever_employed" value="Yes" checked={data.ever_employed === 'Yes'} onChange={(e) => setData('ever_employed', e.target.value)} className="mr-2" required />
                                            Yes
                                        </label>
                                        <label className="flex items-center text-gray-700 dark:text-gray-300">
                                            <input type="radio" name="ever_employed" value="No" checked={data.ever_employed === 'No'} onChange={(e) => setData('ever_employed', e.target.value)} className="mr-2" />
                                            No
                                        </label>
                                    </div>
                                    <InputError message={errors.ever_employed} className="mt-2" />
                                </div>

                                {data.ever_employed === 'Yes' && (
                                    <>
                                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                            <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-4">Current/Recent Employment Information</h4>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="company_name" className={labelClass}>Company/Organization Name *</label>
                                                    <TextInput id="company_name" value={data.company_name} className={inputClass} onChange={(e) => setData('company_name', e.target.value)} required />
                                                    <InputError message={errors.company_name} className="mt-2" />
                                                </div>
                                                <div>
                                                    <label htmlFor="company_nature" className={labelClass}>Nature of Business</label>
                                                    <TextInput id="company_nature" value={data.company_nature} className={inputClass} onChange={(e) => setData('company_nature', e.target.value)} />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                <div>
                                                    <label htmlFor="company_email" className={labelClass}>Company Email</label>
                                                    <TextInput id="company_email" type="email" value={data.company_email} className={inputClass} onChange={(e) => setData('company_email', e.target.value)} />
                                                </div>
                                                <div>
                                                    <label htmlFor="company_contact" className={labelClass}>Company Contact Number</label>
                                                    <TextInput id="company_contact" value={data.company_contact} className={inputClass} onChange={(e) => setData('company_contact', e.target.value)} />
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <label htmlFor="company_address" className={labelClass}>Company Address</label>
                                                <textarea id="company_address" value={data.company_address} className={inputClass} onChange={(e) => setData('company_address', e.target.value)} rows={2} />
                                            </div>

                                            <div className="mt-4">
                                                <label className={labelClass}>Employment Status</label>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                                    {employmentStatusOptions.map((status) => (
                                                        <label key={status} className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                                                            <input type="checkbox" checked={data.employment_status.includes(status)} onChange={() => handleCheckboxChange('employment_status', status)} className="mr-2 rounded" />
                                                            {status}
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <label className={labelClass}>Recent Position/Occupation</label>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                                    {positionOptions.map((position) => (
                                                        <label key={position} className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                                                            <input type="checkbox" checked={data.recent_position.includes(position)} onChange={() => handleCheckboxChange('recent_position', position)} className="mr-2 rounded" />
                                                            {position}
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <label htmlFor="current_work" className={labelClass}>Current Work/Position Description</label>
                                                <TextInput id="current_work" value={data.current_work} className={inputClass} onChange={(e) => setData('current_work', e.target.value)} />
                                            </div>
                                        </div>

                                        {data.employment_status.includes('Self-employed') && (
                                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                                <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-4">Self-Employment Details</h4>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="business_name" className={labelClass}>Business Name</label>
                                                        <TextInput id="business_name" value={data.business_name} className={inputClass} onChange={(e) => setData('business_name', e.target.value)} />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="business_nature" className={labelClass}>Nature of Business</label>
                                                        <TextInput id="business_nature" value={data.business_nature} className={inputClass} onChange={(e) => setData('business_nature', e.target.value)} />
                                                    </div>
                                                </div>

                                                <div className="mt-4">
                                                    <label htmlFor="business_address" className={labelClass}>Business Address</label>
                                                    <textarea id="business_address" value={data.business_address} className={inputClass} onChange={(e) => setData('business_address', e.target.value)} rows={2} />
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

                                {data.ever_employed === 'No' && (
                                    <div className="pt-4">
                                        <label className={labelClass}>Reasons for Non-Employment</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                            {unemploymentReasons.map((reason) => (
                                                <label key={reason} className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                                                    <input type="checkbox" checked={data.reasons_for_unemployment.includes(reason)} onChange={() => handleCheckboxChange('reasons_for_unemployment', reason)} className="mr-2 rounded" />
                                                    {reason}
                                                </label>
                                            ))}
                                        </div>
                                        {data.reasons_for_unemployment.includes('Others') && (
                                            <div className="mt-2">
                                                <TextInput placeholder="Please specify" value={data.reasons_for_unemployment_other} className={inputClass} onChange={(e) => setData('reasons_for_unemployment_other', e.target.value)} />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 5: Employment Data - Part 2 */}
                        {currentStep === 5 && data.ever_employed === 'Yes' && (
                            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">Employment Details - Part 2</h3>

                                <div>
                                    <label className={labelClass}>Reasons for Staying in Current Job</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                        {stayingReasons.map((reason) => (
                                            <label key={reason} className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                                                <input type="checkbox" checked={data.reasons_for_staying.includes(reason)} onChange={() => handleCheckboxChange('reasons_for_staying', reason)} className="mr-2 rounded" />
                                                {reason}
                                            </label>
                                        ))}
                                    </div>
                                    {data.reasons_for_staying.includes('Others') && (
                                        <div className="mt-2">
                                            <TextInput placeholder="Please specify" value={data.reasons_for_staying_other} className={inputClass} onChange={(e) => setData('reasons_for_staying_other', e.target.value)} />
                                        </div>
                                    )}
                                </div>

                                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-4">First Job Information</h4>

                                    <div>
                                        <label className={labelClass}>Was your first job related to your course?</label>
                                        <div className="flex space-x-4 mt-2">
                                            <label className="flex items-center text-gray-700 dark:text-gray-300">
                                                <input type="radio" name="first_job_related" value="Yes" checked={data.first_job_related === 'Yes'} onChange={(e) => setData('first_job_related', e.target.value)} className="mr-2" />
                                                Yes
                                            </label>
                                            <label className="flex items-center text-gray-700 dark:text-gray-300">
                                                <input type="radio" name="first_job_related" value="No" checked={data.first_job_related === 'No'} onChange={(e) => setData('first_job_related', e.target.value)} className="mr-2" />
                                                No
                                            </label>
                                        </div>
                                    </div>

                                    {data.first_job_related === 'No' && (
                                        <div className="mt-4">
                                            <label className={labelClass}>Reasons for Accepting Job NOT Related to Course</label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                                {unrelatedReasons.map((reason) => (
                                                    <label key={reason} className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                                                        <input type="checkbox" checked={data.unrelated_job_reasons.includes(reason)} onChange={() => handleCheckboxChange('unrelated_job_reasons', reason)} className="mr-2 rounded" />
                                                        {reason}
                                                    </label>
                                                ))}
                                            </div>
                                            {data.unrelated_job_reasons.includes('Others') && (
                                                <div className="mt-2">
                                                    <TextInput placeholder="Please specify" value={data.unrelated_job_reasons_other} className={inputClass} onChange={(e) => setData('unrelated_job_reasons_other', e.target.value)} />
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="mt-4">
                                        <label className={labelClass}>Reasons for Changing Job/Employer</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                            {jobChangeReasons.map((reason) => (
                                                <label key={reason} className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                                                    <input type="checkbox" checked={data.job_change_reasons.includes(reason)} onChange={() => handleCheckboxChange('job_change_reasons', reason)} className="mr-2 rounded" />
                                                    {reason}
                                                </label>
                                            ))}
                                        </div>
                                        {data.job_change_reasons.includes('Others') && (
                                            <div className="mt-2">
                                                <TextInput placeholder="Please specify" value={data.job_change_reasons_other} className={inputClass} onChange={(e) => setData('job_change_reasons_other', e.target.value)} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <div>
                                            <label htmlFor="first_job_duration" className={labelClass}>Duration in First Job</label>
                                            <select id="first_job_duration" value={data.first_job_duration} className={selectClass} onChange={(e) => setData('first_job_duration', e.target.value)}>
                                                <option value="">Select Duration</option>
                                                {durationOptions.map(duration => (<option key={duration} value={duration}>{duration}</option>))}
                                            </select>
                                        </div>
                                        {data.first_job_duration === 'Others' && (
                                            <div>
                                                <label htmlFor="first_job_duration_other" className={labelClass}>Specify Duration</label>
                                                <TextInput id="first_job_duration_other" value={data.first_job_duration_other} className={inputClass} onChange={(e) => setData('first_job_duration_other', e.target.value)} />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-4">Job Search & Salary Information</h4>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="how_found_first_job" className={labelClass}>How did you find your first job?</label>
                                            <select id="how_found_first_job" value={data.how_found_first_job} className={selectClass} onChange={(e) => setData('how_found_first_job', e.target.value)}>
                                                <option value="">Select Method</option>
                                                {jobFindingMethods.map(method => (<option key={method} value={method}>{method}</option>))}
                                            </select>
                                        </div>
                                        {data.how_found_first_job === 'Others' && (
                                            <div>
                                                <label htmlFor="how_found_first_job_other" className={labelClass}>Specify Method</label>
                                                <TextInput id="how_found_first_job_other" value={data.how_found_first_job_other} className={inputClass} onChange={(e) => setData('how_found_first_job_other', e.target.value)} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <div>
                                            <label htmlFor="time_to_land_job" className={labelClass}>Time to Land First Job After Graduation</label>
                                            <select id="time_to_land_job" value={data.time_to_land_job} className={selectClass} onChange={(e) => setData('time_to_land_job', e.target.value)}>
                                                <option value="">Select Time Period</option>
                                                {timeToJobOptions.map(time => (<option key={time} value={time}>{time}</option>))}
                                            </select>
                                        </div>
                                        {data.time_to_land_job === 'Others' && (
                                            <div>
                                                <label htmlFor="time_to_land_job_other" className={labelClass}>Specify Time Period</label>
                                                <TextInput id="time_to_land_job_other" value={data.time_to_land_job_other} className={inputClass} onChange={(e) => setData('time_to_land_job_other', e.target.value)} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <div>
                                            <label htmlFor="initial_gross_monthly_earning" className={labelClass}>Initial Gross Monthly Earning</label>
                                            <select id="initial_gross_monthly_earning" value={data.initial_gross_monthly_earning} className={selectClass} onChange={(e) => setData('initial_gross_monthly_earning', e.target.value)}>
                                                <option value="">Select Salary Range</option>
                                                {salaryOptions.map(salary => (<option key={salary} value={salary}>{salary}</option>))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="recent_gross_monthly_earning" className={labelClass}>Recent/Current Gross Monthly Earning</label>
                                            <select id="recent_gross_monthly_earning" value={data.recent_gross_monthly_earning} className={selectClass} onChange={(e) => setData('recent_gross_monthly_earning', e.target.value)}>
                                                <option value="">Select Salary Range</option>
                                                {salaryOptions.map(salary => (<option key={salary} value={salary}>{salary}</option>))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Skip step 5 if not employed */}
                        {currentStep === 5 && data.ever_employed === 'No' && (
                            <div className="text-center py-12">
                                <p className="text-gray-600 dark:text-gray-400">Employment details section is not applicable since you have not been employed.</p>
                                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Click "Submit Registration" to complete the form.</p>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
                            <div>
                                {currentStep > 1 && (
                                    <button type="button" onClick={prevStep} className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition">
                                        Previous
                                    </button>
                                )}
                            </div>
                            <div className="flex gap-4">
                                <button type="button" onClick={onClose} className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                                    Cancel
                                </button>
                                {currentStep < totalSteps ? (
                                    <button type="button" onClick={nextStep} className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                                        Next
                                    </button>
                                ) : (
                                    <button type="submit" disabled={processing} className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                        {processing ? 'Submitting...' : 'Submit Registration'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>

            {showSuccess && (
                <SuccessModal
                    show={showSuccess}
                    onClose={handleSuccessClose}
                    title="Registration Submitted Successfully!"
                    message="Thank you for registering! Your information has been submitted for admin approval. Once approved, you will be featured in our alumni directory."
                />
            )}
        </>
    );
}
