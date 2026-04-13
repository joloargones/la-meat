<?php

namespace App\Http\Controllers\Admin;

use App\Enums\AdminRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAdminUserRequest;
use App\Http\Requests\Admin\UpdateAdminUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AdminUserController extends Controller
{
    public function index(): Response
    {
        $users = User::query()
            ->where('is_admin', true)
            ->orderBy('username')
            ->get(['id', 'username', 'email', 'admin_role', 'name'])
            ->map(fn (User $u) => [
                'id' => $u->id,
                'username' => $u->username,
                'email' => $u->email,
                'admin_role' => $u->admin_role?->value,
                'admin_role_label' => $u->admin_role?->label(),
            ]);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'roleOptions' => collect(AdminRole::cases())->map(fn (AdminRole $r) => [
                'value' => $r->value,
                'label' => $r->label(),
            ]),
            'status' => session('status'),
        ]);
    }

    public function store(StoreAdminUserRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $role = $data['admin_role'] instanceof AdminRole
            ? $data['admin_role']
            : AdminRole::from($data['admin_role']);

        User::query()->create([
            'name' => $data['username'],
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => $data['password'],
            'is_admin' => true,
            'admin_role' => $role,
            'email_verified_at' => now(),
        ]);

        return redirect()
            ->route('admin.users.index')
            ->with('status', 'Admin user created.');
    }

    public function update(UpdateAdminUserRequest $request, User $user): RedirectResponse
    {
        if (! $user->is_admin) {
            abort(404);
        }

        $data = $request->validated();
        $newRole = $data['admin_role'] instanceof AdminRole
            ? $data['admin_role']
            : AdminRole::from($data['admin_role']);

        $this->assertCanChangeRole($user, $newRole);

        $user->username = $data['username'];
        $user->email = $data['email'];
        $user->name = $data['username'];
        $user->admin_role = $newRole;

        if (! empty($data['password'])) {
            $user->password = $data['password'];
        }

        $user->save();

        return redirect()
            ->route('admin.users.index')
            ->with('status', 'Admin user updated.');
    }

    public function destroy(User $user): RedirectResponse
    {
        if (! $user->is_admin) {
            abort(404);
        }

        $actor = request()->user('admin');
        if ($actor && $user->id === $actor->id) {
            throw ValidationException::withMessages([
                'delete' => 'You cannot delete your own account.',
            ]);
        }

        if ($user->isSuperAdmin()) {
            $count = User::query()
                ->where('is_admin', true)
                ->where('admin_role', AdminRole::SuperAdmin)
                ->count();

            if ($count <= 1) {
                throw ValidationException::withMessages([
                    'delete' => 'Cannot delete the last super admin.',
                ]);
            }
        }

        $user->delete();

        return redirect()
            ->route('admin.users.index')
            ->with('status', 'Admin user removed.');
    }

    private function assertCanChangeRole(User $target, AdminRole $newRole): void
    {
        if ($target->admin_role !== AdminRole::SuperAdmin) {
            return;
        }

        if ($newRole === AdminRole::SuperAdmin) {
            return;
        }

        $count = User::query()
            ->where('is_admin', true)
            ->where('admin_role', AdminRole::SuperAdmin)
            ->count();

        if ($count <= 1) {
            throw ValidationException::withMessages([
                'admin_role' => 'There must be at least one super admin.',
            ]);
        }
    }
}
