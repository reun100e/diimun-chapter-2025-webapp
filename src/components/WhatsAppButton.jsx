import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, MessageSquare, PhoneCall } from 'lucide-react';

const WhatsAppButton = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [imageErrors, setImageErrors] = useState({});

    // DIIMUN Event Support Team
    const doctors = [
        {
            id: 1,
            name: "Dr. Ricky Mahadevan",
            specialty: "Event Queries",
            image: "/images/doctors/dr-ricky.jpg",
            whatsappNumber: "+919442308824",
            description: "General event information & registration"
        },
        {
            id: 2,
            name: "Dr. Aghosh B Prasad",
            specialty: "Technical Queries",
            image: "/images/doctors/dr-aghosh.jpg",
            whatsappNumber: "+919400076226",
            description: "Website, submission & technical support"
        },
        {
            id: 3,
            name: "Dr. Shriya Srinivasan",
            specialty: "Committee Queries",
            image: "/images/doctors/dr-shriya.jpg",
            whatsappNumber: "+919444477962",
            description: "Committee guidelines & procedures"
        },
        {
            id: 4,
            name: "Dr. Athith Sesha",
            specialty: "Committee Queries",
            image: "/images/doctors/dr-athith.jpg",
            whatsappNumber: "+919488546782",
            description: "Committee guidelines & procedures"
        }
    ];

    const handleWhatsAppClick = (phoneNumber) => {
        // Format phone number for WhatsApp (remove any non-numeric characters except +)
        const formattedNumber = phoneNumber.replace(/[^\d+]/g, '');
        const whatsappUrl = `https://wa.me/${formattedNumber}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleCallClick = (phoneNumber) => {
        // Format phone number for direct call
        const formattedNumber = phoneNumber.replace(/[^\d+]/g, '');
        const callUrl = `tel:${formattedNumber}`;
        window.open(callUrl, '_self');
    };

    // Debug function to check image loading
    const checkImageExists = (src) => {
        const img = new Image();
        img.onload = () => console.log(`✅ Image loaded: ${src}`);
        img.onerror = () => console.log(`❌ Image failed to load: ${src}`);
        img.src = src;
    };

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    // Debug: Check if images are loading
    useEffect(() => {
        console.log('🔍 Checking doctor images...');
        doctors.forEach(doctor => {
            console.log(`📸 Checking image: ${doctor.image}`);
            checkImageExists(doctor.image);
        });
    }, []);

    return (
        <>
            {/* WhatsApp Floating Button */}
            <div className="fixed bottom-24 right-8 z-50">
                {/* Rotating Text Around Button */}
                <div className="absolute inset-0 w-16 h-16 -left-2 -top-2 pointer-events-none z-20">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ 
                            duration: 10, 
                            repeat: Infinity, 
                            ease: "linear" 
                        }}
                        className="relative w-full h-full"
                        style={{
                            transformOrigin: 'center'
                        }}
                    >
                        {/* SVG for curved text path */}
                        <svg 
                            className="absolute inset-0 w-full h-full" 
                            viewBox="0 0 64 64"
                            style={{ overflow: 'visible' }}
                        >
                            <defs>
                                <path 
                                    id="textPath" 
                                    d="M 32,8 A 24,24 0 1,1 31.9,8 Z" 
                                    fill="none"
                                />
                                <filter id="textGlow">
                                    <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                                    <feMerge> 
                                        <feMergeNode in="coloredBlur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>
                            <motion.text
                                animate={{ rotate: 0 }}
                                transition={{ 
                                    duration: 10, 
                                    repeat: Infinity, 
                                    ease: "linear" 
                                }}
                                className="text-xs font-semibold uppercase fill-white"
                                style={{
                                    fontSize: '8px',
                                    textAnchor: 'middle',
                                    filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.8)) drop-shadow(0 0 6px rgba(0,0,0,0.6))',
                                    letterSpacing: '0.1em'
                                }}
                            >
                                <textPath href="#textPath" startOffset="0%">
                                    CONSULT A DOCTOR   CONSULT A DOCTOR 
                                </textPath>
                            </motion.text>
                        </svg>
                    </motion.div>
                </div>
                
                {/* Main Button */}
                <motion.button
                    onClick={togglePopup}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-gradient-to-r from-midnight-700 to-midnight-800 hover:from-midnight-800 hover:to-midnight-900 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 border border-midnight-600/30 relative z-30"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <MessageCircle className="w-6 h-6" />
                </motion.button>

                {/* circle slightly bigger than main button placed in the center of the button*/}
                <div className="absolute inset-0 w-16 h-16 -left-2 -top-2 pointer-events-none z-10 flex items-center justify-center">
                    <div className="w-16 h-16 scale-105 bg-gradient-to-r from-midnight-700 to-midnight-800 hover:from-midnight-800 hover:to-midnight-900 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 border border-midnight-600/30 relative z-30" />
                </div>
            </div>

            {/* Doctor Consultation Popup */}
            <AnimatePresence>
                {isPopupOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setIsPopupOpen(false);
                            }
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden mx-4"
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-midnight-800 to-midnight-900 text-white p-6 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold">Get Event Support</h3>
                                    <p className="text-midnight-200 text-sm mt-1">Contact our team for queries</p>
                                </div>
                                <button
                                    onClick={() => setIsPopupOpen(false)}
                                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Doctors Grid */}
                            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
                                <div className="grid grid-cols-2 gap-4">
                                    {doctors.map((doctor) => (
                                        <motion.div
                                            key={doctor.id}
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="bg-white rounded-2xl p-4 hover:shadow-lg border border-pearl-200 transition-all duration-300 shadow-soft cursor-pointer"
                                            onClick={() => handleWhatsAppClick(doctor.whatsappNumber)}
                                        >
                                            {/* Doctor Profile */}
                                            <div className="text-center mb-3">
                                                {/* Round Doctor Image */}
                                                <div className="w-16 h-16 bg-gradient-to-br from-midnight-100 to-midnight-200 rounded-full flex items-center justify-center overflow-hidden mx-auto mb-3">
                                                    {!imageErrors[doctor.id] ? (
                                                        <img 
                                                            src={doctor.image}
                                                            alt={`${doctor.name} - ${doctor.specialty}`}
                                                            className="w-full h-full object-cover rounded-full"
                                                            onError={(e) => {
                                                                console.log(`❌ Image failed to load: ${doctor.image}`);
                                                                setImageErrors(prev => ({ ...prev, [doctor.id]: true }));
                                                            }}
                                                            onLoad={() => {
                                                                console.log(`✅ Image loaded successfully: ${doctor.image}`);
                                                            }}
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-r from-midnight-600 to-midnight-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                            {doctor.name.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                {/* Doctor Info */}
                                                <h4 className="font-semibold text-midnight-800 text-sm leading-tight mb-1">
                                                    {doctor.name}
                                                </h4>
                                                <p className="text-xs text-cognac-600 font-medium">
                                                    {doctor.specialty}
                                                </p>
                                            </div>
                                            
                                            {/* Action Buttons */}
                                            <div className="flex gap-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleWhatsAppClick(doctor.whatsappNumber);
                                                    }}
                                                    className="flex-1 border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white text-xs font-semibold py-2.5 px-3 rounded-xl transition-all duration-200 flex items-center justify-center"
                                                >
                                                    <MessageSquare className="w-4 h-4" />
                                                </motion.button>
                                                
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleCallClick(doctor.whatsappNumber);
                                                    }}
                                                    className="flex-1 border-2 border-midnight-500 text-midnight-600 hover:bg-midnight-500 hover:text-white text-xs font-semibold py-2.5 px-3 rounded-xl transition-all duration-200 flex items-center justify-center"
                                                >
                                                    <PhoneCall className="w-4 h-4" />
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Footer Note */}
                                <div className="mt-4 p-2">
                                    <p className="text-xs text-midnight-500 text-center">
                                        Team DIIMUN 2025 | Doctors Nexus Amity
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default WhatsAppButton;
