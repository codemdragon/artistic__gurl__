import React from 'react';
import { Star } from 'lucide-react';

const Reviews = ({ reviews }) => {
    return (
        <section id="reviews" className="py-20 bg-pink-50 border-t-2 border-gray-800 relative">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 border-2 border-gray-800 rounded-full font-bold handwritten text-2xl shadow-md">
                What our customers say
            </div>
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {(reviews || []).map((review, idx) => (
                        <div key={review.id || idx} className="bg-white p-6 rounded-lg border-2 border-gray-800 paper-card transform hover:rotate-1 transition-transform">
                            <div className="flex text-yellow-500 mb-4">
                                {[...Array(review.rating || 5)].map((_, i) => (
                                    <Star key={i} className="fill-current w-5 h-5" />
                                ))}
                            </div>
                            <p className="text-gray-600 mb-6 font-medium italic">"{review.text}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold">{review.name}</h4>
                                    <span className="text-xs text-gray-400">Verified Buyer</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
