<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        $admin = $request->user('admin');
        if (! $admin) {
            abort(403);
        }

        return Inertia::render('Admin/Profile', [
            'admin' => [
                'username' => $admin->username,
                'email' => $admin->email,
            ],
            'status' => session('status'),
        ]);
    }

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $admin = $request->user('admin');
        if (! $admin) {
            abort(403);
        }

        $data = $request->validated();

        $admin->username = $data['username'];
        $admin->email = $data['email'];
        $admin->name = $data['username'];

        if (! empty($data['password'])) {
            $admin->password = $data['password'];
        }

        $admin->save();

        return redirect()
            ->route('admin.profile.edit')
            ->with('status', 'Profile updated successfully.');
    }
}
