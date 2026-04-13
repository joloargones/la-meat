<?php

namespace App\Http\Requests\Admin;

use App\Models\User;
use Closure;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class ProfileUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user('admin') !== null;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        /** @var User $admin */
        $admin = $this->user('admin');

        return [
            'username' => [
                'required',
                'string',
                'max:255',
                'alpha_dash',
                Rule::unique('users', 'username')
                    ->ignore($admin->id)
                    ->where(fn ($query) => $query->where('is_admin', true)),
            ],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($admin->id),
            ],
            'current_password' => [
                'nullable',
                'required_with:password',
                function (string $attribute, mixed $value, Closure $fail) use ($admin): void {
                    if (! $this->filled('password')) {
                        return;
                    }

                    if (! is_string($value) || ! Hash::check($value, $admin->password)) {
                        $fail('The current password is incorrect.');
                    }
                },
            ],
            'password' => ['nullable', 'confirmed', Password::defaults()],
        ];
    }
}
