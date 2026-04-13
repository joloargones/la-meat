<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('username')->nullable()->after('name');
            $table->string('admin_role', 32)->nullable()->after('is_admin');
        });

        DB::table('users')->where('is_admin', true)->update([
            'admin_role' => 'super_admin',
        ]);

        $users = DB::table('users')->where('is_admin', true)->get();
        foreach ($users as $user) {
            if ($user->username !== null && $user->username !== '') {
                continue;
            }
            DB::table('users')->where('id', $user->id)->update([
                'username' => 'admin-'.$user->id,
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['username', 'admin_role']);
        });
    }
};
