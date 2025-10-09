import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle, Clock, Mail, Phone, MapPin } from 'lucide-react';
import { FAQ_CONTENT, CONTACT_INFO } from '../utils/content';

const FAQ = () => {
    const [openFAQ, setOpenFAQ] = useState(null);

    // Use comprehensive FAQ content from content.js
    const faqs = FAQ_CONTENT;

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    return (
        <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    {/* <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-800 px-6 py-2 rounded-full font-semibold mb-6">
                        <HelpCircle className="w-5 h-5" />
                        Frequently Asked Questions
                    </div> */}
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-midnight-800 to-cognac-600 bg-clip-text text-transparent mb-6">
                        Got Questions?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Find answers to common questions about DIIMUN 2025 registration and participation
                    </p>
                </motion.div>

                {/* FAQ Grid */}
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                            >
                                <motion.button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                                    whileHover={{ backgroundColor: '#f8fafc' }}
                                >
                                    <span className="font-semibold text-gray-800 text-lg">
                                        {faq.question}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: openFAQ === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex-shrink-0 ml-4"
                                    >
                                        <ChevronDown className="w-6 h-6 text-gray-500" />
                                    </motion.div>
                                </motion.button>
                                
                                <AnimatePresence>
                                    {openFAQ === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-8 pb-6 text-gray-600 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Contact Information */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <div className="bg-gradient-to-r from-indigo-600 to-midnight-600 rounded-3xl p-8 text-white">
                        <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
                        <p className="text-blue-100 mb-6">
                            Contact our organizing committee for any clarifications before the day of the conference.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <motion.a
                                href={`mailto:${CONTACT_INFO.email}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-3 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl transition-all duration-300"
                            >
                                <Mail className="w-5 h-5" />
                                <span className="font-medium">{CONTACT_INFO.email}</span>
                            </motion.a>
                            <motion.a
                                href={`tel:${CONTACT_INFO.phone}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-3 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl transition-all duration-300"
                            >
                                <Phone className="w-5 h-5" />
                                <span className="font-medium">{CONTACT_INFO.phone}</span>
                            </motion.a>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default FAQ;
