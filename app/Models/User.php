<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\AdminRole;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'username', 'email', 'password', 'is_admin', 'admin_role'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
            'admin_role' => AdminRole::class,
        ];
    }

    public function isSuperAdmin(): bool
    {
        return $this->admin_role === AdminRole::SuperAdmin;
    }

    public function hasMinimumRole(AdminRole $minimum): bool
    {
        if (! $this->is_admin || ! ($this->admin_role instanceof AdminRole)) {
            return false;
        }

        return $this->admin_role->rank() >= $minimum->rank();
    }
}
