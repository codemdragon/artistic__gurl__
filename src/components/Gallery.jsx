import React, { useState } from 'react';
import { Search, Smile, Heart, Sun, Coffee, Phone, Send } from 'lucide-react';

const iconMap = {
    Search: <Search className="w-8 h-8 text-blue-500" />,
    Smile: <Smile className="w-8 h-8 text-gray-400" />,
    Heart: <Heart className="w-8 h-8 text-red-400" />,
    Sun: <Sun className="w-8 h-8 text-yellow-500" />,
    Coffee: <Coffee className="w-8 h-8 text-green-600" />,
    Phone: <Phone className="w-8 h-8 text-red-600" />
};

const Gallery = ({ products }) => {
    const [activeCategory, setActiveCategory] = useState('All');

    // Extract unique categories from products
    const uniqueCategories = ['All', ...new Set((products || []).map(p => p.category))];

    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <section id="creations" className="py-20 px-4 max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-5xl font-bold mb-4">Our Creations</h2>
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-6">
                    {uniqueCategories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full font-bold transition-all border-2 border-gray-800 ${activeCategory === cat ? 'bg-pink-400 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'bg-white text-gray-800 hover:bg-gray-50'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {(filteredProducts || []).map(product => (
                    <div key={product.id} className="bg-white border-2 border-gray-800 rounded-xl p-4 paper-card relative overflow-hidden group">
                        {/* Product Image Placeholder (Using color blocks and icons to simulate the art style) */}
                        <div className={`h-64 rounded-lg ${product.color || 'bg-gray-50'} border-2 border-dashed border-gray-300 flex flex-col items-center justify-center relative mb-4 overflow-hidden`}>
                            {/* Check if actual image exists, else use icon */}
                            {product.image ? (
                                <img src={product.image} alt={product.title} className="w-full h-full object-cover rounded-lg transform group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                                <>
                                    <div className="transform group-hover:scale-110 transition-transform duration-500">
                                        {iconMap[product.icon] || <Heart className="w-8 h-8 text-pink-400" />}
                                    </div>
                                    <p className="mt-4 text-center px-6 font-bold text-gray-600 opacity-60 handwritten text-xl rotate-[-2deg]">
                                        "{product.desc}"
                                    </p>
                                </>
                            )}

                            {/* Visual embellishments */}
                            <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-gray-300"></div>
                            <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-gray-300"></div>
                        </div>

                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold mb-1">{product.title}</h3>
                                <span className="inline-block bg-gray-100 px-2 py-1 rounded text-xs font-bold text-gray-500 uppercase tracking-wide">
                                    {product.category}
                                </span>
                            </div>
                            <span className="font-bold text-lg text-pink-500 handwritten font-sans">{product.price}</span>
                        </div>

                        <button className="w-full mt-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                            Order This <Send className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Gallery;
