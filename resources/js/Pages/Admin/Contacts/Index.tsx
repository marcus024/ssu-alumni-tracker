import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Contact, PageProps } from '@/types';
import { useState } from 'react';
import DeleteModal from '@/Components/Admin/DeleteModal';

interface ContactsIndexProps extends PageProps {
    contacts: {
        data: Contact[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

export default function Index({ contacts }: ContactsIndexProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingItem, setDeletingItem] = useState<Contact | null>(null);

    const handleDelete = (item: Contact) => {
        setDeletingItem(item);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (deletingItem) {
            router.delete(`/admin/contacts/${deletingItem.id}`, {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setDeletingItem(null);
                },
            });
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AdminLayout header="Contact Messages">
            <Head title="Contact Messages" />

            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Message
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {contacts.data.length > 0 ? (
                                contacts.data.map((contact) => (
                                    <tr key={contact.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {contact.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {contact.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                                {contact.message}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {formatDate(contact.created_at)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link
                                                href={`/admin/contacts/${contact.id}`}
                                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 mr-4"
                                            >
                                                View
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(contact)}
                                                className="text-red-600 hover:text-red-900 dark:text-red-400"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                                        No contact messages found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {contacts.last_page > 1 && (
                    <div className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                Showing page {contacts.current_page} of {contacts.last_page}
                            </div>
                            <div className="flex gap-2">
                                {contacts.current_page > 1 && (
                                    <Link
                                        href={`/admin/contacts?page=${contacts.current_page - 1}`}
                                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        Previous
                                    </Link>
                                )}
                                {contacts.current_page < contacts.last_page && (
                                    <Link
                                        href={`/admin/contacts?page=${contacts.current_page + 1}`}
                                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        Next
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <DeleteModal
                show={showDeleteModal}
                title="Delete Contact Message"
                message={`Are you sure you want to delete the message from "${deletingItem?.name}"?`}
                onConfirm={confirmDelete}
                onCancel={() => setShowDeleteModal(false)}
            />
        </AdminLayout>
    );
}
