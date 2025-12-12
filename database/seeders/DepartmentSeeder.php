<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            [
                'name' => 'Computer Science',
                'description' => 'The Computer Science department offers cutting-edge programs in software engineering, artificial intelligence, cybersecurity, and data science. Our curriculum combines theoretical foundations with practical applications, preparing students for careers in the rapidly evolving tech industry.',
                'logo' => null,
                'total_students' => 450,
                'total_teachers' => 25,
            ],
            [
                'name' => 'Business Administration',
                'description' => 'Our Business Administration department provides comprehensive education in management, finance, marketing, and entrepreneurship. Students develop critical business skills through case studies, internships, and real-world projects with industry partners.',
                'logo' => null,
                'total_students' => 520,
                'total_teachers' => 30,
            ],
            [
                'name' => 'Engineering',
                'description' => 'The Engineering department offers specialized programs in mechanical, electrical, civil, and chemical engineering. With state-of-the-art laboratories and industry collaborations, students gain hands-on experience in solving real-world engineering challenges.',
                'logo' => null,
                'total_students' => 380,
                'total_teachers' => 28,
            ],
            [
                'name' => 'Education',
                'description' => 'Our Education department prepares future educators with innovative teaching methodologies, educational psychology, and curriculum development. Graduates are equipped to inspire and lead in diverse educational settings.',
                'logo' => null,
                'total_students' => 300,
                'total_teachers' => 20,
            ],
            [
                'name' => 'Health Sciences',
                'description' => 'The Health Sciences department offers programs in nursing, public health, and medical technology. Students receive comprehensive training in healthcare delivery, patient care, and medical research through our partnerships with leading healthcare institutions.',
                'logo' => null,
                'total_students' => 280,
                'total_teachers' => 22,
            ],
            [
                'name' => 'Arts and Humanities',
                'description' => 'Explore creativity and critical thinking in our Arts and Humanities department. Programs include literature, philosophy, history, and fine arts, fostering cultural awareness and analytical skills essential for diverse career paths.',
                'logo' => null,
                'total_students' => 200,
                'total_teachers' => 15,
            ],
        ];

        foreach ($departments as $department) {
            \App\Models\Department::create($department);
        }
    }
}
