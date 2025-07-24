<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin Desa
        User::create([
            'name' => 'Admin Desa',
            'email' => 'admin@gmail.com',
            'phone' => '08123456789',
            'nik' => '1234567890123456', // NIK dummy untuk admin
            'role' => 'admin',
            'email_verified_at' => now(),
            'password' => Hash::make('admin123'), // Password default
        ]);

        // Kepala Desa
        User::create([
            'name' => 'Bapak Kepala Desa', // Ganti dengan nama sebenarnya
            'email' => 'kepaladesa@gmail.com',
            'phone' => '08123456788',
            'nik' => '1234567890123457', // NIK dummy untuk kepala desa
            'role' => 'kepala_desa',
            'email_verified_at' => now(),
            'password' => Hash::make('kepaladesa123'), // Password default
        ]);
    }
}
