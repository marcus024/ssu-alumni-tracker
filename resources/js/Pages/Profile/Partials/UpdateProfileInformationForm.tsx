import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { PageProps, Department } from '@/types';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth, departments } = usePage().props as PageProps & { departments?: Department[] };
    const user = auth.user;
    const isGraduate = user?.role === 'graduate';

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            phone: user.phone || '',
            year: user.year || '',
            course: user.course || '',
            current_work: user.current_work || '',
            department_id: user.department_id || '',
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section>
            <header className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Profile Information
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2">
                        Full Name
                    </label>
                    <TextInput
                        id="name"
                        className="block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2">
                        Email Address
                    </label>
                    <TextInput
                        id="email"
                        type="email"
                        className="block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {isGraduate && (
                    <>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2">
                                Phone Number
                            </label>
                            <TextInput
                                id="phone"
                                type="tel"
                                className="block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="+63 123 456 7890"
                            />
                            <InputError className="mt-2" message={errors.phone} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="year" className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2">
                                    Graduation Year
                                </label>
                                <TextInput
                                    id="year"
                                    type="number"
                                    className="block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                    value={data.year}
                                    onChange={(e) => setData('year', e.target.value)}
                                    placeholder="2024"
                                />
                                <InputError className="mt-2" message={errors.year} />
                            </div>

                            <div>
                                <label htmlFor="department_id" className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2">
                                    Department
                                </label>
                                <select
                                    id="department_id"
                                    value={data.department_id}
                                    onChange={(e) => setData('department_id', e.target.value)}
                                    className="block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="">Select Department</option>
                                    {departments?.map((dept) => (
                                        <option key={dept.id} value={dept.id}>
                                            {dept.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError className="mt-2" message={errors.department_id} />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="course" className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2">
                                Course/Degree
                            </label>
                            <TextInput
                                id="course"
                                type="text"
                                className="block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                value={data.course}
                                onChange={(e) => setData('course', e.target.value)}
                                placeholder="e.g., BS Computer Science"
                            />
                            <InputError className="mt-2" message={errors.course} />
                        </div>

                        <div>
                            <label htmlFor="current_work" className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2">
                                Current Employment
                            </label>
                            <TextInput
                                id="current_work"
                                type="text"
                                className="block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                value={data.current_work}
                                onChange={(e) => setData('current_work', e.target.value)}
                                placeholder="Company name or status"
                            />
                            <InputError className="mt-2" message={errors.current_work} />
                        </div>
                    </>
                )}

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                            Your email address is unverified.{' '}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="font-medium underline hover:no-underline"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing ? 'Saving...' : 'Save Changes'}
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                            ✓ Saved successfully
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
