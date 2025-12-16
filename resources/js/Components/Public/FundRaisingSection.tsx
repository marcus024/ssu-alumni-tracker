import { FundRaising } from '@/types';
import { useState } from 'react';
import DonationModal from './DonationModal';

interface FundRaisingSectionProps {
    fundraisings: FundRaising[];
}

export default function FundRaisingSection({ fundraisings }: FundRaisingSectionProps) {
    const activeFundraisings = fundraisings.filter(fr => fr.is_active);
    const [selectedFundraising, setSelectedFundraising] = useState<FundRaising | null>(null);
    const [showDonationModal, setShowDonationModal] = useState(false);

    const openDonationModal = (fundraising: FundRaising) => {
        setSelectedFundraising(fundraising);
        setShowDonationModal(true);
    };

    const closeDonationModal = () => {
        setShowDonationModal(false);
        setSelectedFundraising(null);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
        }).format(amount);
    };

    const getProgressPercentage = (current: number, goal: number) => {
        if (goal === 0) return 0;
        return Math.min(100, (current / goal) * 100);
    };

    return (
        <section id="fundraising" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Fundraising Campaigns
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Support our initiatives and help make a difference
                    </p>
                </div>

                {activeFundraisings.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {activeFundraisings.map((fundraising) => {
                            const progress = getProgressPercentage(fundraising.current_amount, fundraising.goal_amount);
                            const isExpired = fundraising.end_date && new Date(fundraising.end_date) < new Date();

                            return (
                                <div
                                    key={fundraising.id}
                                    className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                                >
                                    {fundraising.image && (
                                        <div className="relative">
                                            <img
                                                src={`/storage/${fundraising.image}`}
                                                alt={fundraising.title}
                                                className="w-full h-56 object-cover"
                                            />
                                            {isExpired && (
                                                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                    Ended
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                            {fundraising.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                                            {fundraising.description}
                                        </p>

                                        {/* Progress Bar */}
                                        <div className="mb-4">
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                                                <span className="font-semibold text-blue-600 dark:text-blue-400">
                                                    {progress.toFixed(0)}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                                                <div
                                                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Amount Display */}
                                        <div className="mb-4">
                                            <div className="flex justify-between items-baseline">
                                                <div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Raised</p>
                                                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                        {formatCurrency(fundraising.current_amount)}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Goal</p>
                                                    <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                                                        {formatCurrency(fundraising.goal_amount)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Dates */}
                                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400 mb-4">
                                            <div className="flex items-center">
                                                <span className="mr-2">🚀</span>
                                                <span>Started: {new Date(fundraising.start_date).toLocaleDateString()}</span>
                                            </div>
                                            {fundraising.end_date && (
                                                <div className="flex items-center">
                                                    <span className="mr-2">🏁</span>
                                                    <span>Ends: {new Date(fundraising.end_date).toLocaleDateString()}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Donate Button */}
                                        {!isExpired && (
                                            <button
                                                onClick={() => openDonationModal(fundraising)}
                                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                                            >
                                                Donate Now
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            No active fundraising campaigns at the moment. Check back soon!
                        </p>
                    </div>
                )}
            </div>

            {/* Donation Modal */}
            {selectedFundraising && (
                <DonationModal
                    show={showDonationModal}
                    onClose={closeDonationModal}
                    fundraising={selectedFundraising}
                />
            )}
        </section>
    );
}
