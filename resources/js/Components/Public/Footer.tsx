export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* About */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                                SSU
                            </div>
                            <span className="text-lg font-bold">Alumni Tracker</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Connecting alumni, sharing opportunities, and building futures together.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>
                                <button
                                    onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="hover:text-white transition-colors"
                                >
                                    About Us
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => document.getElementById('departments')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="hover:text-white transition-colors"
                                >
                                    Departments
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => document.getElementById('job-board')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="hover:text-white transition-colors"
                                >
                                    Job Board
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => document.getElementById('graduates')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="hover:text-white transition-colors"
                                >
                                    Graduates
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Contact</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li className="flex items-start">
                                <span className="mr-2">📍</span>
                                <span>SSU Campus, University Street<br />City, State 12345</span>
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">📧</span>
                                <a href="mailto:info@ssu.edu" className="hover:text-white transition-colors">
                                    info@ssu.edu
                                </a>
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">📱</span>
                                <a href="tel:+15551234567" className="hover:text-white transition-colors">
                                    +1 (555) 123-4567
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Follow Us</h3>
                        <div className="flex space-x-3">
                            <a
                                href="https://facebook.com/ssu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                            >
                                f
                            </a>
                            <a
                                href="https://twitter.com/ssu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors"
                            >
                                𝕏
                            </a>
                            <a
                                href="https://instagram.com/ssu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity"
                            >
                                📷
                            </a>
                            <a
                                href="https://linkedin.com/school/ssu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors"
                            >
                                in
                            </a>
                        </div>
                        <p className="text-gray-400 text-sm mt-4">
                            Stay connected with our alumni community
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
                    <p>
                        © {currentYear} SSU Alumni Tracker. All rights reserved.
                    </p>
                    <p className="mt-2">
                        Made with ❤️ for our alumni community
                    </p>
                </div>
            </div>
        </footer>
    );
}
