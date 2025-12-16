import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps } from '@/types';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

interface SiteSettings {
    id: number;
    logo?: string;
    contact_email?: string;
    contact_phone?: string;
    contact_address?: string;
    facebook_url?: string;
    twitter_url?: string;
    instagram_url?: string;
    linkedin_url?: string;
    youtube_url?: string;
}

interface CustomizationProps extends PageProps {
    settings: SiteSettings;
}

export default function Customization({ settings }: CustomizationProps) {
    const { data, setData, post, processing, errors } = useForm({
        logo: null as File | null,
        contact_email: settings.contact_email || '',
        contact_phone: settings.contact_phone || '',
        contact_address: settings.contact_address || '',
        facebook_url: settings.facebook_url || '',
        twitter_url: settings.twitter_url || '',
        instagram_url: settings.instagram_url || '',
        linkedin_url: settings.linkedin_url || '',
        youtube_url: settings.youtube_url || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.customization.update'));
    };

    return (
        <AdminLayout header="Site Customization">
            <Head title="Site Customization" />

            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Logo Section */}
                        <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Header Logo
                            </h3>

                            {settings.logo && (
                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Logo:</p>
                                    <img
                                        src={`/storage/${settings.logo}`}
                                        alt="Current Logo"
                                        className="h-16 object-contain bg-gray-100 dark:bg-gray-700 p-2 rounded"
                                    />
                                </div>
                            )}

                            <div>
                                <InputLabel htmlFor="logo" value="Upload New Logo" />
                                <input
                                    id="logo"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('logo', e.target.files?.[0] || null)}
                                    className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700
                                        hover:file:bg-blue-100
                                        dark:file:bg-gray-700 dark:file:text-gray-300"
                                />
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Recommended size: 200x60px (Max: 2MB)
                                </p>
                                <InputError message={errors.logo} className="mt-2" />
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Contact Information
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <InputLabel htmlFor="contact_email" value="Contact Email" />
                                    <TextInput
                                        id="contact_email"
                                        type="email"
                                        className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                        value={data.contact_email}
                                        onChange={(e) => setData('contact_email', e.target.value)}
                                        placeholder="info@ssu.edu.ph"
                                    />
                                    <InputError message={errors.contact_email} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="contact_phone" value="Contact Phone" />
                                    <TextInput
                                        id="contact_phone"
                                        type="text"
                                        className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                        value={data.contact_phone}
                                        onChange={(e) => setData('contact_phone', e.target.value)}
                                        placeholder="+63 123 456 7890"
                                    />
                                    <InputError message={errors.contact_phone} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="contact_address" value="Contact Address" />
                                    <textarea
                                        id="contact_address"
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        value={data.contact_address}
                                        onChange={(e) => setData('contact_address', e.target.value)}
                                        rows={3}
                                        placeholder="Arteche Blvd, Brgy. Guindapunan, City of Catbalogan, 6700 Samar"
                                    />
                                    <InputError message={errors.contact_address} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Social Media Links
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <InputLabel htmlFor="facebook_url" value="Facebook URL" />
                                    <TextInput
                                        id="facebook_url"
                                        type="url"
                                        className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                        value={data.facebook_url}
                                        onChange={(e) => setData('facebook_url', e.target.value)}
                                        placeholder="https://facebook.com/your-page"
                                    />
                                    <InputError message={errors.facebook_url} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="twitter_url" value="Twitter/X URL" />
                                    <TextInput
                                        id="twitter_url"
                                        type="url"
                                        className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                        value={data.twitter_url}
                                        onChange={(e) => setData('twitter_url', e.target.value)}
                                        placeholder="https://twitter.com/your-handle"
                                    />
                                    <InputError message={errors.twitter_url} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="instagram_url" value="Instagram URL" />
                                    <TextInput
                                        id="instagram_url"
                                        type="url"
                                        className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                        value={data.instagram_url}
                                        onChange={(e) => setData('instagram_url', e.target.value)}
                                        placeholder="https://instagram.com/your-profile"
                                    />
                                    <InputError message={errors.instagram_url} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="linkedin_url" value="LinkedIn URL" />
                                    <TextInput
                                        id="linkedin_url"
                                        type="url"
                                        className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                        value={data.linkedin_url}
                                        onChange={(e) => setData('linkedin_url', e.target.value)}
                                        placeholder="https://linkedin.com/company/your-company"
                                    />
                                    <InputError message={errors.linkedin_url} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="youtube_url" value="YouTube URL" />
                                    <TextInput
                                        id="youtube_url"
                                        type="url"
                                        className="mt-1 block w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                        value={data.youtube_url}
                                        onChange={(e) => setData('youtube_url', e.target.value)}
                                        placeholder="https://youtube.com/channel/your-channel"
                                    />
                                    <InputError message={errors.youtube_url} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
                            <PrimaryButton disabled={processing}>
                                {processing ? 'Saving...' : 'Save Changes'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
