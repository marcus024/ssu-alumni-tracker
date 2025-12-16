import { JobPost } from '@/types';
import Modal from '@/Components/Modal';
import SuccessModal from '@/Components/SuccessModal';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

interface JobApplicationModalProps {
    show: boolean;
    onClose: () => void;
    jobPost: JobPost;
}

export default function JobApplicationModal({ show, onClose, jobPost }: JobApplicationModalProps) {
    const [showSuccess, setShowSuccess] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        job_post_id: jobPost.id,
        applicant_name: '',
        applicant_email: '',
        applicant_phone: '',
        cover_letter: '',
        resume: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('job-applications.store'), {
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
                        Apply for {jobPost.title}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        at {jobPost.company} - {jobPost.location}
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    {/* Applicant Name */}
                    <div>
                        <InputLabel htmlFor="applicant_name" value="Full Name *" />
                        <TextInput
                            id="applicant_name"
                            type="text"
                            className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                            value={data.applicant_name}
                            onChange={(e) => setData('applicant_name', e.target.value)}
                            required
                        />
                        <InputError message={errors.applicant_name} className="mt-2" />
                    </div>

                    {/* Email */}
                    <div>
                        <InputLabel htmlFor="applicant_email" value="Email Address *" />
                        <TextInput
                            id="applicant_email"
                            type="email"
                            className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                            value={data.applicant_email}
                            onChange={(e) => setData('applicant_email', e.target.value)}
                            placeholder="your.email@example.com"
                            required
                        />
                        <InputError message={errors.applicant_email} className="mt-2" />
                    </div>

                    {/* Phone */}
                    <div>
                        <InputLabel htmlFor="applicant_phone" value="Contact Number *" />
                        <TextInput
                            id="applicant_phone"
                            type="text"
                            className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                            value={data.applicant_phone}
                            onChange={(e) => setData('applicant_phone', e.target.value)}
                            placeholder="e.g. 09123456789"
                            required
                        />
                        <InputError message={errors.applicant_phone} className="mt-2" />
                    </div>

                    {/* Cover Letter */}
                    <div>
                        <InputLabel htmlFor="cover_letter" value="Cover Letter *" />
                        <textarea
                            id="cover_letter"
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={data.cover_letter}
                            onChange={(e) => setData('cover_letter', e.target.value)}
                            rows={5}
                            placeholder="Tell us why you're a great fit for this position..."
                            required
                        />
                        <InputError message={errors.cover_letter} className="mt-2" />
                    </div>

                    {/* Resume Upload */}
                    <div>
                        <InputLabel htmlFor="resume" value="Resume/CV *" />
                        <input
                            id="resume"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100
                                dark:file:bg-gray-700 dark:file:text-gray-300"
                            onChange={(e) => setData('resume', e.target.files?.[0] || null)}
                            required
                        />
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Upload your resume in PDF, DOC, or DOCX format (Max: 5MB)
                        </p>
                        <InputError message={errors.resume} className="mt-2" />
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
                            {processing ? 'Submitting...' : 'Submit Application'}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>

        {showSuccess && (
            <SuccessModal
                show={showSuccess}
                onClose={handleSuccessClose}
                title="Application Submitted Successfully!"
                message="Thank you for applying! Your application has been received and is under review. We will contact you via email if your profile matches our requirements."
            />
        )}
        </>
    );
}
