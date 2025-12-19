import { useState, FormEvent } from 'react';
import { router } from '@inertiajs/react';

interface Graduate {
    id: number;
    name: string;
    profile_picture?: string;
}

interface GraduateChatModalProps {
    isOpen: boolean;
    onClose: () => void;
    graduate: Graduate;
}

export default function GraduateChatModal({ isOpen, onClose, graduate }: GraduateChatModalProps) {
    const [formData, setFormData] = useState({
        sender_name: '',
        sender_email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});
        setSuccessMessage('');

        router.post('/messages/send', {
            graduate_id: graduate.id,
            ...formData,
        }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                // Close modal immediately without showing message
                setFormData({ sender_name: '', sender_email: '', message: '' });
                onClose();
            },
            onError: (errors) => {
                console.error('Error sending message:', errors);
                setErrors(errors || { general: 'An error occurred. Please try again.' });
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                    onClick={onClose}
                ></div>

                {/* Modal */}
                <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            {graduate.profile_picture ? (
                                <img
                                    src={`/uploads/${graduate.profile_picture}`}
                                    alt={graduate.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                                    {graduate.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Send Message
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    to {graduate.name}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Success Message */}
                    {successMessage && (
                        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 rounded-lg text-green-700 dark:text-green-400 text-sm">
                            {successMessage}
                        </div>
                    )}

                    {/* Error Message */}
                    {errors.general && (
                        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-lg text-red-700 dark:text-red-400 text-sm">
                            {errors.general}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Your Name
                            </label>
                            <input
                                type="text"
                                value={formData.sender_name}
                                onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                required
                            />
                            {errors.sender_name && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.sender_name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Your Email
                            </label>
                            <input
                                type="email"
                                value={formData.sender_email}
                                onChange={(e) => setFormData({ ...formData, sender_email: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                required
                            />
                            {errors.sender_email && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.sender_email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Message
                            </label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                                required
                            ></textarea>
                            {errors.message && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
