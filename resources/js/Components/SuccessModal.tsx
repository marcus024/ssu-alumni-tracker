import Modal from '@/Components/Modal';

interface SuccessModalProps {
    show: boolean;
    onClose: () => void;
    title: string;
    message: string;
    icon?: 'check' | 'success';
}

export default function SuccessModal({ show, onClose, title, message, icon = 'success' }: SuccessModalProps) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <div className="p-6">
                <div className="flex flex-col items-center text-center">
                    {/* Success Icon */}
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                        <svg
                            className="w-8 h-8 text-green-600 dark:text-green-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {title}
                    </h3>

                    {/* Message */}
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {message}
                    </p>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="px-8 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all"
                    >
                        Got it!
                    </button>
                </div>
            </div>
        </Modal>
    );
}
