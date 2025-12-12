<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GraduateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $graduates = [
            ['name' => 'John Anderson', 'year' => 2022, 'course' => 'BS Computer Science', 'current_work' => 'Software Engineer at Google', 'department_id' => 1],
            ['name' => 'Sarah Martinez', 'year' => 2021, 'course' => 'BS Business Administration', 'current_work' => 'Marketing Director at Amazon', 'department_id' => 2],
            ['name' => 'Michael Chen', 'year' => 2023, 'course' => 'BS Mechanical Engineering', 'current_work' => 'Project Engineer at Tesla', 'department_id' => 3],
            ['name' => 'Emily Johnson', 'year' => 2020, 'course' => 'BS Computer Science', 'current_work' => 'Lead Developer at Microsoft', 'department_id' => 1],
            ['name' => 'David Rodriguez', 'year' => 2022, 'course' => 'BS Education', 'current_work' => 'High School Teacher', 'department_id' => 4],
            ['name' => 'Lisa Thompson', 'year' => 2021, 'course' => 'BS Nursing', 'current_work' => 'Registered Nurse at Mayo Clinic', 'department_id' => 5],
            ['name' => 'James Wilson', 'year' => 2023, 'course' => 'BS Business Administration', 'current_work' => 'Financial Analyst at Goldman Sachs', 'department_id' => 2],
            ['name' => 'Maria Garcia', 'year' => 2020, 'course' => 'BA English Literature', 'current_work' => 'Content Writer at Forbes', 'department_id' => 6],
            ['name' => 'Robert Lee', 'year' => 2022, 'course' => 'BS Electrical Engineering', 'current_work' => 'Hardware Engineer at Intel', 'department_id' => 3],
            ['name' => 'Jennifer Brown', 'year' => 2021, 'course' => 'BS Computer Science', 'current_work' => 'Data Scientist at Meta', 'department_id' => 1],
            ['name' => 'Kevin Davis', 'year' => 2023, 'course' => 'BS Business Administration', 'current_work' => 'Startup Founder', 'department_id' => 2],
            ['name' => 'Amanda White', 'year' => 2020, 'course' => 'BS Public Health', 'current_work' => 'Health Policy Analyst at WHO', 'department_id' => 5],
        ];

        foreach ($graduates as $graduate) {
            \App\Models\Graduate::create($graduate);
        }
    }
}
