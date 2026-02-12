import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, data }) => {
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

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>

            <Navbar data={data} />
            <main>
                {children}
            </main>
            <Footer contact={data?.contact} />
        </div>
    );
};

export default Layout;
