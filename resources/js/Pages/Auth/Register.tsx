import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps, Department } from '@/types';
import { FormEventHandler } from 'react';

interface RegisterProps extends PageProps {
    departments: Department[];
}

export default function Register({ departments }: RegisterProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        year: '',
        course: '',
        current_work: '',
        department_id: '',
        role: 'graduate',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register - SSU Alumni Tracker" />

            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Graduate Registration</h2>
                <p className="text-white/70 text-sm">Join the SSU Alumni Network</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                        Full Name
                    </label>
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400"
                        placeholder="Enter your full name"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2 text-red-300" />
                </div>

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
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2 text-red-300" />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                        Phone Number
                    </label>
                    <TextInput
                        id="phone"
                        type="tel"
                        name="phone"
                        value={data.phone}
                        className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400"
                        placeholder="+63 123 456 7890"
                        onChange={(e) => setData('phone', e.target.value)}
                        required
                    />
                    <InputError message={errors.phone} className="mt-2 text-red-300" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="year" className="block text-sm font-medium text-white mb-2">
                            Graduation Year
                        </label>
                        <TextInput
                            id="year"
                            type="number"
                            name="year"
                            value={data.year}
                            className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400"
                            placeholder="2024"
                            onChange={(e) => setData('year', e.target.value)}
                            required
                        />
                        <InputError message={errors.year} className="mt-2 text-red-300" />
                    </div>

                    <div>
                        <label htmlFor="department_id" className="block text-sm font-medium text-white mb-2">
                            Department
                        </label>
                        <select
                            id="department_id"
                            name="department_id"
                            value={data.department_id}
                            onChange={(e) => setData('department_id', e.target.value)}
                            className="w-full bg-white/10 border-white/20 text-white rounded-md shadow-sm focus:border-blue-400 focus:ring-blue-400"
                            required
                        >
                            <option value="">Select Department</option>
                            {departments.map((dept) => (
                                <option key={dept.id} value={dept.id} className="text-gray-900">
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.department_id} className="mt-2 text-red-300" />
                    </div>
                </div>

                <div>
                    <label htmlFor="course" className="block text-sm font-medium text-white mb-2">
                        Course/Degree
                    </label>
                    <TextInput
                        id="course"
                        type="text"
                        name="course"
                        value={data.course}
                        className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400"
                        placeholder="e.g., BS Computer Science"
                        onChange={(e) => setData('course', e.target.value)}
                        required
                    />
                    <InputError message={errors.course} className="mt-2 text-red-300" />
                </div>

                <div>
                    <label htmlFor="current_work" className="block text-sm font-medium text-white mb-2">
                        Current Employment
                    </label>
                    <TextInput
                        id="current_work"
                        type="text"
                        name="current_work"
                        value={data.current_work}
                        className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400"
                        placeholder="Company name or 'Unemployed'"
                        onChange={(e) => setData('current_work', e.target.value)}
                        required
                    />
                    <InputError message={errors.current_work} className="mt-2 text-red-300" />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                        Password
                    </label>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400"
                        placeholder="Create a strong password"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2 text-red-300" />
                </div>

                <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-white mb-2">
                        Confirm Password
                    </label>
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400"
                        placeholder="Re-enter your password"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2 text-red-300"
                    />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    {processing ? 'Creating account...' : 'Create Account'}
                </button>

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
