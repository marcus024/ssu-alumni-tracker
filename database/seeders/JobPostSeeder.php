<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobPostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jobPosts = [
            [
                'title' => 'Senior Software Engineer',
                'company' => 'TechCorp Solutions',
                'description' => 'We are seeking an experienced Senior Software Engineer to join our dynamic development team. You will be responsible for designing, developing, and maintaining scalable web applications using modern technologies.',
                'requirements' => '- 5+ years of experience in software development
- Proficiency in React, Node.js, and TypeScript
- Experience with cloud platforms (AWS, Azure, or GCP)
- Strong problem-solving and communication skills
- Bachelor\'s degree in Computer Science or related field',
                'location' => 'San Francisco, CA (Hybrid)',
                'created_at' => now()->subDays(1),
            ],
            [
                'title' => 'Marketing Manager',
                'company' => 'Global Brands Inc.',
                'description' => 'Join our marketing team as a Marketing Manager and lead strategic campaigns for our consumer products. This role involves developing marketing strategies, managing budgets, and coordinating with cross-functional teams.',
                'requirements' => '- 3+ years of marketing experience
- Strong analytical and creative thinking skills
- Experience with digital marketing tools and platforms
- Excellent project management abilities
- MBA or equivalent preferred',
                'location' => 'New York, NY',
                'created_at' => now()->subDays(3),
            ],
            [
                'title' => 'Data Scientist',
                'company' => 'Analytics Pro',
                'description' => 'We\'re looking for a talented Data Scientist to analyze complex datasets and provide actionable insights. You\'ll work with machine learning algorithms, statistical models, and data visualization tools.',
                'requirements' => '- Master\'s degree in Data Science, Statistics, or related field
- 2+ years of experience in data analysis
- Proficiency in Python, R, and SQL
- Experience with ML frameworks (TensorFlow, PyTorch)
- Strong statistical and analytical skills',
                'location' => 'Austin, TX (Remote)',
                'created_at' => now()->subDays(4),
            ],
            [
                'title' => 'Mechanical Engineer',
                'company' => 'Engineering Dynamics',
                'description' => 'Seeking a Mechanical Engineer to design and develop innovative mechanical systems for our automotive division. This position offers opportunities to work on cutting-edge projects in a collaborative environment.',
                'requirements' => '- Bachelor\'s degree in Mechanical Engineering
- 2+ years of experience in mechanical design
- Proficiency in CAD software (SolidWorks, AutoCAD)
- Knowledge of manufacturing processes
- Strong technical and communication skills',
                'location' => 'Detroit, MI',
                'created_at' => now()->subDays(6),
            ],
            [
                'title' => 'Registered Nurse',
                'company' => 'City Medical Center',
                'description' => 'City Medical Center is seeking compassionate and skilled Registered Nurses to join our patient care team. Provide high-quality nursing care in a fast-paced hospital environment.',
                'requirements' => '- Active RN license
- 1+ years of clinical experience preferred
- BLS and ACLS certification
- Excellent patient care and communication skills
- Ability to work flexible shifts',
                'location' => 'Chicago, IL',
                'created_at' => now()->subDays(8),
            ],
            [
                'title' => 'Financial Analyst',
                'company' => 'Investment Partners LLC',
                'description' => 'Join our finance team as a Financial Analyst and contribute to investment strategies and financial planning. Analyze market trends, prepare reports, and support decision-making processes.',
                'requirements' => '- Bachelor\'s degree in Finance or Accounting
- 2+ years of financial analysis experience
- Strong Excel and financial modeling skills
- CFA designation preferred
- Excellent analytical and presentation skills',
                'location' => 'Boston, MA',
                'created_at' => now()->subDays(9),
            ],
        ];

        foreach ($jobPosts as $job) {
            \App\Models\JobPost::create($job);
        }
    }
}
