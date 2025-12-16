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

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        year: '',
        course: '',
        current_work: '',
        department_id: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('graduate.register'), {
            onSuccess: () => {
                reset();
                setShowSuccess(true);
            },
        });
    };

    const handleSuccessClose = () => {
        setShowSuccess(false);
        onClose();
    };

    return (
        <>
        <Modal show={show} onClose={onClose} maxWidth="2xl">
            <div className="p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Register as Graduate
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Share your information to be featured in our alumni directory
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <InputLabel htmlFor="name" value="Full Name *" />
                        <TextInput
                            id="name"
                            type="text"
                            className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    {/* Email */}
                    <div>
                        <InputLabel htmlFor="email" value="Email Address *" />
                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="your.email@example.com"
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Phone */}
                    <div>
                        <InputLabel htmlFor="phone" value="Contact Number *" />
                        <TextInput
                            id="phone"
                            type="text"
                            className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            placeholder="e.g. 09123456789"
                            required
                        />
                        <InputError message={errors.phone} className="mt-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Year Graduated */}
                        <div>
                            <InputLabel htmlFor="year" value="Year Graduated *" />
                            <TextInput
                                id="year"
                                type="number"
                                min="1900"
                                max={new Date().getFullYear() + 10}
                                className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                value={data.year}
                                onChange={(e) => setData('year', e.target.value)}
                                required
                            />
                            <InputError message={errors.year} className="mt-2" />
                        </div>

                        {/* Department */}
                        <div>
                            <InputLabel htmlFor="department_id" value="Department *" />
                            <select
                                id="department_id"
                                value={data.department_id}
                                onChange={(e) => setData('department_id', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Department</option>
                                {departments.map((dept) => (
                                    <option key={dept.id} value={dept.id}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.department_id} className="mt-2" />
                        </div>
                    </div>

                    {/* Course */}
                    <div>
                        <InputLabel htmlFor="course" value="Course/Program *" />
                        <TextInput
                            id="course"
                            type="text"
                            className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                            value={data.course}
                            onChange={(e) => setData('course', e.target.value)}
                            placeholder="e.g. Bachelor of Science in Computer Science"
                            required
                        />
                        <InputError message={errors.course} className="mt-2" />
                    </div>

                    {/* Current Work */}
                    <div>
                        <InputLabel htmlFor="current_work" value="Current Work/Position *" />
                        <TextInput
                            id="current_work"
                            type="text"
                            className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                            value={data.current_work}
                            onChange={(e) => setData('current_work', e.target.value)}
                            placeholder="e.g. Software Engineer at Tech Company"
                            required
                        />
                        <InputError message={errors.current_work} className="mt-2" />
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
                            disabled={processing}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Submitting...' : 'Submit Registration'}
                        </button>
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
