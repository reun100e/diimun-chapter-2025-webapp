import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle, Clock, Mail, Phone, MapPin } from 'lucide-react';

const FAQ = () => {
    const [openFAQ, setOpenFAQ] = useState(null);

    const faqs = [
        {
            question: "What happens after I register?",
            answer: "After registration, your payment will be verified within 24-48 hours. You'll receive a confirmation email with event details, committee assignments, and access to our free 3-day communication workshop."
        },
        {
            question: "Can I change my registration type after payment?",
            answer: "Yes, you can upgrade from MUN Only to MUN + Conference by paying the difference. However, downgrades are not possible after payment confirmation. Please contact us immediately if you need to make changes."
        },
        {
            question: "What if my payment screenshot is not clear?",
            answer: "If your payment screenshot is unclear or rejected, we'll contact you via WhatsApp or email within 24 hours. You can resubmit a clearer image through the link we'll provide."
        },
        {
            question: "Is the communication workshop really free?",
            answer: "Yes! The 3-day online workshop on 'Art of Communication' is completely free for all registered participants. It includes MUN training, debate techniques, and public speaking skills."
        },
        {
            question: "What should I bring on the event day?",
            answer: "Bring your confirmation email, a valid ID, notebook, pen, and formal attire. Lunch and refreshments will be provided. Detailed guidelines will be sent after registration confirmation."
        },
        {
            question: "Can I participate if I'm not from a medical college?",
            answer: "DIIMUN is specifically designed for homoeopathy students and professionals. While we focus on medical education, passionate individuals from related fields may contact us for special consideration."
        }
    ];

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

            </div>
        </section>
    );
};

export default FAQ;
