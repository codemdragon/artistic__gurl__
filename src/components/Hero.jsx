import React from 'react';
import { Gift, Palette, Star, Heart } from 'lucide-react';

const Hero = ({ data, scrollToSection }) => {
    return (
        <>
            <header id="home" className="pt-32 pb-16 px-4 overflow-hidden relative">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-block bg-yellow-200 px-4 py-1 rounded-full text-sm font-bold tracking-wider mb-4 border-2 border-gray-800 transform -rotate-2">
                        DELIVERY ALL OVER PAKISTAN 🇵🇰
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-6 leading-tight">
                        {/* Simple parsing for line break if present in title, otherwise standard display */}
                        {data?.hero?.title ? (
                            <>
                                {data.hero.title.split(' ').slice(0, 2).join(' ')} <br />
                                <span className="text-pink-500 scribble-underline">{data.hero.title.split(' ').slice(2).join(' ')}</span> 🌸
                            </>
                        ) : (
                            <>Wrapping Your <br /><span className="text-pink-500 scribble-underline">Feelings</span> 🌸</>
                        )}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium">
                        {data?.hero?.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => scrollToSection('creations')}
                            className="px-8 py-4 bg-gray-800 text-white font-bold rounded-lg paper-shadow transform hover:-translate-y-1 transition-transform flex items-center justify-center gap-2 group">
                            Shop Collections
                            <Gift className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        </button>
                        <button className="px-8 py-4 bg-white text-gray-800 border-2 border-gray-800 font-bold rounded-lg paper-shadow transform hover:-translate-y-1 transition-transform flex items-center justify-center gap-2">
                            Custom Order
                            <Palette className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-24 h-24 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-40 right-10 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            </header>

            {/* --- FEATURES SCROLL --- */}
            <div className="bg-white border-y-2 border-dashed border-gray-300 py-6 overflow-hidden">
                <div className="flex gap-8 whitespace-nowrap animate-marquee">
                    {(data?.hero?.ticker || []).map((text, i) => (
                        <span key={i} className="text-xl font-bold text-gray-400 flex items-center gap-2 handwritten">
                            {i % 2 === 0 ? <Star className="fill-yellow-400 text-yellow-400" /> : <Heart className="fill-pink-400 text-pink-400" />} {text}
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Hero;
