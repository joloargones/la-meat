import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import AdminLayout from '@/Layouts/AdminLayout';
import { AdminRole, PageProps } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

type AdminUserRow = {
    id: number;
    username: string;
    email: string;
    admin_role: AdminRole;
    admin_role_label: string;
};

type RoleOption = { value: AdminRole; label: string };

export default function AdminUsersIndex({
    users,
    roleOptions,
    status,
}: {
    users: AdminUserRow[];
    roleOptions: RoleOption[];
    status?: string;
}) {
    const { auth, errors: pageErrors } = usePage<PageProps>().props;
    const [createOpen, setCreateOpen] = useState(false);
    const [editing, setEditing] = useState<AdminUserRow | null>(null);

    const createForm = useForm({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        admin_role: 'staff' as AdminRole,
    });

    const editForm = useForm({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        admin_role: 'staff' as AdminRole,
    });

    const openCreate = () => {
        createForm.reset();
        createForm.setData('admin_role', 'staff');
        setCreateOpen(true);
    };

    const openEdit = (user: AdminUserRow) => {
        setEditing(user);
        editForm.setData({
            username: user.username,
            email: user.email,
            password: '',
            password_confirmation: '',
            admin_role: user.admin_role,
        });
    };

    const submitCreate: FormEventHandler = (e) => {
        e.preventDefault();
        createForm.post(route('admin.users.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setCreateOpen(false);
                createForm.reset();
            },
        });
    };

    const submitEdit: FormEventHandler = (e) => {
        e.preventDefault();
        if (!editing) {
            return;
        }
        editForm.patch(route('admin.users.update', editing.id), {
            preserveScroll: true,
            onSuccess: () => {
                setEditing(null);
                editForm.reset();
            },
        });
    };

    const requestDelete = (user: AdminUserRow) => {
        if (
            !confirm(
                `Remove admin access for ${user.username}? This deletes the user account.`,
            )
        ) {
            return;
        }
        router.delete(route('admin.users.destroy', user.id), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Admin users">
            <Head title="Admin · Users" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {status && (
                        <div className="mb-6 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                            {status}
                        </div>
                    )}

                    {pageErrors.delete && (
                        <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                            {pageErrors.delete}
                        </div>
                    )}

                    <div className="mb-4 flex justify-end">
                        <PrimaryButton type="button" onClick={openCreate}>
                            Add admin user
                        </PrimaryButton>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Username
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Email
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Role
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {users.map((u) => (
                                    <tr key={u.id}>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                                            {u.username}
                                            {auth.admin?.id === u.id ? (
                                                <span className="ml-2 text-xs text-gray-500">
                                                    (you)
                                                </span>
                                            ) : null}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                                            {u.email}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                                            {u.admin_role_label}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 text-right text-sm">
                                            <button
                                                type="button"
                                                className="text-indigo-600 hover:text-indigo-900"
                                                onClick={() => openEdit(u)}
                                            >
                                                Edit
                                            </button>
                                            <span className="mx-2 text-gray-300">
                                                |
                                            </span>
                                            <button
                                                type="button"
                                                className="text-red-600 hover:text-red-800 disabled:opacity-40"
                                                disabled={auth.admin?.id === u.id}
                                                onClick={() => requestDelete(u)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal
                show={createOpen}
                onClose={() => setCreateOpen(false)}
                maxWidth="lg"
            >
                <form
                    onSubmit={submitCreate}
                    className="space-y-4 p-6"
                >
                    <h2 className="text-lg font-medium text-gray-900">
                        New admin user
                    </h2>

                    <div>
                        <InputLabel htmlFor="c_username" value="Username" />
                        <TextInput
                            id="c_username"
                            value={createForm.data.username}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                createForm.setData('username', e.target.value)
                            }
                        />
                        <InputError
                            message={createForm.errors.username}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="c_email" value="Email" />
                        <TextInput
                            id="c_email"
                            type="email"
                            value={createForm.data.email}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                createForm.setData('email', e.target.value)
                            }
                        />
                        <InputError
                            message={createForm.errors.email}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="c_role" value="Role" />
                        <select
                            id="c_role"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={createForm.data.admin_role}
                            onChange={(e) =>
                                createForm.setData(
                                    'admin_role',
                                    e.target.value as AdminRole,
                                )
                            }
                        >
                            {roleOptions.map((r) => (
                                <option key={r.value} value={r.value}>
                                    {r.label}
                                </option>
                            ))}
                        </select>
                        <InputError
                            message={createForm.errors.admin_role}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="c_password" value="Password" />
                        <TextInput
                            id="c_password"
                            type="password"
                            value={createForm.data.password}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                createForm.setData('password', e.target.value)
                            }
                        />
                        <InputError
                            message={createForm.errors.password}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="c_password_confirmation"
                            value="Confirm password"
                        />
                        <TextInput
                            id="c_password_confirmation"
                            type="password"
                            value={createForm.data.password_confirmation}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                createForm.setData(
                                    'password_confirmation',
                                    e.target.value,
                                )
                            }
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <SecondaryButton
                            type="button"
                            onClick={() => setCreateOpen(false)}
                        >
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton disabled={createForm.processing}>
                            Create
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            <Modal
                show={editing !== null}
                onClose={() => setEditing(null)}
                maxWidth="lg"
            >
                {editing ? (
                    <form
                        onSubmit={submitEdit}
                        className="space-y-4 p-6"
                    >
                        <h2 className="text-lg font-medium text-gray-900">
                            Edit {editing.username}
                        </h2>

                        <div>
                            <InputLabel htmlFor="e_username" value="Username" />
                            <TextInput
                                id="e_username"
                                value={editForm.data.username}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    editForm.setData(
                                        'username',
                                        e.target.value,
                                    )
                                }
                            />
                            <InputError
                                message={editForm.errors.username}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="e_email" value="Email" />
                            <TextInput
                                id="e_email"
                                type="email"
                                value={editForm.data.email}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    editForm.setData('email', e.target.value)
                                }
                            />
                            <InputError
                                message={editForm.errors.email}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="e_role" value="Role" />
                            <select
                                id="e_role"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={editForm.data.admin_role}
                                onChange={(e) =>
                                    editForm.setData(
                                        'admin_role',
                                        e.target.value as AdminRole,
                                    )
                                }
                            >
                                {roleOptions.map((r) => (
                                    <option key={r.value} value={r.value}>
                                        {r.label}
                                    </option>
                                ))}
                            </select>
                            <InputError
                                message={editForm.errors.admin_role}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="e_password"
                                value="New password (optional)"
                            />
                            <TextInput
                                id="e_password"
                                type="password"
                                value={editForm.data.password}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    editForm.setData('password', e.target.value)
                                }
                            />
                            <InputError
                                message={editForm.errors.password}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="e_password_confirmation"
                                value="Confirm new password"
                            />
                            <TextInput
                                id="e_password_confirmation"
                                type="password"
                                value={editForm.data.password_confirmation}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    editForm.setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <SecondaryButton
                                type="button"
                                onClick={() => setEditing(null)}
                            >
                                Cancel
                            </SecondaryButton>
                            <PrimaryButton disabled={editForm.processing}>
                                Save
                            </PrimaryButton>
                        </div>
                    </form>
                ) : null}
            </Modal>
        </AdminLayout>
    );
}
