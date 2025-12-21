<?php

namespace Database\Seeders;

use App\Models\Campus;
use Illuminate\Database\Seeder;

class CampusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $campuses = [
            [
                'name' => 'SSU Main Campus',
                'description' => 'Silliman University Main Campus in Dumaguete City',
                'location' => 'Dumaguete City, Negros Oriental',
                'is_active' => true,
            ],
            [
                'name' => 'SSU Bais Campus',
                'description' => 'Silliman University Bais Campus',
                'location' => 'Bais City, Negros Oriental',
                'is_active' => true,
            ],
            [
                'name' => 'SSU Bayawan Campus',
                'description' => 'Silliman University Bayawan Campus',
                'location' => 'Bayawan City, Negros Oriental',
                'is_active' => true,
            ],
        ];

        foreach ($campuses as $campus) {
            Campus::create($campus);
        }
    }
}
