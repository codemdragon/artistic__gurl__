import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import CustomOrder from './components/CustomOrder';
import Admin from './pages/Admin';

const Home = ({ data }) => {
  // Simple scroll helper passed to children
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Layout data={data}>
      <Hero data={data} scrollToSection={scrollToSection} />
      <Gallery products={data?.products || []} />
      <CustomOrder />
      <Reviews reviews={data?.reviews || []} />
    </Layout>
  );
};

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/db.json')
      .then(res => res.json())
      .then(jsonData => {
        setData(jsonData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load data", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
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
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
