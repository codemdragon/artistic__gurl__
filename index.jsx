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
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState({ siteConfig: {}, products: [], categories: [] });
    const [isAdminOpen, setIsAdminOpen] = useState(false);

    // Fetch data from db.json
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('./db.json');
                const jsonData = await response.json();
                setData(jsonData);
                // Simulate loading for the premium feel
                setTimeout(() => setLoading(false), 2200);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (menuOpen || isAdminOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [menuOpen, isAdminOpen]);

    const { siteConfig, products, categories } = data;

    const filteredProducts = products.filter(p => {
        const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getIcon = (iconName, className) => {
        const icons = {
            Search: <Search className={className} />,
            Smile: <Smile className={className} />,
            Heart: <Heart className={className} />,
            Sun: <Sun className={className} />,
            Coffee: <Coffee className={className} />,
            Phone: <Phone className={className} />,
            Palette: <Palette className={className} />,
            Gift: <Gift className={className} />,
            Truck: <Truck className={className} />,
            Star: <Star className={className} />
        };
        return icons[iconName] || <Palette className={className} />;
    };

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

            {/* --- ADMIN MODAL --- */}
            {isAdminOpen && (
                <AdminPanel
                    data={data}
                    onClose={() => setIsAdminOpen(false)}
                    onSave={(newData) => setData(newData)}
                />
            )}

            {/* --- NAVIGATION --- */}
            <nav className="fixed top-0 w-full z-40 bg-[#faf7f2]/90 backdrop-blur-sm border-b-2 border-dashed border-gray-300 transition-all duration-300">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsAdminOpen(true)}>
                        <div className="w-10 h-10 bg-pink-300 rounded-full flex items-center justify-center border-2 border-gray-800 animate-pulse-slow">
                            <Palette className="text-gray-800 w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold handwritten tracking-wide">{siteConfig.title}</span>
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
                        {siteConfig.announcement}
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-6 leading-tight">
                        {siteConfig.heroTitle?.split(' ')[0]} <br />
                        <span className="text-pink-500 scribble-underline">{siteConfig.heroTitle?.split(' ').slice(1).join(' ')}</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium">
                        {siteConfig.heroSubtitle}
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

                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-8">
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search for cards, gifts..."
                                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-800 focus:ring-4 focus:ring-pink-200 outline-none transition-all font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-wrap justify-center gap-2">
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="bg-white border-2 border-gray-800 rounded-xl p-4 paper-card relative overflow-hidden group">
                            {/* Product Image Placeholder (Using color blocks and icons to simulate the art style) */}
                            <div className={`h-64 rounded-lg ${product.color} border-2 border-dashed border-gray-300 flex flex-col items-center justify-center relative mb-4 overflow-hidden`}>
                                {product.image ? (
                                    <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                ) : (
                                    <div className="transform group-hover:scale-110 transition-transform duration-500">
                                        {getIcon(product.icon, "w-12 h-12")}
                                    </div>
                                )}
                                <p className="mt-4 text-center px-6 font-bold text-gray-600 opacity-60 handwritten text-xl rotate-[-2deg]">
                                    "{product.desc}"
                                </p>
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

                            <button
                                className="w-full mt-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                                onClick={() => {
                                    const text = encodeURIComponent(`Hi! I'm interested in ordering "${product.title}" (${product.price}).`);
                                    window.open(`https://wa.me/${siteConfig.phone?.replace(/\D/g, '')}?text=${text}`, '_blank');
                                }}
                            >
                                Order via WhatsApp <Send className="w-4 h-4" />
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
                        <FooterLink icon={<Instagram />} href={siteConfig.instagram} />
                        <FooterLink icon={<Mail />} href={`mailto:${siteConfig.email}`} />
                        <FooterLink icon={<Phone />} href={`tel:${siteConfig.phone}`} />
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

