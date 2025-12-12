<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@ssu.edu',
            'password' => bcrypt('password'), // Change this in production!
        ]);

        // Seed all data
        $this->call([
            SchoolInfoSeeder::class,
            DepartmentSeeder::class,
            GraduateSeeder::class,
            NewsSeeder::class,
            JobPostSeeder::class,
        ]);

        $this->command->info('✅ Database seeded successfully!');
        $this->command->info('📧 Admin Login: admin@ssu.edu');
        $this->command->info('🔑 Password: password');
    }
}
