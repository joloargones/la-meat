<?php

namespace App\Http\Middleware;

use App\Enums\AdminRole;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureMinimumAdminRole
{
    /**
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        $user = $request->user('admin');
        $minimum = AdminRole::from($role);

        if (! $user || ! $user->hasMinimumRole($minimum)) {
            abort(403);
        }

        return $next($request);
    }
}
