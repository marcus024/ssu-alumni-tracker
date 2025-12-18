import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps, Department } from '@/types';
import { FormEventHandler, useState } from 'react';

interface RegisterProps extends PageProps {
    departments: Department[];
}

// Form data structure with all 52 fields
interface FormData {
    // Account
    email: string;
    password: string;
    password_confirmation: string;
    // Section A: General Information
    surname: string;
    first_name: string;
    middle_name: string;
    phone: string;
    permanent_address: string;
    sex: string;
    civil_status: string;
    // Section B: Educational Background
    year: string;
    college_campus: string;
    department_id: string;
    program: string;
    major: string;
    course: string;
    current_work: string;
    // Advanced Studies
    advance_study_school: string;
    advance_study_date_started: string;
    advance_study_units_earned: string;
    advance_study_date_graduated: string;
    advance_study_reasons: string[];
    advance_study_reasons_other: string;
    // Section C: Professional Examination
    exam_name: string;
    exam_license_date: string;
    exam_year_taken: string;
    exam_rating: string;
    // Section D: Trainings
    training_title_1: string;
    training_title_2: string;
    training_title_3: string;
    // Section E: Employment Data
    ever_employed: string;
    company_name: string;
    company_nature: string;
    company_email: string;
    company_contact: string;
    company_address: string;
    employment_status: string[];
    recent_position: string[];
    business_name: string;
    business_address: string;
    business_nature: string;
    reasons_for_staying: string[];
    reasons_for_staying_other: string;
    reasons_for_unemployment: string[];
    reasons_for_unemployment_other: string;
    first_job_related: string;
    unrelated_job_reasons: string[];
    unrelated_job_reasons_other: string;
    job_change_reasons: string[];
    job_change_reasons_other: string;
    first_job_duration: string;
    first_job_duration_other: string;
    how_found_first_job: string;
    how_found_first_job_other: string;
    time_to_land_job: string;
    time_to_land_job_other: string;
    initial_gross_monthly_earning: string;
    recent_gross_monthly_earning: string;
    role: string;
    profile_picture: File | null;
    activity_images: File[];
}

