<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Department;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = Department::all()->keyBy('name');

        $courses = [
            // Computer Science Department
            [
                'name' => 'Bachelor of Science in Computer Science',
                'code' => 'BSCS',
                'description' => 'A four-year degree program in computer science',
                'department_id' => $departments['Computer Science']->id ?? null,
                'is_active' => true,
            ],
            [
                'name' => 'Bachelor of Science in Information Technology',
                'code' => 'BSIT',
                'description' => 'A four-year degree program in information technology',
                'department_id' => $departments['Computer Science']->id ?? null,
                'is_active' => true,
            ],
            [
                'name' => 'Bachelor of Science in Information Systems',
                'code' => 'BSIS',
                'description' => 'A four-year degree program in information systems',
                'department_id' => $departments['Computer Science']->id ?? null,
                'is_active' => true,
            ],

            // Business Administration Department
            [
                'name' => 'Bachelor of Science in Business Administration',
                'code' => 'BSBA',
                'description' => 'A four-year degree program in business administration',
                'department_id' => $departments['Business Administration']->id ?? null,
                'is_active' => true,
            ],
            [
                'name' => 'Bachelor of Science in Accountancy',
                'code' => 'BSA',
                'description' => 'A four-year degree program in accountancy',
                'department_id' => $departments['Business Administration']->id ?? null,
                'is_active' => true,
            ],
            [
                'name' => 'Bachelor of Science in Entrepreneurship',
                'code' => 'BSENTREP',
                'description' => 'A four-year degree program in entrepreneurship',
                'department_id' => $departments['Business Administration']->id ?? null,
                'is_active' => true,
            ],

            // Engineering Department
            [
                'name' => 'Bachelor of Science in Civil Engineering',
                'code' => 'BSCE',
                'description' => 'A five-year degree program in civil engineering',
                'department_id' => $departments['Engineering']->id ?? null,
                'is_active' => true,
            ],
            [
                'name' => 'Bachelor of Science in Electrical Engineering',
                'code' => 'BSEE',
                'description' => 'A five-year degree program in electrical engineering',
                'department_id' => $departments['Engineering']->id ?? null,
                'is_active' => true,
            ],
            [
                'name' => 'Bachelor of Science in Mechanical Engineering',
                'code' => 'BSME',
                'description' => 'A five-year degree program in mechanical engineering',
                'department_id' => $departments['Engineering']->id ?? null,
                'is_active' => true,
            ],

            // Education Department
            [
                'name' => 'Bachelor of Elementary Education',
                'code' => 'BEED',
                'description' => 'A four-year degree program in elementary education',
                'department_id' => $departments['Education']->id ?? null,
                'is_active' => true,
            ],
            [
                'name' => 'Bachelor of Secondary Education',
                'code' => 'BSED',
                'description' => 'A four-year degree program in secondary education',
                'department_id' => $departments['Education']->id ?? null,
                'is_active' => true,
            ],
            [
                'name' => 'Bachelor of Physical Education',
                'code' => 'BSPE',
                'description' => 'A four-year degree program in physical education',
                'department_id' => $departments['Education']->id ?? null,
                'is_active' => true,
            ],

            // Health Sciences Department
            [
                'name' => 'Bachelor of Science in Nursing',
                'code' => 'BSN',
                'description' => 'A four-year degree program in nursing',
                'department_id' => $departments['Health Sciences']->id ?? null,
                'is_active' => true,
            ],
            [
                'name' => 'Bachelor of Science in Medical Technology',
                'code' => 'BSMT',
                'description' => 'A four-year degree program in medical technology',
                'department_id' => $departments['Health Sciences']->id ?? null,
                'is_active' => true,
            ],
            [
                'name' => 'Bachelor of Science in Pharmacy',
                'code' => 'BSP',
                'description' => 'A four-year degree program in pharmacy',
                'department_id' => $departments['Health Sciences']->id ?? null,
                'is_active' => true,
            ],

            // Arts and Humanities Department
            [
                'name' => 'Bachelor of Arts in English',
                'code' => 'AB-ENG',
                'description' => 'A four-year degree program in English language and literature',
                'department_id' => $departments['Arts and Humanities']->id ?? null,
                'is_active' => true,
            ],
            [
                'name' => 'Bachelor of Arts in Communication',
                'code' => 'AB-COMM',
                'description' => 'A four-year degree program in communication',
                'department_id' => $departments['Arts and Humanities']->id ?? null,
                'is_active' => true,
            ],
            [
                'name' => 'Bachelor of Arts in Psychology',
                'code' => 'AB-PSYCH',
                'description' => 'A four-year degree program in psychology',
                'department_id' => $departments['Arts and Humanities']->id ?? null,
                'is_active' => true,
            ],
        ];

        foreach ($courses as $course) {
            if ($course['department_id']) {
                Course::create($course);
            }
        }
    }
}
