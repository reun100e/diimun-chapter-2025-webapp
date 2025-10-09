import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Mail, Phone, MapPin, Calendar, Clock, 
    Facebook, Instagram, Twitter, Linkedin,
    Heart, ExternalLink, Award, Users
} from 'lucide-react';
import { ASSETS, FOOTER_LINKS } from '../utils/constants';
import { smoothScrollTo } from '../animations/parallax';

const Footer = ({ onNavigate }) => {
    const currentYear = new Date().getFullYear();
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    // Show/hide scroll to top button based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setShowScrollToTop(scrollTop > 300); // Show after scrolling 300px
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const contactInfo = [
        {
            icon: Mail,
            label: "Email",
            value: "dna@aghosh.in",
            link: "mailto:dna@aghosh.in"
        },
        {
            icon: Phone,
            label: "Phone",
            value: "+91 94423 08824",
            link: "tel:+919442308824"
        },
        {
            icon: MapPin,
            label: "Venue",
            value: "GHMC Trivandrum, Kerala",
            link: "https://maps.google.com/?q=GHMC+Trivandrum"
        },
        {
            icon: Calendar,
            label: "Date",
            value: "November 4th, 2025",
            link: null
        }
    ];

    // Use the new footer links structure
    const { eventInfo, committeeGuidelines, support, quickLinks } = FOOTER_LINKS;

    const socialLinks = [
        { icon: Facebook, label: "Facebook", href: "#", color: "hover:text-blue-600" },
        { icon: Instagram, label: "Instagram", href: "#", color: "hover:text-pink-600" },
        { icon: Twitter, label: "Twitter", href: "#", color: "hover:text-blue-400" },
        { icon: Linkedin, label: "LinkedIn", href: "#", color: "hover:text-blue-700" }
    ];

    const handleNavigation = (href) => {
        if (href.startsWith('#')) {
            smoothScrollTo(href, 100);
        } else {
            // Handle page navigation
            const page = href.substring(1) // Remove the leading slash
            onNavigate(page);
            // Scroll to top of page after navigation
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-gradient-to-br from-midnight-900 via-midnight-800 to-cognac-900 text-white">
            {/* Main Footer Content */}
            <div className="container-custom py-16">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg bg-white p-2">
                                <img 
                                    src={ASSETS.dnaLogo} 
                                    alt="DNA Logo" 
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-cognac-200 bg-clip-text text-transparent">
                                    DIIMUN
                                </h3>
                                <p className="text-cognac-300 text-sm">Powered by DNA</p>
                            </div>
                        </div>
                        <p className="text-cognac-200 leading-relaxed mb-6">
                            Doctors Integrated International Model United Nations - 
                            Empowering future healthcare leaders through meaningful dialogue and debate.
                        </p>
                        
                        {/* Support Links - Subtle placement */}
                        <div className="mt-8 pt-6 border-t border-cognac-700/30">
                            <ul className="space-y-2">
                                {support.map((link, index) => (
                                    <li key={link.label}>
                                        <button
                                            onClick={() => handleNavigation(link.href)}
                                            className="text-cognac-300 hover:text-cognac-100 transition-colors duration-300 text-sm underline"
                                        >
                                            {link.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Event Info Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-xl font-bold mb-6 text-white">Event Info</h4>
                        <ul className="space-y-3">
                            {eventInfo.map((link, index) => (
                                <li key={link.label}>
                                    <motion.button
                                        onClick={() => handleNavigation(link.href)}
                                        whileHover={{ x: 5 }}
                                        className="text-cognac-200 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 bg-cognac-400 rounded-full group-hover:bg-white transition-colors duration-300"></span>
                                        {link.label}
                                    </motion.button>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Committee Guidelines */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-xl font-bold mb-6 text-white">Committee Guidelines</h4>
                        <ul className="space-y-3">
                            {committeeGuidelines.map((link, index) => (
                                <li key={link.label}>
                                    <motion.button
                                        onClick={() => handleNavigation(link.href)}
                                        whileHover={{ x: 5 }}
                                        className="text-cognac-200 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 bg-cognac-400 rounded-full group-hover:bg-white transition-colors duration-300"></span>
                                        {link.label}
                                    </motion.button>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-xl font-bold mb-6 text-white">Contact Info</h4>
                        <ul className="space-y-4">
                            {contactInfo.map((contact, index) => (
                                <li key={contact.label}>
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        className="flex items-start gap-3 group"
                                    >
                                        <div className="w-10 h-10 bg-cognac-700/50 rounded-xl flex items-center justify-center group-hover:bg-cognac-600/50 transition-colors duration-300">
                                            <contact.icon className="w-5 h-5 text-cognac-200" />
                                        </div>
                                        <div>
                                            <p className="text-cognac-300 text-sm font-medium">{contact.label}</p>
                                            {contact.link ? (
                                                <a
                                                    href={contact.link}
                                                    target={contact.link.startsWith('http') ? '_blank' : '_self'}
                                                    rel={contact.link.startsWith('http') ? 'noopener noreferrer' : ''}
                                                    className="text-white hover:text-cognac-200 transition-colors duration-300 flex items-center gap-1"
                                                >
                                                    {contact.value}
                                                    {contact.link.startsWith('http') && (
                                                        <ExternalLink className="w-3 h-3" />
                                                    )}
                                                </a>
                                            ) : (
                                                <p className="text-white">{contact.value}</p>
                                            )}
                                        </div>
                                    </motion.div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Social Media & Newsletter */}
                    {/* <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-xl font-bold mb-6 text-white">Stay Connected</h4> */}
                        
                        {/* Social Links */}
                        {/* <div className="flex gap-4 mb-8">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -3 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`w-12 h-12 bg-cognac-700/50 rounded-xl flex items-center justify-center text-cognac-200 hover:bg-white transition-all duration-300 ${social.color}`}
                                    title={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div> */}

                        {/* Support Hours */}
                        {/* <div className="bg-cognac-800/30 rounded-2xl p-6 border border-cognac-700/30">
                            <div className="flex items-center gap-3 mb-3">
                                <Clock className="w-5 h-5 text-cognac-300" />
                                <h5 className="font-semibold text-white">Support Hours</h5>
                            </div>
                            <p className="text-cognac-200 text-sm">
                                Monday - Saturday<br />
                                9:00 AM - 6:00 PM IST
                            </p>
                        </div> 
                    </motion.div>*/}
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-cognac-700/30">
                <div className="container-custom py-8">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 text-cognac-300"
                        >
                            <span>© {currentYear} DIIMUN. Made with</span>
                            <Heart className="w-4 h-4 text-red-400 fill-current" />
                            <span>by DNA Team</span>
                        </motion.div>
                        
                        {/* <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-6 text-sm text-cognac-300"
                        >
                            <button 
                                onClick={() => scrollToSection('#about')}
                                className="hover:text-white transition-colors duration-300"
                            >
                                Privacy Policy
                            </button>
                            <button 
                                onClick={() => scrollToSection('#about')}
                                className="hover:text-white transition-colors duration-300"
                            >
                                Terms of Service
                            </button>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                <span>500+ Participants</span>
                            </div>
                        </motion.div> */}
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button - Only show when scrolled down */}
            <AnimatePresence>
                {showScrollToTop && (
                    <motion.button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 z-50"
                    initial={{ opacity: 0, scale: 0, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        ↑
                    </motion.div>
                    </motion.button>
                )}
            </AnimatePresence>
        </footer>
    );
};

export default Footer;
