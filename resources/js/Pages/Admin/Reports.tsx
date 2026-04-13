import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function AdminReports() {
    return (
        <AdminLayout title="Operations & reports">
            <Head title="Admin · Reports" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <p className="text-sm text-gray-600">
                            This area is restricted to the{' '}
                            <strong>admin</strong> and{' '}
                            <strong>super admin</strong> roles. Staff accounts
                            cannot access it. Use this section later for orders,
                            inventory, or analytics.
                        </p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
