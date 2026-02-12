import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Heart, Instagram, Mail, Send, 
  Palette, Gift, Truck, Star, Search, Phone, 
  Coffee, Sun, Smile 
} from 'lucide-react';

/* --- FONTS & STYLES ---
  Using Google Fonts: 'Indie Flower' for that handwritten marker feel, 
  and 'Quicksand' for readable, rounded body text.
*/

const App = () => {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Fake loading sequence
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  // Product Data based on the user's images
  const products = [
    { id: 1, title: "The Google Card", category: "Birthday", price: "PKR 1200", icon: <Search className="w-8 h-8 text-blue-500" />, color: "bg-blue-50", desc: "What day is Feb 3? It's your birthday!" },
    { id: 2, title: "Ghost Hug", category: "Love", price: "PKR 850", icon: <Smile className="w-8 h-8 text-gray-400" />, color: "bg-gray-50", desc: "You can't see it, but it's there." },
    { id: 3, title: "Missing Piece", category: "Love", price: "PKR 950", icon: <Heart className="w-8 h-8 text-red-400" />, color: "bg-red-50", desc: "You complete me." },
    { id: 4, title: "Solar System", category: "Anniversary", price: "PKR 1500", icon: <Sun className="w-8 h-8 text-yellow-500" />, color: "bg-yellow-50", desc: "I will love you as long as the sun burns." },
    { id: 5, title: "Tea Lover", category: "General", price: "PKR 800", icon: <Coffee className="w-8 h-8 text-green-600" />, color: "bg-green-50", desc: "You are tea-riffic!" },
    { id: 6, title: "Red Phone", category: "Love", price: "PKR 1100", icon: <Phone className="w-8 h-8 text-red-600" />, color: "bg-red-100", desc: "Call... you my husband." },
  ];

  const categories = ['All', 'Love', 'Birthday', 'Anniversary'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="font-sans text-gray-800 bg-[#faf7f2] min-h-screen selection:bg-pink-200">
      {/* --- GLOBAL STYLES --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Indie+Flower&family=Quicksand:wght@400;500;600;700&display=swap');
        
        body {
          font-family: 'Quicksand', sans-serif;
        }
        
        h1, h2, h3, .handwritten {
          font-family: 'Indie Flower', cursive;
        }

        .paper-shadow {
          box-shadow: 5px 5px 0px 0px rgba(0,0,0,0.1);
        }

        .paper-card {
          transition: all 0.3s ease;
        }
        
        .paper-card:hover {
          transform: translateY(-5px) rotate(1deg);
          box-shadow: 8px 8px 0px 0px rgba(0,0,0,0.15);
        }

        .doodle-border {
          border-radius: 2% 98% 2% 98% / 98% 2% 98% 2%;
        }

        .scribble-underline {
          position: relative;
          display: inline-block;
        }
        
        .scribble-underline::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -5px;
          width: 100%;
          height: 8px;
          background: url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 25 20 50 10 T 100 10' stroke='%23FF6B6B' stroke-width='3' fill='none'/%3E%3C/svg%3E");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-40 bg-[#faf7f2]/90 backdrop-blur-sm border-b-2 border-dashed border-gray-300 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-pink-300 rounded-full flex items-center justify-center border-2 border-gray-800 animate-pulse-slow">
              <Palette className="text-gray-800 w-6 h-6" />
            </div>
            <span className="text-2xl font-bold handwritten tracking-wide">Artistic Gurl</span>
          </div>
          
          <button 
            onClick={() => setMenuOpen(true)}
            className="p-2 hover:bg-pink-100 rounded-lg transition-colors"
          >
            <Menu className="w-8 h-8 text-gray-800" />
          </button>
        </div>
      </nav>

      {/* --- SIDEBAR OVERLAY --- */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
      >
        <div 
          className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-[#fffdf9] p-8 shadow-2xl transition-transform duration-300 ease-out transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-end mb-8">
            <button onClick={() => setMenuOpen(false)} className="p-2 hover:bg-red-100 rounded-full transition-colors">
              <X className="w-8 h-8 text-gray-800" />
            </button>
          </div>
          
          <ul className="space-y-6 text-center">
            {['Home', 'Shop Cards', 'Custom Orders', 'About Me', 'Contact'].map((item, idx) => (
              <li key={idx}>
                <a 
                  href="#" 
                  className="text-2xl handwritten font-bold text-gray-700 hover:text-pink-500 transition-colors block py-2 border-b border-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="mt-12 text-center">
            <p className="handwritten text-xl mb-4 text-gray-500">Follow us</p>
            <div className="flex justify-center gap-4">
              <a href="https://www.instagram.com/artistic__gurl__/" target="_blank" rel="noreferrer" className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <header className="pt-32 pb-16 px-4 overflow-hidden relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block bg-yellow-200 px-4 py-1 rounded-full text-sm font-bold tracking-wider mb-4 border-2 border-gray-800 transform -rotate-2">
            DELIVERY ALL OVER PAKISTAN 🇵🇰
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-6 leading-tight">
            Wrapping Your <br />
            <span className="text-pink-500 scribble-underline">Feelings</span> 🌸
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium">
            Handmade cards, painted memories, and heartfelt gifts created just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gray-800 text-white font-bold rounded-lg paper-shadow transform hover:-translate-y-1 transition-transform flex items-center justify-center gap-2 group">
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
          {[...Array(6)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-xl font-bold text-gray-400 flex items-center gap-2 handwritten">
                <Star className="fill-yellow-400 text-yellow-400" /> Handmade with Love
              </span>
              <span className="text-xl font-bold text-gray-400 flex items-center gap-2 handwritten">
                <Heart className="fill-pink-400 text-pink-400" /> Customized for You
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* --- GALLERY / SHOP SECTION --- */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">Our Creations</h2>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-6">
            {categories.map(cat => (
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
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white border-2 border-gray-800 rounded-xl p-4 paper-card relative overflow-hidden group">
              {/* Product Image Placeholder (Using color blocks and icons to simulate the art style) */}
              <div className={`h-64 rounded-lg ${product.color} border-2 border-dashed border-gray-300 flex flex-col items-center justify-center relative mb-4 overflow-hidden`}>
                <div className="transform group-hover:scale-110 transition-transform duration-500">
                  {product.icon}
                </div>
                <p className="mt-4 text-center px-6 font-bold text-gray-600 opacity-60 handwritten text-xl rotate-[-2deg]">
                  "{product.desc}"
                </p>
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

      {/* --- PROCESS SECTION --- */}
      <section className="py-20 bg-pink-50 border-t-2 border-gray-800 relative">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 border-2 border-gray-800 rounded-full font-bold handwritten text-2xl shadow-md">
          How it Works
        </div>
        
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-12 text-center">
          {[
            { title: "You Dream It", icon: <Smile size={40} />, text: "Tell us your theme, occasion, and message. We love creative challenges!" },
            { title: "We Create It", icon: <Palette size={40} />, text: "We sketch, paint, and assemble your card with premium materials." },
            { title: "We Deliver It", icon: <Truck size={40} />, text: "Your happiness is packed with care and shipped anywhere in Pakistan." }
          ].map((step, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white border-2 border-gray-800 rounded-full flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-pink-500">
                {step.icon}
              </div>
              <h3 className="text-3xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600 font-medium">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-4xl handwritten mb-2">Artistic Gurl</h2>
            <p className="opacity-70">Wrapping your feelings since 2020</p>
          </div>
          
          <div className="flex justify-center gap-6 mb-12">
            <FooterLink icon={<Instagram />} href="https://www.instagram.com/artistic__gurl__/" />
            <FooterLink icon={<Mail />} href="#" />
            <FooterLink icon={<Phone />} href="#" />
          </div>

          <div className="p-8 border-2 border-dashed border-gray-600 rounded-xl bg-gray-700/50 max-w-md mx-auto relative overflow-hidden">
             <div className="absolute -right-4 -top-4 text-gray-600 opacity-20 transform rotate-12">
               <Gift size={100} />
             </div>
             <h4 className="text-xl font-bold mb-4 handwritten">Stay Updated</h4>
             <div className="flex gap-2">
               <input type="email" placeholder="Enter your email" className="flex-1 bg-gray-800 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-pink-500 transition-colors" />
               <button className="bg-pink-500 text-white px-4 py-2 rounded font-bold hover:bg-pink-600 transition-colors">Join</button>
             </div>
          </div>

          <p className="mt-12 text-sm text-gray-500 font-medium">
            © {new Date().getFullYear()} Artistic Gurl. Made with 💖 in Pakistan.
          </p>
        </div>
      </footer>
    </div>
  );
};

const FooterLink = ({ icon, href }) => (
  <a href={href} className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all transform hover:scale-110">
    {icon}
  </a>
);

const Preloader = () => (
  <div className="fixed inset-0 bg-[#faf7f2] flex flex-col items-center justify-center z-[100]">
    <style>{`
      @keyframes drawing {
        0% { stroke-dashoffset: 1000; }
        100% { stroke-dashoffset: 0; }
      }
      .draw-path {
        stroke-dasharray: 1000;
        animation: drawing 2s ease-out forwards;
      }
    `}</style>
    <div className="relative">
      <svg width="150" height="150" viewBox="0 0 100 100" className="mb-4">
        <path 
          d="M20,50 Q35,20 50,50 T80,50" 
          fill="none" 
          stroke="#EC4899" 
          strokeWidth="4" 
          className="draw-path"
          strokeLinecap="round"
        />
        <path 
          d="M20,60 Q35,90 50,60 T80,60" 
          fill="none" 
          stroke="#F59E0B" 
          strokeWidth="4" 
          className="draw-path"
          style={{ animationDelay: '0.2s' }}
          strokeLinecap="round"
        />
      </svg>
    </div>
    <h2 className="text-3xl font-bold text-gray-800 animate-pulse" style={{ fontFamily: '"Indie Flower", cursive' }}>
      Artistic Gurl...
    </h2>
  </div>
);

export default App;