const AdminPanel = ({ data, onClose, onSave }) => {
    const [token, setToken] = useState(localStorage.getItem('gh_token') || '');
    const [status, setStatus] = useState('');
    const [activeTab, setActiveTab] = useState('config');
    const [editData, setEditData] = useState(data);

    const repo = "codemdragon/artistic__gurl__";
    const filePath = "db.json";

    const handleSaveConfig = async () => {
        if (!token) {
            setStatus('❌ Please enter a GitHub token');
            return;
        }
        setStatus('⏳ Saving to GitHub...');
        try {
            // 1. Get current file SHA
            const res = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
                headers: { Authorization: `token ${token}` }
            });
            const fileData = await res.json();
            const sha = fileData.sha;

            // 2. Update file
            const updateRes = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
                method: 'PUT',
                headers: {
                    Authorization: `token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: "Update site configuration via Admin Panel",
                    content: btoa(unescape(encodeURIComponent(JSON.stringify(editData, null, 2)))),
                    sha: sha
                })
            });

            if (updateRes.ok) {
                setStatus('✅ Saved successfully!');
                onSave(editData);
                localStorage.setItem('gh_token', token);
            } else {
                const error = await updateRes.json();
                setStatus(`❌ Error: ${error.message}`);
            }
        } catch (err) {
            setStatus(`❌ Error: ${err.message}`);
        }
    };

    const handleImageUpload = async (e, productId) => {
        const file = e.target.files[0];
        if (!file) return;

        setStatus('⏳ Uploading image...');
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64Content = reader.result.split(',')[1];
            const fileName = `public/images/${Date.now()}_${file.name}`;

            try {
                const uploadRes = await fetch(`https://api.github.com/repos/${repo}/contents/${fileName}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `token ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: `Upload image for product ${productId}`,
                        content: base64Content
                    })
                });

                if (uploadRes.ok) {
                    const result = await uploadRes.json();
                    const imageUrl = result.content.download_url;

                    const newProducts = editData.products.map(p =>
                        p.id === productId ? { ...p, image: imageUrl } : p
                    );
                    setEditData({ ...editData, products: newProducts });
                    setStatus('✅ Image uploaded!');
                } else {
                    setStatus('❌ Upload failed');
                }
            } catch (err) {
                setStatus(`❌ Error: ${err.message}`);
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-4xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border-4 border-gray-800">
                <div className="bg-gray-800 text-white p-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold handwritten">Admin Dashboard</h2>
                        <p className="text-sm opacity-70">Manage your shop content & settings</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X size={32} />
                    </button>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar Tabs */}
                    <div className="w-48 bg-gray-50 border-r-2 border-gray-200 p-4 space-y-2">
                        {['config', 'products', 'contacts'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`w-full text-left px-4 py-3 rounded-xl font-bold capitalize transition-all ${activeTab === tab ? 'bg-pink-500 text-white shadow-lg' : 'hover:bg-gray-200 text-gray-600'}`}
                            >
                                {tab}
                            </button>
                        ))}
                        <div className="pt-8 mt-8 border-t border-gray-200">
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">GitHub Token</label>
                            <input
                                type="password"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                placeholder="Paste token here..."
                                className="w-full p-2 text-xs border border-gray-300 rounded focus:border-pink-500 outline-none"
                            />
                        </div>
                        {status && (
                            <div className="mt-4 p-3 bg-white border border-gray-200 rounded-lg text-sm font-medium">
                                {status}
                            </div>
                        )}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto p-8 bg-[#faf7f2]">
                        {activeTab === 'config' && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold border-b-2 border-dashed border-gray-300 pb-2 mb-6">Site Configuration</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Portfolio Title</label>
                                        <input
                                            type="text"
                                            value={editData.siteConfig.title}
                                            onChange={(e) => setEditData({ ...editData, siteConfig: { ...editData.siteConfig, title: e.target.value } })}
                                            className="w-full p-3 border-2 border-gray-800 rounded-xl focus:ring-4 focus:ring-pink-100 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Announcement Bar</label>
                                        <input
                                            type="text"
                                            value={editData.siteConfig.announcement}
                                            onChange={(e) => setEditData({ ...editData, siteConfig: { ...editData.siteConfig, announcement: e.target.value } })}
                                            className="w-full p-3 border-2 border-gray-800 rounded-xl focus:ring-4 focus:ring-pink-100 outline-none"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Hero Title</label>
                                        <input
                                            type="text"
                                            value={editData.siteConfig.heroTitle}
                                            onChange={(e) => setEditData({ ...editData, siteConfig: { ...editData.siteConfig, heroTitle: e.target.value } })}
                                            className="w-full p-3 border-2 border-gray-800 rounded-xl focus:ring-4 focus:ring-pink-100 outline-none"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Hero Subtitle</label>
                                        <textarea
                                            value={editData.siteConfig.heroSubtitle}
                                            onChange={(e) => setEditData({ ...editData, siteConfig: { ...editData.siteConfig, heroSubtitle: e.target.value } })}
                                            className="w-full p-3 border-2 border-gray-800 rounded-xl h-24 focus:ring-4 focus:ring-pink-100 outline-none"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'products' && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold border-b-2 border-dashed border-gray-300 pb-2 mb-6 flex justify-between items-center">
                                    Manage Products
                                    <button
                                        className="text-sm bg-pink-500 text-white px-4 py-2 rounded-lg"
                                        onClick={() => {
                                            const newId = Math.max(...editData.products.map(p => p.id)) + 1;
                                            setEditData({
                                                ...editData,
                                                products: [...editData.products, { id: newId, title: "New Product", price: "PKR 0", category: "General", desc: "", color: "bg-gray-50", icon: "Gift" }]
                                            });
                                        }}
                                    >+ Add New</button>
                                </h3>
                                <div className="space-y-4">
                                    {editData.products.map((p, idx) => (
                                        <div key={p.id} className="bg-white p-4 rounded-xl border-2 border-gray-800 flex gap-4 items-start">
                                            <div className="w-32 h-32 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden flex flex-col items-center justify-center relative group">
                                                {p.image ? (
                                                    <img src={p.image} className="w-full h-full object-cover" />
                                                ) : <Palette className="text-gray-300" size={40} />}
                                                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                                                    <span className="text-white text-xs font-bold">Upload</span>
                                                    <input type="file" className="hidden" onChange={(e) => handleImageUpload(e, p.id)} />
                                                </label>
                                            </div>
                                            <div className="flex-1 grid grid-cols-2 gap-4">
                                                <input
                                                    className="p-2 border border-gray-300 rounded"
                                                    value={p.title}
                                                    onChange={(e) => {
                                                        const np = [...editData.products];
                                                        np[idx].title = e.target.value;
                                                        setEditData({ ...editData, products: np });
                                                    }}
                                                />
                                                <input
                                                    className="p-2 border border-gray-300 rounded"
                                                    value={p.price}
                                                    onChange={(e) => {
                                                        const np = [...editData.products];
                                                        np[idx].price = e.target.value;
                                                        setEditData({ ...editData, products: np });
                                                    }}
                                                />
                                                <select
                                                    className="p-2 border border-gray-300 rounded"
                                                    value={p.category}
                                                    onChange={(e) => {
                                                        const np = [...editData.products];
                                                        np[idx].category = e.target.value;
                                                        setEditData({ ...editData, products: np });
                                                    }}
                                                >
                                                    {editData.categories.map(c => <option key={c} value={c}>{c}</option>)}
                                                </select>
                                                <button
                                                    className="text-red-500 font-bold hover:bg-red-50 rounded p-2"
                                                    onClick={() => {
                                                        setEditData({
                                                            ...editData,
                                                            products: editData.products.filter(item => item.id !== p.id)
                                                        });
                                                    }}
                                                >Remove</button>
                                                <textarea
                                                    className="col-span-2 p-2 border border-gray-300 rounded h-16"
                                                    value={p.desc}
                                                    onChange={(e) => {
                                                        const np = [...editData.products];
                                                        np[idx].desc = e.target.value;
                                                        setEditData({ ...editData, products: np });
                                                    }}
                                                ></textarea>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'contacts' && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold border-b-2 border-dashed border-gray-300 pb-2 mb-6">Contact Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Instagram URL</label>
                                        <input
                                            type="text"
                                            value={editData.siteConfig.instagram}
                                            onChange={(e) => setEditData({ ...editData, siteConfig: { ...editData.siteConfig, instagram: e.target.value } })}
                                            className="w-full p-3 border-2 border-gray-800 rounded-xl focus:ring-4 focus:ring-pink-100 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                                        <input
                                            type="text"
                                            value={editData.siteConfig.phone}
                                            onChange={(e) => setEditData({ ...editData, siteConfig: { ...editData.siteConfig, phone: e.target.value } })}
                                            className="w-full p-3 border-2 border-gray-800 rounded-xl focus:ring-4 focus:ring-pink-100 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                                        <input
                                            type="text"
                                            value={editData.siteConfig.email}
                                            onChange={(e) => setEditData({ ...editData, siteConfig: { ...editData.siteConfig, email: e.target.value } })}
                                            className="w-full p-3 border-2 border-gray-800 rounded-xl focus:ring-4 focus:ring-pink-100 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-6 bg-gray-50 border-t-2 border-gray-200 flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-white border-2 border-gray-800 rounded-xl font-bold hover:bg-gray-100"
                    >Cancel</button>
                    <button
                        onClick={handleSaveConfig}
                        className="px-8 py-3 bg-gray-800 text-white border-2 border-gray-800 rounded-xl font-bold hover:bg-gray-700 shadow-lg transform hover:-translate-y-1 transition-all"
                    >Save Changes</button>
                </div>
            </div>
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
