<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

// Creates (or updates the password of) the single admin account used to
// log into the testimonials admin portal. Credentials come from the
// environment — never hardcoded — and this seeder is safe to re-run.
class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $email = env('ADMIN_EMAIL');
        $password = env('ADMIN_PASSWORD');

        if (! $email || ! $password) {
            $this->command?->warn('Skipping admin user: set ADMIN_EMAIL and ADMIN_PASSWORD in .env first.');

            return;
        }

        User::updateOrCreate(
            ['email' => $email],
            [
                'name' => 'Admin',
                'password' => Hash::make($password),
            ],
        );
    }
}
