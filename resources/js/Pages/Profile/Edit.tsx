import AdminLayout from '@/Layouts/AdminLayout';
import GraduateLayout from '@/Layouts/GraduateLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import ViewGraduateProfile from './Partials/ViewGraduateProfile';

export default function Edit({
    mustVerifyEmail,
    status,
    graduate,
}: PageProps<{ mustVerifyEmail: boolean; status?: string; graduate?: any }>) {
    const { auth } = usePage().props as any;
    const isAdmin = auth.user?.role === 'admin';

    const Layout = isAdmin ? AdminLayout : GraduateLayout;

    return (
        <Layout header="Profile Settings">
            <Head title="Profile Settings" />

            <div className="max-w-7xl space-y-6">
                {/* Graduate Profile Details - Only show for graduates */}
                {!isAdmin && graduate && (
                    <ViewGraduateProfile graduate={graduate} />
                )}

                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
                    <UpdatePasswordForm />
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
                    <DeleteUserForm />
                </div>
            </div>
        </Layout>
    );
}
