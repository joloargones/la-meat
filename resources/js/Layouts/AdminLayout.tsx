import { AdminRole } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

function roleLabel(role: AdminRole | null | undefined): string {
    switch (role) {
        case 'super_admin':
            return 'Super Admin';
        case 'admin':
            return 'Admin';
        case 'staff':
            return 'Staff';
        default:
            return '';
    }
}

export default function AdminLayout({
    children,
    title,
}: PropsWithChildren<{ title: string }>) {
    const admin = usePage().props.auth.admin;

    const canManageAdmins = admin?.admin_role === 'super_admin';
    const canAccessReports =
        admin?.admin_role === 'super_admin' || admin?.admin_role === 'admin';

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                        <Link
                            href={route('admin.dashboard')}
                            className="text-lg font-semibold text-gray-900"
                        >
                            Admin
                        </Link>
                        <Link
                            href={route('admin.profile.edit')}
                            className="text-gray-600 underline hover:text-gray-900"
                        >
                            Profile
                        </Link>
                        {canAccessReports ? (
                            <Link
                                href={route('admin.reports')}
                                className="text-gray-600 underline hover:text-gray-900"
                            >
                                Reports
                            </Link>
                        ) : null}
                        {canManageAdmins ? (
                            <Link
                                href={route('admin.users.index')}
                                className="text-gray-600 underline hover:text-gray-900"
                            >
                                Admin users
                            </Link>
                        ) : null}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                        {admin?.admin_role ? (
                            <span className="hidden text-gray-500 sm:inline">
                                {roleLabel(admin.admin_role)}
                            </span>
                        ) : null}
                        <Link
                            href={route('home')}
                            className="text-gray-600 underline hover:text-gray-900"
                        >
                            Storefront
                        </Link>
                        <Link
                            href={route('admin.logout')}
                            method="post"
                            as="button"
                            className="text-gray-600 underline hover:text-gray-900"
                        >
                            Log out
                        </Link>
                    </div>
                </div>
            </nav>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        {title}
                    </h1>
                </div>
            </header>
            <main>{children}</main>
        </div>
    );
}
