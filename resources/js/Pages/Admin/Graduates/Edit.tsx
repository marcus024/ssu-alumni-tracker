import { Head, useForm, Link } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Graduate, Department } from '@/types';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

interface EditProps {
    graduate: Graduate;
    departments: Department[];
}

export default function Edit({ graduate, departments }: EditProps) {
    const [currentSection, setCurrentSection] = useState(1);

    const { data, setData, post, processing, errors } = useForm({
        // Section A: General Information
        surname: (graduate as any).surname || '',
        first_name: (graduate as any).first_name || '',
        middle_name: (graduate as any).middle_name || '',
        email: graduate.email || '',
        phone: graduate.phone || '',
        permanent_address: (graduate as any).permanent_address || '',
        sex: (graduate as any).sex || '',
        civil_status: (graduate as any).civil_status || '',

        // Section B: Educational Background
        year: graduate.year,
        college_campus: (graduate as any).college_campus || '',
        program: (graduate as any).program || '',
        major: (graduate as any).major || '',
        department_id: graduate.department_id.toString(),
        course: graduate.course,

        // Advanced Studies
        advance_study_school: (graduate as any).advance_study_school || '',
        advance_study_date_started: (graduate as any).advance_study_date_started || '',
        advance_study_units_earned: (graduate as any).advance_study_units_earned || '',
        advance_study_date_graduated: (graduate as any).advance_study_date_graduated || '',
        advance_study_reasons: (graduate as any).advance_study_reasons || [],
        advance_study_reasons_other: (graduate as any).advance_study_reasons_other || '',

        // Section C: Professional Examination
        exam_name: (graduate as any).exam_name || '',
        exam_license_date: (graduate as any).exam_license_date || '',
        exam_year_taken: (graduate as any).exam_year_taken || '',
        exam_rating: (graduate as any).exam_rating || '',

        // Section D: Trainings
        training_title_1: (graduate as any).training_title_1 || '',
        training_title_2: (graduate as any).training_title_2 || '',
        training_title_3: (graduate as any).training_title_3 || '',

        // Section E: Employment Data
        ever_employed: (graduate as any).ever_employed || '',
        company_name: (graduate as any).company_name || '',
        company_nature: (graduate as any).company_nature || '',
        company_email: (graduate as any).company_email || '',
        company_contact: (graduate as any).company_contact || '',
        company_address: (graduate as any).company_address || '',
        employment_status: (graduate as any).employment_status || [],
        recent_position: (graduate as any).recent_position || [],
        current_work: graduate.current_work,

        business_name: (graduate as any).business_name || '',
        business_address: (graduate as any).business_address || '',
        business_nature: (graduate as any).business_nature || '',

        reasons_for_staying: (graduate as any).reasons_for_staying || [],
        reasons_for_staying_other: (graduate as any).reasons_for_staying_other || '',
        reasons_for_unemployment: (graduate as any).reasons_for_unemployment || [],
        reasons_for_unemployment_other: (graduate as any).reasons_for_unemployment_other || '',

        first_job_related: (graduate as any).first_job_related || '',
        unrelated_job_reasons: (graduate as any).unrelated_job_reasons || [],
        unrelated_job_reasons_other: (graduate as any).unrelated_job_reasons_other || '',
        job_change_reasons: (graduate as any).job_change_reasons || [],
        job_change_reasons_other: (graduate as any).job_change_reasons_other || '',
        first_job_duration: (graduate as any).first_job_duration || '',
        first_job_duration_other: (graduate as any).first_job_duration_other || '',

        how_found_first_job: (graduate as any).how_found_first_job || '',
        how_found_first_job_other: (graduate as any).how_found_first_job_other || '',
        time_to_land_job: (graduate as any).time_to_land_job || '',
        time_to_land_job_other: (graduate as any).time_to_land_job_other || '',

        initial_gross_monthly_earning: (graduate as any).initial_gross_monthly_earning || '',
        recent_gross_monthly_earning: (graduate as any).recent_gross_monthly_earning || '',

        _method: 'PUT',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.graduates.update', graduate.id));
    };

    const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
    const inputClass = "mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm";
    const selectClass = "mt-1 block w-full border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md shadow-sm";

    const sections = [
        { id: 1, title: 'General Info & Images' },
        { id: 2, title: 'Educational Background' },
        { id: 3, title: 'Professional Exam' },
        { id: 4, title: 'Trainings' },
        { id: 5, title: 'Employment Data' },
    ];

    return (
        <AdminLayout>
            <Head title="Edit Graduate Record" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Graduate Record</h2>
                            <Link href={route('admin.graduates.index')} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                                Back to List
                            </Link>
                        </div>

                        {/* Section Tabs */}
                        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
                            <nav className="flex space-x-4 overflow-x-auto">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => setCurrentSection(section.id)}
                                        className={`py-2 px-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                                            currentSection === section.id
                                                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                        }`}
                                    >
                                        {section.title}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Section 1: General Information & Images */}
                            {currentSection === 1 && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b pb-2">General Information</h3>

                                    {/* Profile Picture Preview */}
                                    {graduate.profile_picture && (
                                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                                            <label className={labelClass}>Profile Picture</label>
                                            <img
                                                src={`/uploads/${graduate.profile_picture}`}
                                                alt="Profile"
                                                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
                                            />
                                        </div>
                                    )}

                                    {/* Activity Images Preview */}
                                    {graduate.activity_images && graduate.activity_images.length > 0 && (
                                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                                            <label className={labelClass}>Activity Images</label>
                                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-2">
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

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label htmlFor="surname" className={labelClass}>Surname</label>
                                            <TextInput id="surname" value={data.surname} className={inputClass} onChange={(e) => setData('surname', e.target.value)} />
                                            <InputError message={errors.surname} className="mt-2" />
                                        </div>
                                        <div>
                                            <label htmlFor="first_name" className={labelClass}>First Name</label>
                                            <TextInput id="first_name" value={data.first_name} className={inputClass} onChange={(e) => setData('first_name', e.target.value)} />
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
                                            <label htmlFor="email" className={labelClass}>Email Address</label>
                                            <TextInput id="email" type="email" value={data.email} className={inputClass} onChange={(e) => setData('email', e.target.value)} />
                                            <InputError message={errors.email} className="mt-2" />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className={labelClass}>Phone Number</label>
                                            <TextInput id="phone" value={data.phone} className={inputClass} onChange={(e) => setData('phone', e.target.value)} />
                                            <InputError message={errors.phone} className="mt-2" />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="permanent_address" className={labelClass}>Permanent Address</label>
                                        <textarea id="permanent_address" value={data.permanent_address} className={inputClass} onChange={(e) => setData('permanent_address', e.target.value)} rows={3} />
                                        <InputError message={errors.permanent_address} className="mt-2" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="sex" className={labelClass}>Sex</label>
                                            <select id="sex" value={data.sex} className={selectClass} onChange={(e) => setData('sex', e.target.value)}>
                                                <option value="">Select Sex</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                            <InputError message={errors.sex} className="mt-2" />
                                        </div>
                                        <div>
                                            <label htmlFor="civil_status" className={labelClass}>Civil Status</label>
                                            <select id="civil_status" value={data.civil_status} className={selectClass} onChange={(e) => setData('civil_status', e.target.value)}>
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

                            {/* Section 2: Educational Background */}
                            {currentSection === 2 && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b pb-2">Educational Background</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="year" className={labelClass}>Year Graduated</label>
                                            <TextInput id="year" type="number" value={data.year} className={inputClass} onChange={(e) => setData('year', parseInt(e.target.value))} />
                                            <InputError message={errors.year} className="mt-2" />
                                        </div>
                                        <div>
                                            <label htmlFor="college_campus" className={labelClass}>College/Campus</label>
                                            <TextInput id="college_campus" value={data.college_campus} className={inputClass} onChange={(e) => setData('college_campus', e.target.value)} />
                                            <InputError message={errors.college_campus} className="mt-2" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="program" className={labelClass}>Program</label>
                                            <TextInput id="program" value={data.program} className={inputClass} onChange={(e) => setData('program', e.target.value)} />
                                            <InputError message={errors.program} className="mt-2" />
                                        </div>
                                        <div>
                                            <label htmlFor="major" className={labelClass}>Major</label>
                                            <TextInput id="major" value={data.major} className={inputClass} onChange={(e) => setData('major', e.target.value)} />
                                            <InputError message={errors.major} className="mt-2" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="department_id" className={labelClass}>Department</label>
                                            <select id="department_id" value={data.department_id} onChange={(e) => setData('department_id', e.target.value)} className={selectClass}>
                                                <option value="">Select Department</option>
                                                {departments.map(dept => (<option key={dept.id} value={dept.id}>{dept.name}</option>))}
                                            </select>
                                            <InputError message={errors.department_id} className="mt-2" />
                                        </div>
                                        <div>
                                            <label htmlFor="course" className={labelClass}>Course</label>
                                            <TextInput id="course" value={data.course} className={inputClass} onChange={(e) => setData('course', e.target.value)} />
                                            <InputError message={errors.course} className="mt-2" />
                                        </div>
                                    </div>

                                    <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mt-6">Advanced Studies (if any)</h4>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="advance_study_school" className={labelClass}>School</label>
                                            <TextInput id="advance_study_school" value={data.advance_study_school} className={inputClass} onChange={(e) => setData('advance_study_school', e.target.value)} />
                                        </div>
                                        <div>
                                            <label htmlFor="advance_study_date_started" className={labelClass}>Date Started</label>
                                            <TextInput id="advance_study_date_started" value={data.advance_study_date_started} className={inputClass} onChange={(e) => setData('advance_study_date_started', e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="advance_study_units_earned" className={labelClass}>Units Earned</label>
                                            <TextInput id="advance_study_units_earned" value={data.advance_study_units_earned} className={inputClass} onChange={(e) => setData('advance_study_units_earned', e.target.value)} />
                                        </div>
                                        <div>
                                            <label htmlFor="advance_study_date_graduated" className={labelClass}>Date Graduated</label>
                                            <TextInput id="advance_study_date_graduated" type="date" value={data.advance_study_date_graduated} className={inputClass} onChange={(e) => setData('advance_study_date_graduated', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Section 3: Professional Examination */}
                            {currentSection === 3 && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b pb-2">Professional Examination</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="exam_name" className={labelClass}>Examination Name</label>
                                            <TextInput id="exam_name" value={data.exam_name} className={inputClass} onChange={(e) => setData('exam_name', e.target.value)} />
                                        </div>
                                        <div>
                                            <label htmlFor="exam_license_date" className={labelClass}>License Date</label>
                                            <TextInput id="exam_license_date" type="date" value={data.exam_license_date} className={inputClass} onChange={(e) => setData('exam_license_date', e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="exam_year_taken" className={labelClass}>Year Taken</label>
                                            <TextInput id="exam_year_taken" value={data.exam_year_taken} className={inputClass} onChange={(e) => setData('exam_year_taken', e.target.value)} />
                                        </div>
                                        <div>
                                            <label htmlFor="exam_rating" className={labelClass}>Rating</label>
                                            <TextInput id="exam_rating" value={data.exam_rating} className={inputClass} onChange={(e) => setData('exam_rating', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Section 4: Trainings */}
                            {currentSection === 4 && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b pb-2">Trainings Attended</h3>

                                    <div>
                                        <label htmlFor="training_title_1" className={labelClass}>Training Title 1</label>
                                        <TextInput id="training_title_1" value={data.training_title_1} className={inputClass} onChange={(e) => setData('training_title_1', e.target.value)} />
                                    </div>

                                    <div>
                                        <label htmlFor="training_title_2" className={labelClass}>Training Title 2</label>
                                        <TextInput id="training_title_2" value={data.training_title_2} className={inputClass} onChange={(e) => setData('training_title_2', e.target.value)} />
                                    </div>

                                    <div>
                                        <label htmlFor="training_title_3" className={labelClass}>Training Title 3</label>
                                        <TextInput id="training_title_3" value={data.training_title_3} className={inputClass} onChange={(e) => setData('training_title_3', e.target.value)} />
                                    </div>
                                </div>
                            )}

                            {/* Section 5: Employment Data */}
                            {currentSection === 5 && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b pb-2">Employment Data</h3>

                                    <div>
                                        <label htmlFor="ever_employed" className={labelClass}>Ever Employed?</label>
                                        <select id="ever_employed" value={data.ever_employed} className={selectClass} onChange={(e) => setData('ever_employed', e.target.value)}>
                                            <option value="">Select</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>

                                    <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mt-6">Current/Recent Employment</h4>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="company_name" className={labelClass}>Company Name</label>
                                            <TextInput id="company_name" value={data.company_name} className={inputClass} onChange={(e) => setData('company_name', e.target.value)} />
                                        </div>
                                        <div>
                                            <label htmlFor="company_nature" className={labelClass}>Company Nature</label>
                                            <TextInput id="company_nature" value={data.company_nature} className={inputClass} onChange={(e) => setData('company_nature', e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="company_email" className={labelClass}>Company Email</label>
                                            <TextInput id="company_email" type="email" value={data.company_email} className={inputClass} onChange={(e) => setData('company_email', e.target.value)} />
                                        </div>
                                        <div>
                                            <label htmlFor="company_contact" className={labelClass}>Company Contact</label>
                                            <TextInput id="company_contact" value={data.company_contact} className={inputClass} onChange={(e) => setData('company_contact', e.target.value)} />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="company_address" className={labelClass}>Company Address</label>
                                        <textarea id="company_address" value={data.company_address} className={inputClass} onChange={(e) => setData('company_address', e.target.value)} rows={3} />
                                    </div>

                                    <div>
                                        <label htmlFor="current_work" className={labelClass}>Current Work/Position</label>
                                        <TextInput id="current_work" value={data.current_work} className={inputClass} onChange={(e) => setData('current_work', e.target.value)} />
                                    </div>

                                    <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mt-6">Self-Employment (if applicable)</h4>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="business_name" className={labelClass}>Business Name</label>
                                            <TextInput id="business_name" value={data.business_name} className={inputClass} onChange={(e) => setData('business_name', e.target.value)} />
                                        </div>
                                        <div>
                                            <label htmlFor="business_nature" className={labelClass}>Business Nature</label>
                                            <TextInput id="business_nature" value={data.business_nature} className={inputClass} onChange={(e) => setData('business_nature', e.target.value)} />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="business_address" className={labelClass}>Business Address</label>
                                        <textarea id="business_address" value={data.business_address} className={inputClass} onChange={(e) => setData('business_address', e.target.value)} rows={3} />
                                    </div>

                                    <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mt-6">Salary Information</h4>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="initial_gross_monthly_earning" className={labelClass}>Initial Gross Monthly Earning</label>
                                            <TextInput id="initial_gross_monthly_earning" value={data.initial_gross_monthly_earning} className={inputClass} onChange={(e) => setData('initial_gross_monthly_earning', e.target.value)} />
                                        </div>
                                        <div>
                                            <label htmlFor="recent_gross_monthly_earning" className={labelClass}>Recent Gross Monthly Earning</label>
                                            <TextInput id="recent_gross_monthly_earning" value={data.recent_gross_monthly_earning} className={inputClass} onChange={(e) => setData('recent_gross_monthly_earning', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Form Actions */}
                            <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div>
                                    {currentSection > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => setCurrentSection(currentSection - 1)}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                                        >
                                            ← Previous Section
                                        </button>
                                    )}
                                </div>
                                <div className="flex gap-4">
                                    {currentSection < 5 ? (
                                        <button
                                            type="button"
                                            onClick={() => setCurrentSection(currentSection + 1)}
                                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                                        >
                                            Next Section →
                                        </button>
                                    ) : (
                                        <PrimaryButton disabled={processing}>
                                            {processing ? 'Updating...' : 'Update Graduate Record'}
                                        </PrimaryButton>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
