import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, Check, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';

const Admin = () => {
    const [token, setToken] = useState(localStorage.getItem('github_token') || '');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [sha, setSha] = useState('');

    // Repo Details
    const OWNER = 'codemdragon';
    const REPO = 'artistic__gurl__';
    const PATH = 'public/db.json';

    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, []); // Only fetch manually or on initial load if token exists

    const fetchData = async () => {
        if (!token) return;
        setLoading(true);
        setStatus({ type: 'info', msg: 'Fetching data from GitHub...' });

        try {
            const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (!response.ok) throw new Error('Failed to fetch data');

            const fileData = await response.json();
            const content = JSON.parse(atob(fileData.content));

            setData(content);
            setSha(fileData.sha);
            setStatus({ type: 'success', msg: 'Data loaded successfully' });
            localStorage.setItem('github_token', token);
        } catch (error) {
            setStatus({ type: 'error', msg: error.message });
        } finally {
            setLoading(false);
        }
    };

    const saveData = async () => {
        if (!data || !sha) return;
        setLoading(true);
        setStatus({ type: 'info', msg: 'Saving changes...' });

        try {
            const content = btoa(JSON.stringify(data, null, 2)); // Encode to Base64

            const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: 'Update db.json from Admin Panel',
                    content: content,
                    sha: sha
                })
            });

            if (!response.ok) throw new Error('Failed to save data. Check permissions or if file changed remotely.');

            const result = await response.json();
            setSha(result.content.sha); // Update SHA for next commit
            setStatus({ type: 'success', msg: 'Changes saved successfully!' });
        } catch (error) {
            setStatus({ type: 'error', msg: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e, type, id) => {
        const file = e.target.files[0];
        if (!file) return;

        // In a real scenario, we'd commit the image to 'public/uploads' via GitHub API
        // checking if size is small enough for API limits (1MB for direct content)
        // For now, we will assume small images or just use base64 data URI if very small,
        // but better: commit to repo and get raw URL.

        // Simplified: Alert user about complexity or handle basic commit

        setStatus({ type: 'info', msg: 'Uploading image...' });

        const reader = new FileReader();
        reader.onload = async () => {
            const base64Content = reader.result.split(',')[1];
            const filename = `uploads/${Date.now()}_${file.name}`;

            try {
                const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/public/${filename}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: `Upload image ${file.name}`,
                        content: base64Content
                    })
                });

                if (!response.ok) throw new Error('Image upload failed');

                // Construct Public URL (using jsdelivr or raw.githubusercontent depending on caching needs, or relative path)
                // Since it's in public folder, relative path regarding to deployed site root
                const publicUrl = `/${filename}`;

                // Update Data state
                if (type === 'product') {
                    const updatedProducts = data.products.map(p =>
                        p.id === id ? { ...p, image: publicUrl } : p
                    );
                    setData({ ...data, products: updatedProducts });
                }
                setStatus({ type: 'success', msg: 'Image uploaded! Remember to Save Changes.' });

            } catch (error) {
                setStatus({ type: 'error', msg: `Upload error: ${error.message}` });
            }
        };
        reader.readAsDataURL(file);
    };

    const updateField = (section, field, value) => {
        setData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const updateProduct = (id, field, value) => {
        setData(prev => ({
            ...prev,
            products: prev.products.map(p => p.id === id ? { ...p, [field]: value } : p)
        }));
    };

    const addProduct = () => {
        const newId = Math.max(...data.products.map(p => p.id), 0) + 1;
        const newProduct = {
            id: newId,
            title: "New Product",
            category: "General",
            price: "PKR 0",
            icon: "Heart",
            color: "bg-gray-50",
            desc: "Description here"
        };
        setData(prev => ({ ...prev, products: [...prev.products, newProduct] }));
    };

    const removeProduct = (id) => {
        if (!window.confirm("Are you sure?")) return;
        setData(prev => ({ ...prev, products: prev.products.filter(p => p.id !== id) }));
    };

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-bold mb-4 text-center">Admin Access</h2>
                    <p className="mb-4 text-gray-600 text-sm">Enter your GitHub Personal Access Token to manage content.</p>
                    <input
                        type="password"
                        className="w-full border p-3 rounded mb-4"
                        placeholder="ghp_..."
                        value={token}
                        onChange={e => setToken(e.target.value)}
                    />
                    <button
                        onClick={() => { localStorage.setItem('github_token', token); fetchData(); }}
                        className="w-full bg-gray-800 text-white p-3 rounded font-bold"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <div className="flex gap-4">
                        <button onClick={fetchData} className="px-4 py-2 bg-white border rounded hover:bg-gray-50">Refresh</button>
                        <button
                            onClick={saveData}
                            disabled={loading}
                            className={`px-6 py-2 bg-pink-500 text-white font-bold rounded flex items-center gap-2 ${loading ? 'opacity-50' : 'hover:bg-pink-600'}`}
                        >
                            <Save size={18} /> {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>

                {status.msg && (
                    <div className={`p-4 rounded mb-6 flex items-center gap-2 ${status.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {status.type === 'error' ? <AlertCircle size={20} /> : <Check size={20} />}
                        {status.msg}
                    </div>
                )}

                {data ? (
                    <div className="space-y-8">
                        {/* Hero Section */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-bold mb-4 border-b pb-2">Hero Section</h2>
                            <div className="grid gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1">Title</label>
                                    <input
                                        className="w-full border p-2 rounded"
                                        value={data.hero.title}
                                        onChange={e => updateField('hero', 'title', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Subtitle</label>
                                    <textarea
                                        className="w-full border p-2 rounded"
                                        value={data.hero.subtitle}
                                        onChange={e => updateField('hero', 'subtitle', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Products Section */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex justify-between items-center mb-4 border-b pb-2">
                                <h2 className="text-xl font-bold">Products</h2>
                                <button onClick={addProduct} className="flex items-center gap-1 text-sm bg-green-100 text-green-700 px-3 py-1 rounded font-bold hover:bg-green-200">
                                    <Plus size={16} /> Add Product
                                </button>
                            </div>

                            <div className="space-y-6">
                                {data.products.map(product => (
                                    <div key={product.id} className="border p-4 rounded bg-gray-50 relative group">
                                        <button
                                            onClick={() => removeProduct(product.id)}
                                            className="absolute top-2 right-2 p-1 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Delete Product"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold mb-1 uppercase text-gray-400">Title</label>
                                                <input
                                                    className="w-full border p-2 rounded"
                                                    value={product.title}
                                                    onChange={e => updateProduct(product.id, 'title', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold mb-1 uppercase text-gray-400">Price</label>
                                                <input
                                                    className="w-full border p-2 rounded"
                                                    value={product.price}
                                                    onChange={e => updateProduct(product.id, 'price', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold mb-1 uppercase text-gray-400">Category</label>
                                                <select
                                                    className="w-full border p-2 rounded"
                                                    value={product.category}
                                                    onChange={e => updateProduct(product.id, 'category', e.target.value)}
                                                >
                                                    <option value="Birthday">Birthday</option>
                                                    <option value="Love">Love</option>
                                                    <option value="Anniversary">Anniversary</option>
                                                    <option value="General">General</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold mb-1 uppercase text-gray-400">Image</label>
                                                <div className="flex items-center gap-2">
                                                    {product.image && <img src={product.image} className="w-10 h-10 object-cover rounded" alt="Preview" />}
                                                    <label className="cursor-pointer bg-white border border-gray-300 px-3 py-2 rounded text-sm hover:bg-gray-50 flex items-center gap-2">
                                                        <ImageIcon size={16} /> Upload
                                                        <input type="file" className="hidden" onChange={(e) => handleImageUpload(e, 'product', product.id)} accept="image/*" />
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-span-full">
                                                <label className="block text-xs font-bold mb-1 uppercase text-gray-400">Description</label>
                                                <textarea
                                                    className="w-full border p-2 rounded"
                                                    value={product.desc}
                                                    onChange={e => updateProduct(product.id, 'desc', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-bold mb-4 border-b pb-2">Contact Info</h2>
                            <div className="grid gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1">Email</label>
                                    <input
                                        className="w-full border p-2 rounded"
                                        value={data.contact.email}
                                        onChange={e => updateField('contact', 'email', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Phone</label>
                                    <input
                                        className="w-full border p-2 rounded"
                                        value={data.contact.phone}
                                        onChange={e => updateField('contact', 'phone', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Instagram URL</label>
                                    <input
                                        className="w-full border p-2 rounded"
                                        value={data.contact.instagram}
                                        onChange={e => updateField('contact', 'instagram', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-500">Loading data...</div>
                )}
            </div>
        </div>
    );
};

export default Admin;
