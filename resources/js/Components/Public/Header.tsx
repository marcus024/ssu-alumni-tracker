import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

interface HeaderProps {
    isDark: boolean;
    toggleTheme: () => void;
}

export default function Header({ isDark, toggleTheme }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'job-board', label: 'Job Board' },
        { id: 'departments', label: 'Departments' },
        { id: 'graduates', label: 'Graduates' },
        { id: 'gallery', label: 'Gallery' },
        { id: 'contact', label: 'Contact' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg'
                    : 'bg-transparent'
            }`}
        >
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                            SSU
                        </div>
                        <span className={`text-xl font-bold ${isScrolled || isDark ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
                            Alumni Tracker
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                                    isScrolled || isDark
                                        ? 'text-gray-700 dark:text-gray-300'
                                        : 'text-white'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-lg transition-colors ${
                                isScrolled || isDark
                                    ? 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                    : 'bg-white/20 text-white'
                            }`}
                        >
                            {isDark ? '☀️' : '🌙'}
                        </button>
                        <Link
                            href="/login"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Admin Login
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`md:hidden p-2 ${isScrolled || isDark ? 'text-gray-700 dark:text-gray-300' : 'text-white'}`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 space-y-2 bg-white dark:bg-gray-900 rounded-lg p-4">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                            >
                                {item.label}
                            </button>
                        ))}
                        <button
                            onClick={toggleTheme}
                            className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                        >
                            {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
                        </button>
                        <Link
                            href="/login"
                            className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Admin Login
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
}
