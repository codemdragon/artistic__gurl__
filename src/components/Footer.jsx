import React from 'react';
import { Instagram, Mail, Phone, Gift } from 'lucide-react';

const Footer = ({ contact }) => {
    return (
        <footer id="contact" className="bg-gray-800 text-white py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8">
                    <h2 className="text-4xl handwritten mb-2">Artistic Gurl</h2>
                    <p className="opacity-70">Wrapping your feelings since 2020</p>
                </div>

                <div className="flex justify-center gap-6 mb-12">
                    <FooterLink icon={<Instagram />} href={contact?.instagram || "#"} />
                    <FooterLink icon={<Mail />} href={contact?.email ? `mailto:${contact.email}` : "#"} />
                    <FooterLink icon={<Phone />} href={contact?.phone ? `tel:${contact.phone}` : "#"} />
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
    );
};

const FooterLink = ({ icon, href }) => (
    <a href={href} className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all transform hover:scale-110">
        {icon}
    </a>
);

export default Footer;
