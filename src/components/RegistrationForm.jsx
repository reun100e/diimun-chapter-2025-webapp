import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { 
    User, Phone, Mail, GraduationCap, Calendar, CreditCard, Upload, 
    CheckCircle, AlertCircle, Loader, ChevronRight, ChevronLeft, 
    Eye, EyeOff, MapPin, Award, Star, Sparkles
} from 'lucide-react';

const RegistrationForm = () => {
    // Multi-step form state
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    
    // Form data state
    const [formData, setFormData] = useState({
        name: '',
        whatsapp: '',
        email: '',
        college: '',
        year: '',
        regType: 'MUN'
    });
    
    // File handling
    const [paymentPhoto, setPaymentPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    
    // Real-time validation state
    const [validation, setValidation] = useState({
        name: { isValid: false, message: '', touched: false },
        whatsapp: { isValid: false, message: '', touched: false },
        email: { isValid: false, message: '', touched: false },
        college: { isValid: false, message: '', touched: false },
        year: { isValid: false, message: '', touched: false }
    });
    
    const [globalError, setGlobalError] = useState('');

    // Validation rules
    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                const nameValid = value.length >= 2 && /^[a-zA-Z\s]+$/.test(value);
                return {
                    isValid: nameValid,
                    message: !nameValid && value.length > 0 
                        ? 'Name must be at least 2 characters and contain only letters' 
                        : ''
                };
            
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const emailValid = emailRegex.test(value);
                return {
                    isValid: emailValid,
                    message: !emailValid && value.length > 0 
                        ? 'Please enter a valid email address' 
                        : ''
                };
            
            case 'whatsapp':
                const phoneRegex = /^[\+]?[0-9]{10,15}$/;
                const phoneValid = phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''));
                return {
                    isValid: phoneValid,
                    message: !phoneValid && value.length > 0 
                        ? 'Please enter a valid phone number' 
                        : ''
                };
            
            case 'college':
                const collegeValid = value.length >= 3;
                return {
                    isValid: collegeValid,
                    message: !collegeValid && value.length > 0 
                        ? 'College name must be at least 3 characters' 
                        : ''
                };
            
            case 'year':
                return {
                    isValid: value !== '',
                    message: !value ? 'Please select your year of study' : ''
                };
            
            default:
                return { isValid: true, message: '' };
        }
    };

    // Real-time validation effect
    useEffect(() => {
        Object.keys(formData).forEach(field => {
            if (validation[field]?.touched) {
                const result = validateField(field, formData[field]);
                setValidation(prev => ({
                    ...prev,
                    [field]: { ...prev[field], ...result }
                }));
            }
        });
    }, [formData]);

    // Handle input changes with real-time validation
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Mark field as touched and validate
        setValidation(prev => ({
            ...prev,
            [name]: { 
                ...prev[name], 
                touched: true, 
                ...validateField(name, value) 
            }
        }));
        
        setGlobalError('');
    };

    // Handle file upload with drag & drop
    const handleFileChange = (file) => {
        if (!file) return;
        
        // Validate file type and size
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        const maxSize = 10 * 1024 * 1024; // 10MB
        
        if (!validTypes.includes(file.type)) {
            setGlobalError('Please upload a valid image file (JPG, PNG)');
            return;
        }
        
        if (file.size > maxSize) {
            setGlobalError('File size must be less than 10MB');
            return;
        }
        
        setPaymentPhoto(file);
        setGlobalError('');
        
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => setPhotoPreview(e.target.result);
        reader.readAsDataURL(file);
    };

    // Drag and drop handlers
    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files[0];
        handleFileChange(file);
    };

    // Step navigation
    const canProceedToStep = (step) => {
        switch (step) {
            case 2:
                return validation.name.isValid && validation.email.isValid && validation.whatsapp.isValid;
            case 3:
                return validation.college.isValid && validation.year.isValid;
            case 4:
                return formData.regType;
            default:
                return true;
        }
    };

    const nextStep = () => {
        if (canProceedToStep(currentStep + 1)) {
            setCurrentStep(prev => Math.min(prev + 1, 4));
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    // Form submission
    const handleSubmit = async () => {
        if (!paymentPhoto) {
            setGlobalError('Please upload your payment screenshot');
            return;
        }

        setIsSubmitting(true);
        setGlobalError('');

        try {
            // Upload photo
            const fileName = `${Date.now()}_${paymentPhoto.name}`;
            const { error: uploadError } = await supabase.storage
                .from('payment-screenshots')
                .upload(fileName, paymentPhoto);

            if (uploadError) throw uploadError;

            // Get public URL
            const { data: urlData } = supabase.storage
                .from('payment-screenshots')
                .getPublicUrl(fileName);

            // Insert registration data
            const { error: insertError } = await supabase
                .from('registrations')
                .insert([{
                    name: formData.name,
                    whatsapp_number: formData.whatsapp,
                    email: formData.email,
                    college: formData.college,
                    year: formData.year,
                    registration_type: formData.regType,
                    payment_photo_url: urlData.publicUrl,
                }]);

            if (insertError) throw insertError;

            setSuccess(true);
        } catch (error) {
            setGlobalError(`Registration failed: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Success screen
    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center max-w-2xl mx-auto relative overflow-hidden"
                >
                    {/* Success animation background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-emerald-400/5"></div>
                    
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        className="relative z-10"
                    >
                        <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                            <CheckCircle className="w-12 h-12 text-white" />
                        </div>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                                Registration Successful!
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Thank you <strong>{formData.name}</strong> for registering for DIIMUN 2025!
                            </p>
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8">
                                <p className="text-blue-800 font-medium mb-2">What happens next?</p>
                                <ul className="text-blue-700 text-left space-y-2">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        Payment verification (24-48 hours)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-blue-600" />
                                        Confirmation email with event details
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-green-600" />
                                        WhatsApp updates on your registered number
                                    </li>
                                </ul>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.location.reload()}
                                className="bg-gradient-to-r from-midnight-600 to-cognac-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Register Another Participant
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    // Step content components
    const StepIndicator = () => (
        <div className="flex items-center justify-center mb-8">
            {[1, 2, 3, 4].map((step) => (
                <React.Fragment key={step}>
                    <motion.div
                        animate={{
                            backgroundColor: currentStep >= step ? '#1e293b' : '#e2e8f0',
                            scale: currentStep === step ? 1.1 : 1
                        }}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                    >
                        {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
                    </motion.div>
                    {step < 4 && (
                        <div className={`w-16 h-1 mx-2 rounded-full ${
                            currentStep > step ? 'bg-midnight-600' : 'bg-gray-200'
                        }`} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );

    const InputField = ({ name, label, type = "text", icon: Icon, placeholder, options, ...props }) => {
        const field = validation[name];
        const hasError = field?.touched && !field?.isValid && field?.message;
        const isValid = field?.touched && field?.isValid;

        return (
            <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    {Icon && <Icon className="w-4 h-4" />}
                    {label}
                </label>
                
                {type === 'select' ? (
                    <motion.select
                        name={name}
                        value={formData[name]}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 bg-white ${
                            hasError 
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                : isValid
                                ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
                                : 'border-gray-200 focus:border-midnight-500 focus:ring-midnight-200'
                        } focus:outline-none focus:ring-2`}
                        {...props}
                    >
                        <option value="">{placeholder}</option>
                        {options?.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </motion.select>
                ) : (
                    <motion.input
                        name={name}
                        type={type}
                        value={formData[name]}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${
                            hasError 
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                : isValid
                                ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
                                : 'border-gray-200 focus:border-midnight-500 focus:ring-midnight-200'
                        } focus:outline-none focus:ring-2`}
                        {...props}
                    />
                )}
                
                <AnimatePresence>
                    {hasError && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2 text-red-600 text-sm"
                        >
                            <AlertCircle className="w-4 h-4" />
                            {field.message}
                        </motion.div>
                    )}
                    {isValid && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2 text-green-600 text-sm"
                        >
                            <CheckCircle className="w-4 h-4" />
                            Looks good!
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Personal Information</h3>
                            <p className="text-gray-600">Let's start with your basic details</p>
                        </div>
                        
                        <InputField
                            name="name"
                            label="Full Name"
                            icon={User}
                            placeholder="Enter your full name"
                            required
                        />
                        
                        <InputField
                            name="email"
                            label="Email Address"
                            type="email"
                            icon={Mail}
                            placeholder="your.email@gmail.com"
                            required
                        />
                        
                        <InputField
                            name="whatsapp"
                            label="WhatsApp Number"
                            type="tel"
                            icon={Phone}
                            placeholder="+91 94423 08824"
                            required
                        />
                    </motion.div>
                );

            case 2:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Academic Details</h3>
                            <p className="text-gray-600">Tell us about your academic background</p>
                        </div>
                        
                        <InputField
                            name="college"
                            label="College/Institution"
                            icon={GraduationCap}
                            placeholder="Your college or institution name"
                            required
                        />
                        
                        <InputField
                            name="year"
                            label="Year of Study"
                            type="select"
                            icon={Calendar}
                            placeholder="Select your year"
                            options={[
                                { value: '1st Year', label: '1st Year' },
                                { value: '2nd Year', label: '2nd Year' },
                                { value: '3rd Year', label: '3rd Year' },
                                { value: '4th Year', label: '4th Year' },
                                { value: '5th Year', label: '5th Year' },
                                { value: 'Final Year', label: 'Final Year' },
                                { value: 'Postgraduate', label: 'Postgraduate' }
                            ]}
                            required
                        />
                    </motion.div>
                );

            case 3:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Package</h3>
                            <p className="text-gray-600">Select the registration type that suits you</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    type: 'MUN',
                                    title: 'MUN Only',
                                    price: '₹500',
                                    features: ['Model United Nations Sessions', 'Certificate of Participation', 'Networking Opportunities'],
                                    popular: false
                                },
                                {
                                    type: 'MUN + Conference',
                                    title: 'MUN + Conference',
                                    price: '₹800',
                                    features: ['Everything in MUN Only', 'Medical Conference Access', 'Workshop Sessions', 'Premium Certificate'],
                                    popular: true
                                }
                            ].map((option) => (
                                <motion.div
                                    key={option.type}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setFormData(prev => ({ ...prev, regType: option.type }))}
                                    className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 ${
                                        formData.regType === option.type
                                            ? 'border-midnight-500 bg-midnight-50 shadow-lg'
                                            : 'border-gray-200 bg-white hover:border-cognac-300 hover:shadow-md'
                                    }`}
                                >
                                    {option.popular && (
                                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                            <div className="bg-gradient-to-r from-gold-500 to-yellow-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                                                <Star className="w-3 h-3" />
                                                Most Popular
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className="text-center">
                                        <h4 className="text-xl font-bold text-gray-800 mb-2">{option.title}</h4>
                                        <div className="text-3xl font-bold text-cognac-600 mb-4">{option.price}</div>
                                        <ul className="space-y-2 text-sm text-gray-600">
                                            {option.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    {formData.regType === option.type && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute top-4 right-4 w-6 h-6 bg-midnight-500 rounded-full flex items-center justify-center"
                                        >
                                            <CheckCircle className="w-4 h-4 text-white" />
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                );

            case 4:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Payment & Upload</h3>
                            <p className="text-gray-600">Complete your registration with payment proof</p>
                        </div>
                        
                        {/* Payment Instructions */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                            <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                                <CreditCard className="w-5 h-5" />
                                Payment Instructions
                            </h4>
                            <div className="space-y-3 text-blue-700">
                                <p><strong>Amount:</strong> {formData.regType === 'MUN' ? '₹500' : '₹800'}</p>
                                <p><strong>UPI ID:</strong> <code className="bg-blue-100 px-2 py-1 rounded">payment@diimun.org</code></p>
                                <p><strong>Note:</strong> Please include your name in the payment description</p>
                            </div>
                        </div>
                        
                        {/* File Upload */}
                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Upload className="w-4 h-4" />
                                Upload Payment Screenshot
                            </label>
                            
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                                    dragActive 
                                        ? 'border-midnight-400 bg-midnight-50' 
                                        : 'border-gray-300 hover:border-cognac-400 hover:bg-cognac-50'
                                }`}
                            >
                                <input
                                    type="file"
                                    id="paymentPhoto"
                                    accept="image/png,image/jpeg,image/jpg"
                                    onChange={(e) => handleFileChange(e.target.files[0])}
                                    className="hidden"
                                />
                                
                                {photoPreview ? (
                                    <div className="space-y-4">
                                        <img
                                            src={photoPreview}
                                            alt="Payment screenshot"
                                            className="max-w-xs mx-auto rounded-lg border shadow-md"
                                        />
                                        <div className="flex items-center justify-center gap-4">
                                            <button
                                                type="button"
                                                onClick={() => document.getElementById('paymentPhoto').click()}
                                                className="text-cognac-600 hover:text-cognac-700 font-medium"
                                            >
                                                Change Image
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPaymentPhoto(null);
                                                    setPhotoPreview(null);
                                                }}
                                                className="text-red-600 hover:text-red-700 font-medium"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <label htmlFor="paymentPhoto" className="cursor-pointer block">
                                        <div className="space-y-4">
                                            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cognac-100 to-gold-100 rounded-2xl flex items-center justify-center">
                                                <Upload className="w-8 h-8 text-cognac-600" />
                                            </div>
                                            <div>
                                                <p className="text-lg font-semibold text-gray-700">
                                                    Drop your payment screenshot here
                                                </p>
                                                <p className="text-gray-500">or click to browse</p>
                                                <p className="text-sm text-gray-400 mt-2">PNG, JPG up to 10MB</p>
                                            </div>
                                        </div>
                                    </label>
                                )}
                            </div>
                        </div>
                    </motion.div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-midnight-800 to-cognac-600 bg-clip-text text-transparent mb-4">
                        Join DIIMUN 2025
                    </h2>
                    <p className="text-xl text-gray-600">
                        Your journey to excellence starts here
                    </p>
                </motion.div>

                {/* Form Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden"
                >
                    <div className="p-8 md:p-12">
                        <StepIndicator />
                        
                        <AnimatePresence mode="wait">
                            {renderStepContent()}
                        </AnimatePresence>
                        
                        {/* Global Error */}
                        <AnimatePresence>
                            {globalError && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"
                                >
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                    <p className="text-red-700">{globalError}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        
                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center mt-8">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                    currentStep === 1
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                                }`}
                            >
                                <ChevronLeft className="w-5 h-5" />
                                Previous
                            </motion.button>
                            
                            {currentStep < 4 ? (
                                <motion.button
                                    whileHover={canProceedToStep(currentStep + 1) ? { scale: 1.02 } : {}}
                                    whileTap={canProceedToStep(currentStep + 1) ? { scale: 0.98 } : {}}
                                    onClick={nextStep}
                                    disabled={!canProceedToStep(currentStep + 1)}
                                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                        canProceedToStep(currentStep + 1)
                                            ? 'bg-gradient-to-r from-midnight-600 to-cognac-600 text-white shadow-lg hover:shadow-xl'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                                >
                                    Next
                                    <ChevronRight className="w-5 h-5" />
                                </motion.button>
                            ) : (
                                <motion.button
                                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || !paymentPhoto}
                                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                        isSubmitting || !paymentPhoto
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg hover:shadow-xl'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader className="w-5 h-5 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Complete Registration
                                            <Sparkles className="w-5 h-5" />
                                        </>
                                    )}
                                </motion.button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default RegistrationForm;