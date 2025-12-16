import { Post } from '@/types';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

interface PostsSectionProps {
    posts: Post[];
}

export default function PostsSection({ posts }: PostsSectionProps) {
    const publishedPosts = posts.filter(post => post.is_published);

    return (
        <section id="posts" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Blog Posts
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Read our latest articles and stories from the alumni community
                    </p>
                </motion.div>

                {publishedPosts.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {publishedPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link href={`/posts/${post.id}`}>
                                    {post.image ? (
                                        <img
                                            src={`/uploads/${post.image}`}
                                            alt={post.title}
                                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-48 bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                                            <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </div>
                                    )}
                                </Link>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs px-3 py-1 rounded-full font-semibold">
                                            Blog Post
                                        </span>
                                    </div>
                                    <Link href={`/posts/${post.id}`}>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                    </Link>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                        {post.content}
                                    </p>
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="text-gray-500 dark:text-gray-400">
                                            <span>{new Date(post.created_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}</span>
                                        </div>
                                        <Link
                                            href={`/posts/${post.id}`}
                                            className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-semibold transition-colors"
                                        >
                                            Read More
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            No blog posts available at the moment. Check back soon!
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
