import { FundRaising } from '@/types';
import Modal from '@/Components/Modal';
import SuccessModal from '@/Components/SuccessModal';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

interface DonationModalProps {
    show: boolean;
    onClose: () => void;
    fundraising: FundRaising;
}

export default function DonationModal({ show, onClose, fundraising }: DonationModalProps) {
    const [showSuccess, setShowSuccess] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        fund_raising_id: fundraising.id,
        donor_name: '',
        donor_phone: '',
        donor_address: '',
        amount: '',
        receipt: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('donate.store'), {
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

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
        }).format(amount);
    };

    return (
        <>
        <Modal show={show} onClose={onClose} maxWidth="2xl">
            <div className="p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Donate to {fundraising.title}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Your contribution will help us reach our goal of {formatCurrency(fundraising.goal_amount)}
                    </p>
                </div>

                {/* Account Information Display */}
                {(fundraising.account_name || fundraising.account_number) && (
                    <div className="mb-6 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
                            Payment Account Details
                        </h3>
                        {fundraising.account_name && (
                            <div className="mb-2">
                                <span className="text-xs text-blue-700 dark:text-blue-400">Account Name:</span>
                                <p className="font-semibold text-blue-900 dark:text-blue-200">
                                    {fundraising.account_name}
                                </p>
                            </div>
                        )}
                        {fundraising.account_number && (
                            <div>
                                <span className="text-xs text-blue-700 dark:text-blue-400">Account Number:</span>
                                <p className="font-semibold text-blue-900 dark:text-blue-200 font-mono">
                                    {fundraising.account_number}
                                </p>
                            </div>
                        )}
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                            Please transfer your donation to the above account and upload proof of payment below.
                        </p>
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                    {/* Donor Name */}
                    <div>
                        <InputLabel htmlFor="donor_name" value="Your Full Name *" />
                        <TextInput
                            id="donor_name"
                            type="text"
                            className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                            value={data.donor_name}
                            onChange={(e) => setData('donor_name', e.target.value)}
                            required
                        />
                        <InputError message={errors.donor_name} className="mt-2" />
                    </div>

                    {/* Donor Phone */}
                    <div>
                        <InputLabel htmlFor="donor_phone" value="Contact Number *" />
                        <TextInput
                            id="donor_phone"
                            type="text"
                            className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                            value={data.donor_phone}
                            onChange={(e) => setData('donor_phone', e.target.value)}
                            placeholder="e.g. 09123456789"
                            required
                        />
                        <InputError message={errors.donor_phone} className="mt-2" />
                    </div>

                    {/* Donor Address */}
                    <div>
                        <InputLabel htmlFor="donor_address" value="Your Address *" />
                        <textarea
                            id="donor_address"
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={data.donor_address}
                            onChange={(e) => setData('donor_address', e.target.value)}
                            rows={2}
                            required
                        />
                        <InputError message={errors.donor_address} className="mt-2" />
                    </div>

                    {/* Amount */}
                    <div>
                        <InputLabel htmlFor="amount" value="Donation Amount (PHP) *" />
                        <TextInput
                            id="amount"
                            type="number"
                            min="1"
                            step="0.01"
                            className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                            required
                        />
                        <InputError message={errors.amount} className="mt-2" />
                    </div>

                    {/* Receipt Upload */}
                    <div>
                        <InputLabel htmlFor="receipt" value="Proof of Payment / Receipt *" />
                        <input
                            id="receipt"
                            type="file"
                            accept="image/*,.pdf"
                            className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100
                                dark:file:bg-gray-700 dark:file:text-gray-300"
                            onChange={(e) => setData('receipt', e.target.files?.[0] || null)}
                            required
                        />
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Upload a clear image or PDF of your payment receipt (Max: 5MB)
                        </p>
                        <InputError message={errors.receipt} className="mt-2" />
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
                            {processing ? 'Submitting...' : 'Submit Donation'}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>

        {showSuccess && (
            <SuccessModal
                show={showSuccess}
                onClose={handleSuccessClose}
                title="Donation Submitted Successfully!"
                message="Thank you for your generous contribution! Your donation is pending verification. Once verified by our team, it will be reflected in the fundraising progress."
            />
        )}
    </>
    );
}
