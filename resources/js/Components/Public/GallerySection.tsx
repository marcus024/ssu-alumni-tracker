import { GalleryImage, Graduate } from '@/types';
import { useState } from 'react';

interface GallerySectionProps {
    images: GalleryImage[];
    graduates: Graduate[];
}

interface CombinedImage {
    id: string;
    src: string;
    description: string;
    date: string;
    type: 'gallery' | 'activity';
}

export default function GallerySection({ images, graduates }: GallerySectionProps) {
    const [selectedImage, setSelectedImage] = useState<CombinedImage | null>(null);

    // Combine gallery images and alumni activity images
    const combinedImages: CombinedImage[] = [
        // Gallery images from admin
        ...images.map(img => ({
            id: `gallery-${img.id}`,
            src: `/uploads/${img.image}`,
            description: img.description || img.title,
            date: img.created_at,
            type: 'gallery' as const,
        })),
        // Activity images from graduates
        ...graduates.flatMap(graduate => {
            if (graduate.activity_images && Array.isArray(graduate.activity_images)) {
                return graduate.activity_images.map((image, index) => ({
                    id: `activity-${graduate.id}-${index}`,
                    src: `/storage/${image}`,
                    description: `Alumni Activity - ${graduate.name}`,
                    date: graduate.created_at,
                    type: 'activity' as const,
                }));
            }
            return [];
        }),
    ];

    return (
        <section id="gallery" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Gallery
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Moments and memories from our campus life and activities
                    </p>
                </div>

                {combinedImages.length > 0 ? (
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {combinedImages.map((image) => (
                                <div
                                    key={image.id}
                                    onClick={() => setSelectedImage(image)}
                                    className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer aspect-square"
                                >
                                    <img
                                        src={image.src}
                                        alt={image.description}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <p className="text-white text-sm">{image.description}</p>
                                            <p className="text-white/70 text-xs mt-1">
                                                {new Date(image.date).toLocaleDateString()}
                                            </p>
                                            <span className={`inline-block px-2 py-1 text-xs rounded mt-2 ${
                                                image.type === 'gallery' ? 'bg-blue-500/80' : 'bg-green-500/80'
                                            } text-white`}>
                                                {image.type === 'gallery' ? 'Gallery' : 'Alumni Activity'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📸</div>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Gallery images will be available soon.
                        </p>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    onClick={() => setSelectedImage(null)}
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-5xl max-h-[90vh]"
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.description}
                            className="max-w-full max-h-[80vh] object-contain rounded-lg"
                        />
                        <div className="bg-white dark:bg-gray-900 rounded-b-lg p-4 mt-2">
                            <p className="text-gray-900 dark:text-white">{selectedImage.description}</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                {new Date(selectedImage.date).toLocaleDateString()}
                            </p>
                            <span className={`inline-block px-2 py-1 text-xs rounded mt-2 ${
                                selectedImage.type === 'gallery' ? 'bg-blue-500' : 'bg-green-500'
                            } text-white`}>
                                {selectedImage.type === 'gallery' ? 'Gallery Image' : 'Alumni Activity'}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
