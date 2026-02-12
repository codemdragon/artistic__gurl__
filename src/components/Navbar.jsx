import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Palette, Instagram } from 'lucide-react';

const Navbar = ({ data }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Prevent scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
        // Navigate to home then scroll (simple handling)
        window.location.href = `/#${id}`;
        return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-40 bg-[#faf7f2]/90 backdrop-blur-sm border-b-2 border-dashed border-gray-300 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-pink-300 rounded-full flex items-center justify-center border-2 border-gray-800 animate-pulse-slow">
              <Palette className="text-gray-800 w-6 h-6" />
            </div>
            <span className="text-2xl font-bold handwritten tracking-wide">Artistic Gurl</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('home')} className="font-bold hover:text-pink-500 transition-colors">Home</button>
            <button onClick={() => scrollToSection('creations')} className="font-bold hover:text-pink-500 transition-colors">Our Creations</button>
            <button onClick={() => scrollToSection('reviews')} className="font-bold hover:text-pink-500 transition-colors">Reviews</button>
            <button onClick={() => scrollToSection('contact')} className="font-bold hover:text-pink-500 transition-colors">Contact</button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 hover:bg-pink-100 rounded-lg transition-colors"
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
            {['Home', 'Our Creations', 'Reviews', 'Contact'].map((item, idx) => (
              <li key={idx}>
                <button 
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="text-2xl handwritten font-bold text-gray-700 hover:text-pink-500 transition-colors block py-2 border-b border-gray-100 w-full"
                >
                  {item}
                </button>
              </li>
            ))}
             <li>
                <Link 
                  to="/admin" 
                  className="text-2xl handwritten font-bold text-gray-700 hover:text-pink-500 transition-colors block py-2 border-b border-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin
                </Link>
              </li>
          </ul>
          
          <div className="mt-12 text-center">
            <p className="handwritten text-xl mb-4 text-gray-500">Follow us</p>
            <div className="flex justify-center gap-4">
              <a href={data?.contact?.instagram || "#"} target="_blank" rel="noreferrer" className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
