import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Contact } from '@/types';

export default function Show({ contact }: { contact: Contact }) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AdminLayout header="Contact Message Details">
            <Head title="Contact Message Details" />

            <div className="max-w-3xl">
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
                    <div className="p-6 space-y-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">From</h3>
                            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                                {contact.name}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                            <a
                                href={`mailto:${contact.email}`}
                                className="mt-1 text-lg text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                {contact.email}
                            </a>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Received</h3>
                            <p className="mt-1 text-base text-gray-900 dark:text-white">
                                {formatDate(contact.created_at)}
                            </p>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Message</h3>
                            <div className="prose dark:prose-invert max-w-none">
                                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                                    {contact.message}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <Link
                                href="/admin/contacts"
                                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                            >
                                Back to Messages
                            </Link>
                            <a
                                href={`mailto:${contact.email}?subject=Re: Contact Message&body=Hi ${contact.name},%0D%0A%0D%0A`}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Reply via Email
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
