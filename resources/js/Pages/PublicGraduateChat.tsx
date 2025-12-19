import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import Header from '@/Components/Public/Header';
import Footer from '@/Components/Public/Footer';
import { useState, useEffect } from 'react';

interface Graduate {
    id: number;
    name: string;
    profile_picture?: string;
    year: string;
    course: string;
    current_work: string;
}

interface Message {
    id: number;
    sender_initials: string;
    sender_email_preview: string;
    message: string;
    is_from_graduate: boolean;
    created_at: string;
}

interface PublicGraduateChatProps extends PageProps {
    graduate: Graduate;
    messages: Message[];
}

export default function PublicGraduateChat({ graduate, messages }: PublicGraduateChatProps) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
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
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

        if (diffInHours < 24) {
            return date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        }
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    };

    return (
        <>
            <Head title={`Public Chat - ${graduate.name}`} />

            <Header isDark={isDark} toggleTheme={toggleTheme} />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Graduate Info Header */}
                <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center space-x-4">
                            {graduate.profile_picture ? (
                                <img
                                    src={`/uploads/${graduate.profile_picture}`}
                                    alt={graduate.name}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                                />
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                                    {graduate.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {graduate.name}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Class of {graduate.year} • {graduate.course}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Info Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Public Discussion
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                View the public conversation thread with {graduate.name}.
                                For privacy, sender names and emails are anonymized showing only initials.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Course</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{graduate.course}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Current Position</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{graduate.current_work}</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    Public Discussion ({messages.length})
                                </h3>
                                <Link
                                    href="/#graduates"
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    Back to Graduates
                                </Link>
                            </div>

                            {messages.length > 0 ? (
                                <div className="space-y-4">
                                    {messages.map((message, index) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.is_from_graduate ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[75%] rounded-lg p-4 ${
                                                    message.is_from_graduate
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                                }`}
                                            >
                                                {/* Sender Info */}
                                                <div className="flex items-center mb-2">
                                                    <div
                                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-2 ${
                                                            message.is_from_graduate
                                                                ? 'bg-blue-500 text-white'
                                                                : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                                                        }`}
                                                    >
                                                        {message.is_from_graduate
                                                            ? graduate.name.charAt(0).toUpperCase()
                                                            : message.sender_initials.split(' ')[0].charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p
                                                            className={`text-sm font-semibold ${
                                                                message.is_from_graduate
                                                                    ? 'text-blue-100'
                                                                    : 'text-gray-700 dark:text-gray-300'
                                                            }`}
                                                        >
                                                            {message.is_from_graduate
                                                                ? graduate.name
                                                                : message.sender_initials}
                                                        </p>
                                                        {!message.is_from_graduate && (
                                                            <p
                                                                className={`text-xs ${
                                                                    message.is_from_graduate
                                                                        ? 'text-blue-200'
                                                                        : 'text-gray-500 dark:text-gray-400'
                                                                }`}
                                                            >
                                                                {message.sender_email_preview}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Message */}
                                                <p className="whitespace-pre-wrap mb-2">{message.message}</p>

                                                {/* Timestamp */}
                                                <p
                                                    className={`text-xs ${
                                                        message.is_from_graduate
                                                            ? 'text-blue-200'
                                                            : 'text-gray-500 dark:text-gray-400'
                                                    }`}
                                                >
                                                    {formatDate(message.created_at)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <svg
                                        className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                        />
                                    </svg>
                                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                                        No messages yet. Be the first to start a conversation!
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
