<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $news = [
            [
                'title' => 'SSU Launches New Innovation Hub',
                'content' => 'We are thrilled to announce the opening of our state-of-the-art Innovation Hub, a collaborative space designed to foster creativity, entrepreneurship, and technological advancement. The hub features modern workspaces, cutting-edge equipment, and mentorship programs to support student and alumni ventures.',
                'image' => null,
                'created_at' => now()->subDays(2),
            ],
            [
                'title' => 'Alumni Success: Former Student Wins National Award',
                'content' => 'Congratulations to Maria Santos, Class of 2020, for receiving the National Excellence Award in Software Engineering. Maria\'s groundbreaking work in artificial intelligence has made significant contributions to the tech industry and brought honor to our institution.',
                'image' => null,
                'created_at' => now()->subDays(5),
            ],
            [
                'title' => 'Annual Career Fair Set for Next Month',
                'content' => 'Mark your calendars! Our Annual Career Fair will take place next month, featuring over 100 leading companies from various industries. This is an excellent opportunity for students and recent graduates to explore career paths, network with professionals, and secure internships or full-time positions.',
                'image' => null,
                'created_at' => now()->subDays(7),
            ],
            [
                'title' => 'Research Team Receives Major Grant',
                'content' => 'Our Engineering department has been awarded a $2 million research grant to develop sustainable energy solutions. This project will involve collaboration with international partners and provide hands-on research opportunities for our students.',
                'image' => null,
                'created_at' => now()->subDays(10),
            ],
            [
                'title' => 'New Partnership with Leading Tech Company',
                'content' => 'SSU has established a strategic partnership with TechCorp, one of the world\'s leading technology companies. This collaboration will provide our students with internship opportunities, industry mentorship, and access to cutting-edge technology and resources.',
                'image' => null,
                'created_at' => now()->subDays(14),
            ],
        ];

        foreach ($news as $item) {
            \App\Models\News::create($item);
        }
    }
}
