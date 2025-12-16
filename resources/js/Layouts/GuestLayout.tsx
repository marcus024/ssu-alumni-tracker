import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Animated Background - matching public theme */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-gray-900">
                <div className="absolute inset-0 bg-black/30"></div>
                {/* Animated circles for visual interest */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-md px-6">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <h1 className="text-4xl font-bold text-white mb-2">
                            SSU Alumni Tracker
                        </h1>
                        <p className="text-white/80 text-sm">
                            Connecting Alumni, Building Futures
                        </p>
                    </Link>
                </div>

                {/* Card Container */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
                    <div className="bg-white/5 rounded-xl p-6">
                        {children}
                    </div>
                </div>

                {/* Footer Link */}
                <div className="text-center mt-6">
                    <Link
                        href="/"
                        className="text-white/80 hover:text-white text-sm transition-colors"
                    >
                        ← Back to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
}
