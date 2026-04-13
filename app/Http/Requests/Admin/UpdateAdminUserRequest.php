<?php

namespace App\Http\Requests\Admin;

use App\Enums\AdminRole;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\Password;

class UpdateAdminUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user('admin')?->isSuperAdmin() ?? false;
    }

    protected function prepareForValidation(): void
    {
        $target = $this->route('user');
        if ($target instanceof User && ! $target->is_admin) {
            abort(404);
        }
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        /** @var User $target */
        $target = $this->route('user');

        return [
            'username' => [
                'required',
                'string',
                'max:255',
                'alpha_dash',
                Rule::unique('users', 'username')
                    ->ignore($target->id)
                    ->where(fn ($query) => $query->where('is_admin', true)),
            ],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($target->id),
            ],
            'password' => ['nullable', 'confirmed', Password::defaults()],
            'admin_role' => ['required', new Enum(AdminRole::class)],
        ];
    }
}
