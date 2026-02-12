import React, { useState } from 'react';
import { Palette, Send, Copy, Check } from 'lucide-react';

const CustomOrder = () => {
    const [formData, setFormData] = useState({
        name: '',
        instagram: '',
        details: '',
        date: ''
    });

    const [copied, setCopied] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleOrder = () => {
        const message = `Hi! I'd like to place a custom order 🎨\n\nName: ${formData.name}\nInstagram: ${formData.instagram}\nDate Needed: ${formData.date}\n\nDetails:\n${formData.details}`;

        navigator.clipboard.writeText(message).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);

            // Open Instagram DM in new tab
            window.open('https://ig.me/m/artistic__gurl__', '_blank');
        });
    };

    return (
        <section id="custom-order" className="py-20 px-4 max-w-4xl mx-auto">
            <div className="bg-white border-2 border-gray-800 rounded-xl p-8 paper-card paper-shadow relative overflow-hidden">

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 transform -translate-x-1/2 translate-y-1/2"></div>

                <div className="relative z-10">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center p-3 bg-pink-100 rounded-full mb-4">
                            <Palette className="w-8 h-8 text-pink-500" />
                        </div>
                        <h2 className="text-4xl font-bold mb-4">Request a Custom Order</h2>
                        <p className="text-gray-600 max-w-lg mx-auto">
                            Got a special idea? Let's bring it to life! Fill out the details below and we'll redirect you to Instagram to finalize your order.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-pink-500 focus:outline-none transition-colors bg-gray-50"
                                    placeholder="Jane Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Instagram Handle</label>
                                <input
                                    type="text"
                                    name="instagram"
                                    value={formData.instagram}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-pink-500 focus:outline-none transition-colors bg-gray-50"
                                    placeholder="@username"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">When do you need it?</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-pink-500 focus:outline-none transition-colors bg-gray-50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Custom Details</label>
                            <textarea
                                name="details"
                                value={formData.details}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-pink-500 focus:outline-none transition-colors bg-gray-50 resize-none"
                                placeholder="Describe your idea... (Theme, colors, occasion, etc.)"
                            ></textarea>
                        </div>

                        <button
                            onClick={handleOrder}
                            disabled={!formData.name || !formData.details}
                            className="w-full py-4 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-5 h-5" /> Copied & Redirecting...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" /> Send Custom Request
                                </>
                            )}
                        </button>

                        <p className="text-center text-xs text-gray-400 mt-4">
                            * Clicking send will copy your details and open Instagram
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomOrder;
