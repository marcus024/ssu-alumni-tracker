import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ContactSection() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => {
                reset();
                alert('Thank you for your message! We will get back to you soon.');
            },
        });
    };

    return (
        <section id="contact" className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Contact Us
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Get in touch with us for any inquiries or feedback
                    </p>
                </div>

                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            Send us a Message
                        </h3>
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    placeholder="John Doe"
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    placeholder="john@example.com"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                                    placeholder="Your message here..."
                                ></textarea>
                                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Get in Touch
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                                        <span className="text-2xl">📍</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Location</h4>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            SSU Campus, University Street<br />
                                            City, State 12345
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                                        <span className="text-2xl">📧</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h4>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            info@ssu.edu<br />
                                            alumni@ssu.edu
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                                        <span className="text-2xl">📱</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Phone</h4>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            +1 (555) 123-4567<br />
                                            +1 (555) 987-6543
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                                        <span className="text-2xl">👥</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Social Media</h4>
                                        <div className="flex space-x-3 mt-2">
                                            <a
                                                href="https://facebook.com/ssu"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                                            >
                                                f
                                            </a>
                                            <a
                                                href="https://twitter.com/ssu"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-blue-400 text-white rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors"
                                            >
                                                𝕏
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Map */}
                        <div className="rounded-xl overflow-hidden shadow-lg h-64">
                            <iframe
                                src="https://www.openstreetmap.org/export/embed.html?bbox=124.8800%2C11.7720%2C124.8900%2C11.7780&layer=mapnik&marker=11.7750%2C124.8850"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                title="SSU Location Map - Arteche Blvd, Guindapunan, Catbalogan"
                            ></iframe>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                            <span className="block mb-1">Arteche Blvd, Brgy. Guindapunan, City of Catbalogan, 6700 Samar</span>
                            <a
                                href="https://www.openstreetmap.org/?mlat=11.7750&mlon=124.8850#map=16/11.7750/124.8850"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                View larger map
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
