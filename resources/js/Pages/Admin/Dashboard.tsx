import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

function roleDescription(role: string | null | undefined): string {
    switch (role) {
        case 'super_admin':
            return 'You have full access, including managing other admin accounts.';
        case 'admin':
            return 'You can use operational tools (e.g. reports). Admin user management is limited to super admins.';
        case 'staff':
            return 'You can view the dashboard and update your profile. Operational areas may be restricted.';
        default:
            return '';
    }
}

export default function AdminDashboard() {
    const { auth } = usePage<PageProps>().props;

    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin · Dashboard" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="p-6 text-gray-700">
                            <p className="text-sm text-gray-600">
                                Signed in as{' '}
                                <span className="font-medium text-gray-900">
                                    {auth.admin?.username} ({auth.admin?.email})
                                </span>
                                .
                            </p>
                            {auth.admin?.admin_role ? (
                                <p className="mt-2 text-sm text-gray-600">
                                    Role:{' '}
                                    <span className="font-medium text-gray-900">
                                        {auth.admin.admin_role.replace(
                                            '_',
                                            ' ',
                                        )}
                                    </span>
                                    . {roleDescription(auth.admin.admin_role)}
                                </p>
                            ) : null}
                            <p className="mt-4 text-sm text-gray-600">
                                Update your account on the{' '}
                                <Link
                                    href={route('admin.profile.edit')}
                                    className="text-indigo-600 underline hover:text-indigo-800"
                                >
                                    profile
                                </Link>{' '}
                                page.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
