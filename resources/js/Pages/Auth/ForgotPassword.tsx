import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password - SSU Alumni Tracker" />

            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
                <p className="text-white/70 text-sm">We'll send you a reset link</p>
            </div>

            <div className="mb-6 text-sm text-white/80 bg-white/5 p-4 rounded-lg border border-white/10">
                Forgot your password? No problem. Just enter your email address and we'll send you a password reset link.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-400 bg-green-500/10 px-4 py-3 rounded-lg border border-green-500/20">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                        Email Address
                    </label>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400"
                        placeholder="your.email@example.com"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2 text-red-300" />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    {processing ? 'Sending link...' : 'Send Reset Link'}
                </button>

                <div className="text-center pt-4 border-t border-white/10">
                    <p className="text-white/70 text-sm">
                        Remember your password?{' '}
                        <Link
                            href={route('login')}
                            className="text-blue-300 hover:text-blue-200 font-medium transition-colors"
                        >
                            Back to login
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
