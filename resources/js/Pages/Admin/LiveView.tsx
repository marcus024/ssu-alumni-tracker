import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState } from 'react';

export default function LiveView() {
    const [iframeKey, setIframeKey] = useState(0);

    const refreshIframe = () => {
        setIframeKey(prevKey => prevKey + 1);
    };

    return (
        <AdminLayout header="Live Website Preview">
            <Head title="Live View" />

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <svg className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {window.location.origin}
                        </span>
                    </div>
                    <button
                        onClick={refreshIframe}
                        className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-md transition-colors"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Refresh</span>
                    </button>
                </div>

                <div className="relative" style={{ height: 'calc(100vh - 250px)' }}>
                    <iframe
                        key={iframeKey}
                        src="/"
                        className="w-full h-full border-0"
                        title="Live Website Preview"
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                    />
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-900/50">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        This is a live preview of your public website. Changes made to content will be reflected here after refreshing.
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
}
