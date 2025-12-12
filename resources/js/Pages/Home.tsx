import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { PageProps, News, JobPost, Department, Graduate, GalleryImage, SchoolInfo } from '@/types';
import Header from '@/Components/Public/Header';
import HomeSection from '@/Components/Public/HomeSection';
import AboutSection from '@/Components/Public/AboutSection';
import JobBoardSection from '@/Components/Public/JobBoardSection';
import DepartmentsSection from '@/Components/Public/DepartmentsSection';
import GraduatesSection from '@/Components/Public/GraduatesSection';
import GallerySection from '@/Components/Public/GallerySection';
import ContactSection from '@/Components/Public/ContactSection';
import Footer from '@/Components/Public/Footer';

interface HomeProps extends PageProps {
    news: News[];
    jobPosts: JobPost[];
    departments: Department[];
    graduates: Graduate[];
    galleryImages: GalleryImage[];
    schoolInfo: SchoolInfo | null;
}

export default function Home({
    news,
    jobPosts,
    departments,
    graduates,
    galleryImages,
    schoolInfo,
}: HomeProps) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        setIsDark(!isDark);
        if (!isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <>
            <Head title="Welcome to SSU Alumni Tracker" />

            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
                <Header isDark={isDark} toggleTheme={toggleTheme} />

                <main>
                    <HomeSection news={news} jobPosts={jobPosts} />
                    <AboutSection schoolInfo={schoolInfo} />
                    <JobBoardSection jobPosts={jobPosts} />
                    <DepartmentsSection departments={departments} />
                    <GraduatesSection graduates={graduates} />
                    <GallerySection images={galleryImages} />
                    <ContactSection />
                </main>

                <Footer />
            </div>
        </>
    );
}
