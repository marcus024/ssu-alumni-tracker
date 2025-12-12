<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SchoolInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\SchoolInfo::create([
            'total_teachers' => 150,
            'total_departments' => 8,
            'total_branches' => 3,
            'years_established' => 1985,
            'mission' => 'To provide quality education and foster innovation, critical thinking, and leadership among students, preparing them to become responsible global citizens and contributing members of society.',
            'vision' => 'To be a premier institution of higher learning recognized for academic excellence, research innovation, and community engagement, producing graduates who are competent, ethical, and responsive to the needs of a rapidly changing world.',
            'logo' => null,
        ]);
    }
}