export default function Register({ departments }: RegisterProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);
    const [activityImagePreviews, setActivityImagePreviews] = useState<string[]>([]);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const totalSteps = 5;

    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        email: '',
        password: '',
        password_confirmation: '',
        surname: '',
        first_name: '',
        middle_name: '',
        phone: '',
        permanent_address: '',
        sex: '',
        civil_status: '',
        year: '',
        college_campus: '',
        department_id: '',
        program: '',
        major: '',
        course: '',
        current_work: '',
        advance_study_school: '',
        advance_study_date_started: '',
        advance_study_units_earned: '',
        advance_study_date_graduated: '',
        advance_study_reasons: [],
        advance_study_reasons_other: '',
        exam_name: '',
        exam_license_date: '',
        exam_year_taken: '',
        exam_rating: '',
        training_title_1: '',
        training_title_2: '',
        training_title_3: '',
        ever_employed: '',
        company_name: '',
        company_nature: '',
        company_email: '',
        company_contact: '',
        company_address: '',
        employment_status: [],
        recent_position: [],
        business_name: '',
        business_address: '',
        business_nature: '',
        reasons_for_staying: [],
        reasons_for_staying_other: '',
        reasons_for_unemployment: [],
        reasons_for_unemployment_other: '',
        first_job_related: '',
        unrelated_job_reasons: [],
        unrelated_job_reasons_other: '',
        job_change_reasons: [],
        job_change_reasons_other: '',
        first_job_duration: '',
        first_job_duration_other: '',
        how_found_first_job: '',
        how_found_first_job_other: '',
        time_to_land_job: '',
        time_to_land_job_other: '',
        initial_gross_monthly_earning: '',
        recent_gross_monthly_earning: '',
        role: 'graduate',
        profile_picture: null,
        activity_images: [],
    });

    // Form Options from Google Form
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: currentYear - 1949 }, (_, i) => currentYear - i);
    const collegeOptions = ['COED', 'CAS', 'COENG', 'College of Industrial Technology', 'CONHS', 'Mercedes Campus', 'Paranas Campus', 'Graduate School'];
    const programOptions = ['BS Psychology', 'BSIT', 'BSN', 'PhD in Education', 'Master in Education', 'BS Computer Science', 'BS Information Systems',
        'BS Business Administration', 'BS Accountancy', 'BS Civil Engineering', 'BS Electrical Engineering', 'BS Electronics Engineering',
        'BS Mechanical Engineering', 'BS Architecture', 'Elementary Education', 'Secondary Education', 'Physical Education',
        'AB English', 'AB Filipino', 'AB Political Science', 'AB History', 'BS Biology', 'BS Chemistry', 'BS Physics', 'BS Mathematics',
        'BS Hotel and Restaurant Management', 'BS Tourism Management', 'BS Social Work', 'BS Public Administration',
        'BS Marine Biology', 'BS Fisheries', 'BS Agriculture', 'BS Food Technology', 'BEED'];
    const majorOptions = ['Mathematics', 'English', 'Filipino', 'Science', 'Social Studies', 'MAPEH', 'TLE', 'Values Education',
        'Special Education', 'Early Childhood Education', 'Electronics Technology', 'Electrical Technology', 'Mechanical Technology',
        'Civil Technology', 'Automotive Technology', 'Computer Technology', 'Drafting Technology', 'Food Technology',
        'Garments Technology', 'Furniture Technology', 'NOT APPLICABLE'];

    const advanceStudyReasonOptions = [
        'For promotion', 'For professional development', 'For career advancement',
        'For higher salary', 'Pursue passion in the field of specialization',
        'Peer influence', 'Family influence', 'Attractive compensation package',
        'Immediate employment', 'Availability of job', 'Other reasons'
    ];

    const employmentStatusOptions = ['Regular/Permanent', 'Self-employed', 'Contractual', 'Casual', 'Temporary'];

    const recentPositionOptions = [
        'Managers', 'Professionals', 'Technicians and Associate Professionals',
        'Clerical Support Workers', 'Service and Sales Workers',
        'Skilled Agricultural, Forestry and Fishery Workers',
        'Craft and Related Trades Workers', 'Plant and Machine Operators and Assemblers',
        'Elementary Occupations', 'Armed Forces Occupations'
    ];

    const reasonsStayingOptions = [
        'Salaries and benefits', 'Career challenge', 'Related to special skill',
        'Proximity to residence', 'Peer influence', 'Family influence'
    ];

    const reasonsUnemploymentOptions = [
        'Advance or further study', 'Family concern and decided not to find a job',
        'Health-related reason(s)', 'Lack of work experience', 'No job opportunity'
    ];

    const unrelatedJobReasonOptions = [
        'Salaries and benefits', 'Career challenge', 'Related to special skill',
        'Proximity to residence'
    ];

    const jobChangeReasonOptions = [
        'Salaries and benefits', 'Career challenge', 'Related to special skill',
        'Proximity to residence'
    ];

    const durationOptions = [
        'Less than a month', '1 to 6 months', '7 to 11 months',
        '1 year to less than 2 years', '2 years to less than 3 years'
    ];

    const jobSearchMethodOptions = [
        'Response to an advertisement', 'As walk-in applicant',
        'Recommended by someone', 'Information from friends',
        'Arranged by school\'s job placement', 'Family business',
        'Job Fair or Public Employment Service Office (PESO)'
    ];

    const timeToLandJobOptions = [
        'Less than a month', '1 to 6 months', '7 to 11 months',
        '1 year to less than 2 years', '2 years to less than 3 years'
    ];

    const salaryOptions = [
        'Below ₱5,000', '₱5,000 to ₱9,999', '₱10,000 to ₱14,999',
        '₱15,000 to ₱19,999', '₱20,000 to ₱24,999', '₱25,000 to ₱49,999',
        '₱50,000 to ₱99,999', '₱100,000 and above'
    ];

    const handleCheckboxChange = (field: keyof FormData, value: string) => {
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
            // Limit to 5 images
            const limitedFiles = files.slice(0, 5);
            const currentFiles = [...data.activity_images, ...limitedFiles].slice(0, 5);
            setData('activity_images', currentFiles);

            // Generate previews
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

    const validateStep = (step: number): boolean => {
        const newErrors: string[] = [];

        // Helper function to check if a field is empty (null, undefined, or whitespace)
        const isEmpty = (value: any): boolean => {
            return value === null || value === undefined || (typeof value === 'string' && value.trim() === '');
        };

        if (step === 1) {
            // Account & General Information
            if (isEmpty(data.email)) newErrors.push('Email is required');
            if (isEmpty(data.password)) newErrors.push('Password is required');
            if (isEmpty(data.password_confirmation)) newErrors.push('Password confirmation is required');
            if (!isEmpty(data.password) && !isEmpty(data.password_confirmation) && data.password !== data.password_confirmation) {
                newErrors.push('Passwords do not match');
            }
            if (isEmpty(data.surname)) newErrors.push('Surname is required');
            if (isEmpty(data.first_name)) newErrors.push('First name is required');
            if (isEmpty(data.phone)) newErrors.push('Phone number is required');
            if (isEmpty(data.permanent_address)) newErrors.push('Permanent address is required');
            if (isEmpty(data.sex)) newErrors.push('Sex is required');
            if (isEmpty(data.civil_status)) newErrors.push('Civil status is required');
        } else if (step === 2) {
            // Educational Background
            if (isEmpty(data.year)) newErrors.push('Year graduated is required');
            if (isEmpty(data.college_campus)) newErrors.push('College/Campus is required');
            if (isEmpty(data.department_id)) newErrors.push('Department is required');
            if (isEmpty(data.program)) newErrors.push('Program is required');
            if (isEmpty(data.course)) newErrors.push('Course is required');
        } else if (step === 3) {
            // Professional Exam & Trainings - All optional, no validation needed
        } else if (step === 4) {
            // Employment Data Part 1
            if (isEmpty(data.ever_employed)) newErrors.push('Please indicate if you have ever been employed');
        } else if (step === 5) {
            // Employment Data Part 2 - Optional fields based on employment status
        }

        setValidationErrors(newErrors);

        if (newErrors.length > 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return false;
        }

        return true;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            if (currentStep < totalSteps) {
                setValidationErrors([]);
                setCurrentStep(currentStep + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setValidationErrors([]);
            setCurrentStep(currentStep - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const inputClass = "w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400 rounded-md shadow-sm";
    const labelClass = "block text-sm font-medium text-white mb-2";
    const selectClass = "w-full bg-white/10 border-white/20 text-white rounded-md shadow-sm focus:border-blue-400 focus:ring-blue-400 [&>option]:bg-gray-800 [&>option]:text-white";

    return (
        <GuestLayout wide={true}>
            <Head title="Register - SSU Alumni Management System" />

            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Graduate Tracer Survey</h2>
                <p className="text-white/70 text-sm">Complete Registration Form</p>
                <div className="mt-4 flex justify-center items-center space-x-2">
                    {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                        <div
                            key={step}
                            className={`h-2 w-12 rounded-full ${
                                step <= currentStep ? 'bg-blue-500' : 'bg-white/20'
                            }`}
                        />
                    ))}
                </div>
                <p className="text-white/60 text-xs mt-2">Step {currentStep} of {totalSteps}</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                {/* Validation Errors Display */}
                {validationErrors.length > 0 && (
                    <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-4">
                        <div className="flex items-start">
                            <svg className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <div className="flex-1">
                                <h4 className="text-red-400 font-semibold mb-2">Please fix the following errors:</h4>
                                <ul className="list-disc list-inside space-y-1 text-red-300 text-sm">
                                    {validationErrors.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 1: Account & Basic Info */}
                {currentStep === 1 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white border-b border-white/20 pb-2">
                            Account & General Information
                        </h3>

                        {/* Profile Picture Upload */}
                        <div className="flex flex-col items-center space-y-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                            <div className="text-center">
                                <label className={labelClass}>Profile Picture</label>
                                <p className="text-xs text-white/50">Upload a professional photo (optional)</p>
                            </div>
                            {profilePicturePreview ? (
                                <div className="relative">
                                    <img
                                        src={profilePicturePreview}
                                        alt="Profile Preview"
                                        className="w-32 h-32 rounded-full object-cover border-4 border-blue-400"
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
                                <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center border-4 border-dashed border-white/20">
                                    <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-sm"
                            >
                                {profilePicturePreview ? 'Change Photo' : 'Upload Photo'}
                            </label>
                            <InputError message={errors.profile_picture} className="mt-2 text-red-300" />
                        </div>

                        {/* Activity Images Upload */}
                        <div className="flex flex-col space-y-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                            <div className="text-center">
                                <label className={labelClass}>Alumni Previous Activity Images *</label>
                                <p className="text-xs text-white/50">Upload up to 5 images of your previous activities (Required)</p>
                            </div>

                            {activityImagePreviews.length > 0 && (
                                <div className="grid grid-cols-5 gap-2">
                                    {activityImagePreviews.map((preview, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={preview}
                                                alt={`Activity ${index + 1}`}
                                                className="w-full h-24 object-cover rounded-lg border-2 border-blue-400"
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
                                className="cursor-pointer px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition text-sm text-center"
                            >
                                {activityImagePreviews.length > 0 ? `Add More Images (${activityImagePreviews.length}/5)` : 'Upload Activity Images'}
                            </label>
                            <InputError message={errors.activity_images} className="mt-2 text-red-300" />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="surname" className={labelClass}>Surname *</label>
                                <TextInput
                                    id="surname"
                                    value={data.surname}
                                    className={inputClass}
                                    onChange={(e) => setData('surname', e.target.value)}
                                    required
                                />
                                <InputError message={errors.surname} className="mt-1 text-red-300" />
                            </div>

                            <div>
                                <label htmlFor="first_name" className={labelClass}>First Name *</label>
                                <TextInput
                                    id="first_name"
                                    value={data.first_name}
                                    className={inputClass}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.first_name} className="mt-1 text-red-300" />
                            </div>

                            <div>
                                <label htmlFor="middle_name" className={labelClass}>Middle Name *</label>
                                <TextInput
                                    id="middle_name"
                                    value={data.middle_name}
                                    className={inputClass}
                                    onChange={(e) => setData('middle_name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.middle_name} className="mt-1 text-red-300" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className={labelClass}>Email Address *</label>
                            <TextInput
                                id="email"
                                type="email"
                                value={data.email}
                                className={inputClass}
                                placeholder="your.email@example.com"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-1 text-red-300" />
                        </div>

                        <div>
                            <label htmlFor="phone" className={labelClass}>Contact Number *</label>
                            <TextInput
                                id="phone"
                                type="tel"
                                value={data.phone}
                                className={inputClass}
                                placeholder="+63 123 456 7890"
                                onChange={(e) => setData('phone', e.target.value)}
                                required
                            />
                            <InputError message={errors.phone} className="mt-1 text-red-300" />
                        </div>

                        <div>
                            <label htmlFor="permanent_address" className={labelClass}>Permanent Address *</label>
                            <textarea
                                id="permanent_address"
                                value={data.permanent_address}
                                onChange={(e) => setData('permanent_address', e.target.value)}
                                className={inputClass}
                                rows={2}
                                required
                            />
                            <InputError message={errors.permanent_address} className="mt-1 text-red-300" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="sex" className={labelClass}>Sex *</label>
                                <select
                                    id="sex"
                                    value={data.sex}
                                    onChange={(e) => setData('sex', e.target.value)}
                                    className={selectClass}
                                    required
                                >
                                    <option value="">Select Sex</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                <InputError message={errors.sex} className="mt-1 text-red-300" />
                            </div>

                            <div>
                                <label htmlFor="civil_status" className={labelClass}>Civil Status *</label>
                                <select
                                    id="civil_status"
                                    value={data.civil_status}
                                    onChange={(e) => setData('civil_status', e.target.value)}
                                    className={selectClass}
                                    required
                                >
                                    <option value="">Select Status</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Separated/Divorced">Separated/Divorced</option>
                                    <option value="Widow/Widower">Widow/Widower</option>
                                    <option value="Single Parent">Single Parent</option>
                                </select>
                                <InputError message={errors.civil_status} className="mt-1 text-red-300" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="password" className={labelClass}>Password *</label>
                                <TextInput
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    className={inputClass}
                                    placeholder="Create a strong password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-1 text-red-300" />
                            </div>

                            <div>
                                <label htmlFor="password_confirmation" className={labelClass}>Confirm Password *</label>
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    className={inputClass}
                                    placeholder="Re-enter password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password_confirmation} className="mt-1 text-red-300" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Educational Background */}
                {currentStep === 2 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white border-b border-white/20 pb-2">
                            Educational Background
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="year" className={labelClass}>Year Graduated *</label>
                                <select
                                    id="year"
                                    value={data.year}
                                    onChange={(e) => setData('year', e.target.value)}
                                    className={selectClass}
                                    required
                                >
                                    <option value="">Select Year</option>
                                    {yearOptions.map(y => (
                                        <option key={y} value={y}>{y}</option>
                                    ))}
                                </select>
                                <InputError message={errors.year} className="mt-1 text-red-300" />
                            </div>

                            <div>
                                <label htmlFor="college_campus" className={labelClass}>College/Campus *</label>
                                <select
                                    id="college_campus"
                                    value={data.college_campus}
                                    onChange={(e) => setData('college_campus', e.target.value)}
                                    className={selectClass}
                                    required
                                >
                                    <option value="">Select College/Campus</option>
                                    {collegeOptions.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                                <InputError message={errors.college_campus} className="mt-1 text-red-300" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="program" className={labelClass}>Program *</label>
                            <select
                                id="program"
                                value={data.program}
                                onChange={(e) => setData('program', e.target.value)}
                                className={selectClass}
                                required
                            >
                                <option value="">Select Program</option>
                                {programOptions.map(p => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                            <InputError message={errors.program} className="mt-1 text-red-300" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="major" className={labelClass}>Major *</label>
                                <select
                                    id="major"
                                    value={data.major}
                                    onChange={(e) => setData('major', e.target.value)}
                                    className={selectClass}
                                    required
                                >
                                    <option value="">Select Major</option>
                                    {majorOptions.map(m => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
                                <InputError message={errors.major} className="mt-1 text-red-300" />
                            </div>

                            <div>
                                <label htmlFor="department_id" className={labelClass}>Department *</label>
                                <select
                                    id="department_id"
                                    value={data.department_id}
                                    onChange={(e) => setData('department_id', e.target.value)}
                                    className={selectClass}
                                    required
                                >
                                    <option value="">Select Department</option>
                                    {departments.map(d => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </select>
                                <InputError message={errors.department_id} className="mt-1 text-red-300" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="course" className={labelClass}>Course/Degree *</label>
                            <TextInput
                                id="course"
                                value={data.course}
                                className={inputClass}
                                placeholder="e.g., BS Computer Science"
                                onChange={(e) => setData('course', e.target.value)}
                                required
                            />
                            <InputError message={errors.course} className="mt-1 text-red-300" />
                        </div>

                        <div className="pt-4 border-t border-white/20">
                            <h4 className="text-md font-medium text-white mb-3">Advanced Studies (Optional)</h4>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="advance_study_school" className={labelClass}>Name of School</label>
                                    <TextInput
                                        id="advance_study_school"
                                        value={data.advance_study_school}
                                        className={inputClass}
                                        onChange={(e) => setData('advance_study_school', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="advance_study_date_started" className={labelClass}>Date Started</label>
                                    <TextInput
                                        id="advance_study_date_started"
                                        value={data.advance_study_date_started}
                                        className={inputClass}
                                        onChange={(e) => setData('advance_study_date_started', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label htmlFor="advance_study_units_earned" className={labelClass}>Units Earned</label>
                                    <TextInput
                                        id="advance_study_units_earned"
                                        value={data.advance_study_units_earned}
                                        className={inputClass}
                                        onChange={(e) => setData('advance_study_units_earned', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="advance_study_date_graduated" className={labelClass}>Date Graduated</label>
                                    <TextInput
                                        id="advance_study_date_graduated"
                                        type="date"
                                        value={data.advance_study_date_graduated}
                                        className={inputClass}
                                        onChange={(e) => setData('advance_study_date_graduated', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className={labelClass}>Reasons for Advance Study</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {advanceStudyReasonOptions.map(reason => (
                                        <label key={reason} className="flex items-center text-white/80 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={data.advance_study_reasons.includes(reason)}
                                                onChange={() => handleCheckboxChange('advance_study_reasons', reason)}
                                                className="rounded border-white/20 text-blue-500 mr-2"
                                            />
                                            {reason}
                                        </label>
                                    ))}
                                </div>
                                {data.advance_study_reasons.includes('Other reasons') && (
                                    <TextInput
                                        value={data.advance_study_reasons_other}
                                        className={`${inputClass} mt-2`}
                                        placeholder="Specify other reasons"
                                        onChange={(e) => setData('advance_study_reasons_other', e.target.value)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Professional Exam & Trainings */}
                {currentStep === 3 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white border-b border-white/20 pb-2">
                            Professional Examination & Trainings
                        </h3>

                        <h4 className="text-md font-medium text-white">Professional Examination (Optional)</h4>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="exam_name" className={labelClass}>Name of Examination</label>
                                <TextInput
                                    id="exam_name"
                                    value={data.exam_name}
                                    className={inputClass}
                                    placeholder="e.g., Licensure Exam for Teachers"
                                    onChange={(e) => setData('exam_name', e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="exam_license_date" className={labelClass}>License Date</label>
                                <TextInput
                                    id="exam_license_date"
                                    type="date"
                                    value={data.exam_license_date}
                                    className={inputClass}
                                    onChange={(e) => setData('exam_license_date', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="exam_year_taken" className={labelClass}>Year Taken</label>
                                <TextInput
                                    id="exam_year_taken"
                                    value={data.exam_year_taken}
                                    className={inputClass}
                                    placeholder="2024"
                                    onChange={(e) => setData('exam_year_taken', e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="exam_rating" className={labelClass}>Rating</label>
                                <TextInput
                                    id="exam_rating"
                                    value={data.exam_rating}
                                    className={inputClass}
                                    placeholder="e.g., 85.5%"
                                    onChange={(e) => setData('exam_rating', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/20">
                            <h4 className="text-md font-medium text-white mb-3">Trainings Attended (Optional)</h4>

                            <div className="space-y-3">
                                <div>
                                    <label htmlFor="training_title_1" className={labelClass}>Training Title 1</label>
                                    <TextInput
                                        id="training_title_1"
                                        value={data.training_title_1}
                                        className={inputClass}
                                        onChange={(e) => setData('training_title_1', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="training_title_2" className={labelClass}>Training Title 2</label>
                                    <TextInput
                                        id="training_title_2"
                                        value={data.training_title_2}
                                        className={inputClass}
                                        onChange={(e) => setData('training_title_2', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="training_title_3" className={labelClass}>Training Title 3</label>
                                    <TextInput
                                        id="training_title_3"
                                        value={data.training_title_3}
                                        className={inputClass}
                                        onChange={(e) => setData('training_title_3', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Employment Data - Part 1 */}
                {currentStep === 4 && (
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                        <h3 className="text-lg font-semibold text-white border-b border-white/20 pb-2 sticky top-0 bg-white/10 backdrop-blur">
                            Employment Data
                        </h3>

                        <div>
                            <label className={labelClass}>Ever Employed After Graduation? *</label>
                            <div className="flex space-x-4">
                                <label className="flex items-center text-white">
                                    <input
                                        type="radio"
                                        name="ever_employed"
                                        value="Yes"
                                        checked={data.ever_employed === 'Yes'}
                                        onChange={(e) => setData('ever_employed', e.target.value)}
                                        className="mr-2"
                                        required
                                    />
                                    Yes
                                </label>
                                <label className="flex items-center text-white">
                                    <input
                                        type="radio"
                                        name="ever_employed"
                                        value="No"
                                        checked={data.ever_employed === 'No'}
                                        onChange={(e) => setData('ever_employed', e.target.value)}
                                        className="mr-2"
                                    />
                                    No
                                </label>
                            </div>
                            <InputError message={errors.ever_employed} className="mt-1 text-red-300" />
                        </div>

                        {data.ever_employed === 'Yes' && (
                            <>
                                <div>
                                    <label htmlFor="current_work" className={labelClass}>Current Employment Status *</label>
                                    <TextInput
                                        id="current_work"
                                        value={data.current_work}
                                        className={inputClass}
                                        placeholder="Company name or position"
                                        onChange={(e) => setData('current_work', e.target.value)}
                                        required
                                    />
                                </div>

                                <h4 className="text-md font-medium text-white pt-2">Company Information</h4>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="company_name" className={labelClass}>Company Name</label>
                                        <TextInput
                                            id="company_name"
                                            value={data.company_name}
                                            className={inputClass}
                                            onChange={(e) => setData('company_name', e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="company_nature" className={labelClass}>Nature of Business</label>
                                        <TextInput
                                            id="company_nature"
                                            value={data.company_nature}
                                            className={inputClass}
                                            onChange={(e) => setData('company_nature', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="company_email" className={labelClass}>Company Email</label>
                                        <TextInput
                                            id="company_email"
                                            type="email"
                                            value={data.company_email}
                                            className={inputClass}
                                            onChange={(e) => setData('company_email', e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="company_contact" className={labelClass}>Company Contact</label>
                                        <TextInput
                                            id="company_contact"
                                            value={data.company_contact}
                                            className={inputClass}
                                            onChange={(e) => setData('company_contact', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="company_address" className={labelClass}>Company Address</label>
                                    <textarea
                                        id="company_address"
                                        value={data.company_address}
                                        onChange={(e) => setData('company_address', e.target.value)}
                                        className={inputClass}
                                        rows={2}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>Employment Status</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {employmentStatusOptions.map(status => (
                                            <label key={status} className="flex items-center text-white/80 text-sm">
                                                <input
                                                    type="checkbox"
                                                    checked={data.employment_status.includes(status)}
                                                    onChange={() => handleCheckboxChange('employment_status', status)}
                                                    className="rounded border-white/20 text-blue-500 mr-2"
                                                />
                                                {status}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Recent Position/Occupation</label>
                                    <div className="space-y-1">
                                        {recentPositionOptions.map(position => (
                                            <label key={position} className="flex items-start text-white/80 text-sm">
                                                <input
                                                    type="checkbox"
                                                    checked={data.recent_position.includes(position)}
                                                    onChange={() => handleCheckboxChange('recent_position', position)}
                                                    className="rounded border-white/20 text-blue-500 mr-2 mt-1"
                                                />
                                                {position}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {data.employment_status.includes('Self-employed') && (
                                    <div className="pt-4 border-t border-white/20">
                                        <h4 className="text-md font-medium text-white mb-3">Self-Employment Details</h4>

                                        <div className="space-y-3">
                                            <div>
                                                <label htmlFor="business_name" className={labelClass}>Business Name</label>
                                                <TextInput
                                                    id="business_name"
                                                    value={data.business_name}
                                                    className={inputClass}
                                                    onChange={(e) => setData('business_name', e.target.value)}
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="business_address" className={labelClass}>Business Address</label>
                                                <textarea
                                                    id="business_address"
                                                    value={data.business_address}
                                                    onChange={(e) => setData('business_address', e.target.value)}
                                                    className={inputClass}
                                                    rows={2}
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="business_nature" className={labelClass}>Nature of Business</label>
                                                <TextInput
                                                    id="business_nature"
                                                    value={data.business_nature}
                                                    className={inputClass}
                                                    onChange={(e) => setData('business_nature', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {data.ever_employed === 'No' && (
                            <div>
                                <label className={labelClass}>Reasons for Non-Employment</label>
                                <div className="space-y-2">
                                    {reasonsUnemploymentOptions.map(reason => (
                                        <label key={reason} className="flex items-center text-white/80 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={data.reasons_for_unemployment.includes(reason)}
                                                onChange={() => handleCheckboxChange('reasons_for_unemployment', reason)}
                                                className="rounded border-white/20 text-blue-500 mr-2"
                                            />
                                            {reason}
                                        </label>
                                    ))}
                                </div>
                                <TextInput
                                    value={data.reasons_for_unemployment_other}
                                    className={`${inputClass} mt-2`}
                                    placeholder="Other reasons"
                                    onChange={(e) => setData('reasons_for_unemployment_other', e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* Step 5: Employment Data - Part 2 & Salary */}
                {currentStep === 5 && data.ever_employed === 'Yes' && (
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                        <h3 className="text-lg font-semibold text-white border-b border-white/20 pb-2 sticky top-0 bg-white/10 backdrop-blur">
                            Employment Details & Compensation
                        </h3>

                        <div>
                            <label className={labelClass}>Reasons for Staying in Current Job</label>
                            <div className="grid grid-cols-2 gap-2">
                                {reasonsStayingOptions.map(reason => (
                                    <label key={reason} className="flex items-center text-white/80 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={data.reasons_for_staying.includes(reason)}
                                            onChange={() => handleCheckboxChange('reasons_for_staying', reason)}
                                            className="rounded border-white/20 text-blue-500 mr-2"
                                        />
                                        {reason}
                                    </label>
                                ))}
                            </div>
                            <TextInput
                                value={data.reasons_for_staying_other}
                                className={`${inputClass} mt-2`}
                                placeholder="Other reasons"
                                onChange={(e) => setData('reasons_for_staying_other', e.target.value)}
                            />
                        </div>

                        <div className="pt-4 border-t border-white/20">
                            <h4 className="text-md font-medium text-white mb-3">First Job Information</h4>

                            <div>
                                <label className={labelClass}>Was your first job related to your course?</label>
                                <div className="flex space-x-4">
                                    <label className="flex items-center text-white">
                                        <input
                                            type="radio"
                                            name="first_job_related"
                                            value="Yes"
                                            checked={data.first_job_related === 'Yes'}
                                            onChange={(e) => setData('first_job_related', e.target.value)}
                                            className="mr-2"
                                        />
                                        Yes
                                    </label>
                                    <label className="flex items-center text-white">
                                        <input
                                            type="radio"
                                            name="first_job_related"
                                            value="No"
                                            checked={data.first_job_related === 'No'}
                                            onChange={(e) => setData('first_job_related', e.target.value)}
                                            className="mr-2"
                                        />
                                        No
                                    </label>
                                </div>
                            </div>

                            {data.first_job_related === 'No' && (
                                <div className="mt-3">
                                    <label className={labelClass}>Reasons for accepting unrelated job</label>
                                    <div className="space-y-1">
                                        {unrelatedJobReasonOptions.map(reason => (
                                            <label key={reason} className="flex items-center text-white/80 text-sm">
                                                <input
                                                    type="checkbox"
                                                    checked={data.unrelated_job_reasons.includes(reason)}
                                                    onChange={() => handleCheckboxChange('unrelated_job_reasons', reason)}
                                                    className="rounded border-white/20 text-blue-500 mr-2"
                                                />
                                                {reason}
                                            </label>
                                        ))}
                                    </div>
                                    <TextInput
                                        value={data.unrelated_job_reasons_other}
                                        className={`${inputClass} mt-2`}
                                        placeholder="Other reasons"
                                        onChange={(e) => setData('unrelated_job_reasons_other', e.target.value)}
                                    />
                                </div>
                            )}

                            <div className="mt-3">
                                <label className={labelClass}>Reasons for changing job</label>
                                <div className="space-y-1">
                                    {jobChangeReasonOptions.map(reason => (
                                        <label key={reason} className="flex items-center text-white/80 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={data.job_change_reasons.includes(reason)}
                                                onChange={() => handleCheckboxChange('job_change_reasons', reason)}
                                                className="rounded border-white/20 text-blue-500 mr-2"
                                            />
                                            {reason}
                                        </label>
                                    ))}
                                </div>
                                <TextInput
                                    value={data.job_change_reasons_other}
                                    className={`${inputClass} mt-2`}
                                    placeholder="Other reasons"
                                    onChange={(e) => setData('job_change_reasons_other', e.target.value)}
                                />
                            </div>

                            <div className="mt-3">
                                <label className={labelClass}>Duration in first job</label>
                                <select
                                    value={data.first_job_duration}
                                    onChange={(e) => setData('first_job_duration', e.target.value)}
                                    className={selectClass}
                                >
                                    <option value="">Select duration</option>
                                    {durationOptions.map(d => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                    <option value="Other">Other</option>
                                </select>
                                {data.first_job_duration === 'Other' && (
                                    <TextInput
                                        value={data.first_job_duration_other}
                                        className={`${inputClass} mt-2`}
                                        placeholder="Specify duration"
                                        onChange={(e) => setData('first_job_duration_other', e.target.value)}
                                    />
                                )}
                            </div>

                            <div className="mt-3">
                                <label className={labelClass}>How did you find your first job?</label>
                                <select
                                    value={data.how_found_first_job}
                                    onChange={(e) => setData('how_found_first_job', e.target.value)}
                                    className={selectClass}
                                >
                                    <option value="">Select method</option>
                                    {jobSearchMethodOptions.map(m => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                    <option value="Other">Other</option>
                                </select>
                                {data.how_found_first_job === 'Other' && (
                                    <TextInput
                                        value={data.how_found_first_job_other}
                                        className={`${inputClass} mt-2`}
                                        placeholder="Specify method"
                                        onChange={(e) => setData('how_found_first_job_other', e.target.value)}
                                    />
                                )}
                            </div>

                            <div className="mt-3">
                                <label className={labelClass}>Time to land first job</label>
                                <select
                                    value={data.time_to_land_job}
                                    onChange={(e) => setData('time_to_land_job', e.target.value)}
                                    className={selectClass}
                                >
                                    <option value="">Select timeframe</option>
                                    {timeToLandJobOptions.map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                    <option value="Other">Other</option>
                                </select>
                                {data.time_to_land_job === 'Other' && (
                                    <TextInput
                                        value={data.time_to_land_job_other}
                                        className={`${inputClass} mt-2`}
                                        placeholder="Specify timeframe"
                                        onChange={(e) => setData('time_to_land_job_other', e.target.value)}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/20">
                            <h4 className="text-md font-medium text-white mb-3">Salary Information</h4>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Initial Gross Monthly Earning</label>
                                    <select
                                        value={data.initial_gross_monthly_earning}
                                        onChange={(e) => setData('initial_gross_monthly_earning', e.target.value)}
                                        className={selectClass}
                                    >
                                        <option value="">Select range</option>
                                        {salaryOptions.map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className={labelClass}>Recent/Present Gross Monthly Earning</label>
                                    <select
                                        value={data.recent_gross_monthly_earning}
                                        onChange={(e) => setData('recent_gross_monthly_earning', e.target.value)}
                                        className={selectClass}
                                    >
                                        <option value="">Select range</option>
                                        {salaryOptions.map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/20">
                            <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4">
                                <p className="text-white text-sm">
                                    <strong>Certification:</strong> By submitting this form, I certify that all information provided is true and accurate to the best of my knowledge.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Skip Step 5 if unemployed */}
                {currentStep === 5 && data.ever_employed === 'No' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white border-b border-white/20 pb-2">
                            Ready to Submit
                        </h3>
                        <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4">
                            <p className="text-white text-sm mb-4">
                                <strong>Certification:</strong> By submitting this form, I certify that all information provided is true and accurate to the best of my knowledge.
                            </p>
                            <p className="text-white/70 text-sm">
                                You have completed all required sections. Click "Submit Registration" to finish.
                            </p>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4 border-t border-white/10">
                    {currentStep > 1 && (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors"
                        >
                            Previous
                        </button>
                    )}

                    {currentStep < totalSteps && (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="ml-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                        >
                            Next Step
                        </button>
                    )}

                    {currentStep === totalSteps && (
                        <button
                            type="submit"
                            disabled={processing}
                            className="ml-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {processing ? 'Submitting...' : 'Submit Registration'}
                        </button>
                    )}
                </div>

                <div className="text-center pt-4 border-t border-white/10">
                    <p className="text-white/70 text-sm">
                        Already have an account?{' '}
                        <Link
                            href={route('login')}
                            className="text-blue-300 hover:text-blue-200 font-medium transition-colors"
                        >
                            Sign in here
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
