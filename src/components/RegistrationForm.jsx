import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { 
    User, Phone, Mail, GraduationCap, Upload, 
    CheckCircle, AlertCircle, Loader, Copy, Check, 
    Star, Info, ChevronDown, ChevronUp
} from 'lucide-react';
import { smoothScrollTo } from '../animations/parallax';

const RegistrationForm = () => {
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        whatsapp: '',
        email: '',
        college: '',
        year: '',
        regType: 'MUN + Conference' // Default to best value
    });
    
    // File upload state
    const [paymentPhoto, setPaymentPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    
    // UI state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [globalError, setGlobalError] = useState('');
    const [copiedUPI, setCopiedUPI] = useState(false);
    const [yearDropdownOpen, setYearDropdownOpen] = useState(false);

    // Payment details
    const upiId = 'aghoshbprasad100@okaxis';

    // Year options for dropdown
    const yearOptions = [
        { value: '', label: 'Select your year', disabled: true },
        { value: '1st Year', label: '1st Year' },
        { value: '2nd Year', label: '2nd Year' },
        { value: '3rd Year', label: '3rd Year' },
        { value: 'Final Year', label: 'Final Year' },
        { value: 'Intern', label: 'Intern' },
        { value: 'Postgraduate', label: 'Postgraduate' }
    ];

    // Scroll to registration section when success state changes
    useEffect(() => {
        if (success) {
            // Scroll to the registration section, not the very top of the page
            const registerSection = document.getElementById('register');
            if (registerSection) {
                registerSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // Fallback: scroll to top if register section not found
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
    }, [success]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (yearDropdownOpen && !event.target.closest('.custom-year-dropdown')) {
                setYearDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [yearDropdownOpen]);

    // Copy UPI ID and open UPI app
    const handleUPIPayment = async () => {
        // First, copy the UPI ID
        try {
            await navigator.clipboard.writeText(upiId);
            setCopiedUPI(true);
            setTimeout(() => setCopiedUPI(false), 3000);
        } catch (err) {
            const textArea = document.createElement('textarea');
            textArea.value = upiId;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopiedUPI(true);
            setTimeout(() => setCopiedUPI(false), 3000);
        }

        // Then, try to open UPI app with pre-filled details
        const amount = formData.regType === 'MUN Only' ? '500' : '800';
        const transactionNote = `DIIMUN 2025 Registration - ${formData.name || 'Participant'}`;
        const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent('Aghosh B Prasad')}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
        
        // Small delay to ensure copy feedback is visible
        setTimeout(() => {
            try {
                window.location.href = upiUrl;
            } catch (error) {
                console.log('UPI app not available, UPI ID has been copied to clipboard');
            }
        }, 500);
    };

    // Custom year dropdown handler
    const handleYearSelect = (value) => {
        setFormData(prev => ({ ...prev, year: value }));
        setYearDropdownOpen(false);
        
        if (errors.year) {
            setErrors(prev => ({ ...prev, year: '' }));
        }
        setGlobalError('');
    };

    // Input change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        setGlobalError('');
        
        // If package selection changed, scroll to form
        if (name === 'regType') {
            setTimeout(() => {
                smoothScrollTo('#form-details', 100);
            }, 300);
        }
    };

    // Validation on blur
    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        if (error) {
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    // Validation function
    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                if (!value.trim()) return 'Name is required';
                if (value.length < 2) return 'Name must be at least 2 characters';
                return '';
                
            case 'email':
                if (!value.trim()) return 'Email is required';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
                return '';
                
            case 'whatsapp':
                if (!value.trim()) return 'WhatsApp number is required';
                if (!/^[\+]?[0-9]{10,15}$/.test(value.replace(/[\s\-\(\)]/g, ''))) return 'Please enter a valid phone number';
                return '';
                
            case 'college':
                if (!value.trim()) return 'College name is required';
                return '';
                
            case 'year':
                if (!value) return 'Please select your year of study';
                return '';
                
            default:
                return '';
        }
    };

    // File upload handler
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            setGlobalError('Please upload a valid image file (JPG, PNG)');
            return;
        }
        
        if (file.size > 10 * 1024 * 1024) {
            setGlobalError('File size must be less than 10MB');
            return;
        }
        
        setPaymentPhoto(file);
        setGlobalError('');
        
        const reader = new FileReader();
        reader.onload = (e) => setPhotoPreview(e.target.result);
        reader.readAsDataURL(file);
    };

    // Form validation
    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });
        
        if (!paymentPhoto) {
            setGlobalError('Please upload your payment screenshot');
            return false;
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        setGlobalError('');

        try {
            const fileName = `${Date.now()}_${paymentPhoto.name}`;
            const { error: uploadError } = await supabase.storage
                .from('payment-screenshots')
                .upload(fileName, paymentPhoto);

            if (uploadError) throw uploadError;

            const { data: urlData } = supabase.storage
                .from('payment-screenshots')
                .getPublicUrl(fileName);

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
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-lg mx-auto">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Registration Successful!</h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Thank you <strong>{formData.name}</strong> for registering for DIIMUN 2025!
                    </p>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 text-left">
                        <p className="text-blue-800 font-bold mb-3">What happens next?</p>
                        <div className="space-y-2 text-blue-700">
                            <p>• Payment verification (24-48 hours)</p>
                            <p>• Confirmation email with event details</p>
                            <p>• WhatsApp updates on your number</p>
                        </div>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-xl font-bold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg"
                    >
                        Register Another Participant
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-4 md:py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-midnight-800 to-cognac-600 bg-clip-text text-transparent mb-2">
                        Register for DIIMUN 2025
                    </h1>
                    <p className="text-gray-600">Join the premier Model United Nations experience</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
                    <div className="p-4 md:p-6 lg:p-8">
                        
                        {/* Step 1: Choose Package */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                                Choose Your Registration Package
                            </h3>
                            
                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                <label className={`cursor-pointer rounded-2xl border-2 p-6 transition-all duration-200 ${
                                    formData.regType === 'MUN Only'
                                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                }`}>
                                    <input
                                        type="radio"
                                        name="regType"
                                        value="MUN Only"
                                        checked={formData.regType === 'MUN Only'}
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                    <div className="text-center">
                                        <h4 className="font-bold text-xl text-gray-800 mb-2">MUN Only</h4>
                                        <p className="text-sm text-gray-600 mb-3">by DNA</p>
                                        <div className="text-3xl font-bold text-blue-600 mb-4">₹500</div>
                                        <ul className="text-sm text-gray-600 space-y-1 text-left">
                                            <li>• Expereicnce Model United Nations</li>
                                            <li>• Certificate from DNA</li>
                                            <li>• Free communication workshop</li>
                                        </ul>
                                    </div>
                                </label>

                                <label className={`cursor-pointer rounded-2xl border-2 p-6 transition-all duration-200 relative ${
                                    formData.regType === 'MUN + Conference'
                                        ? 'border-green-500 bg-green-50 shadow-lg'
                                        : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                                }`}>
                                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                                        <Star className="w-3 h-3" />
                                        Best Value
                                    </div>
                                    <input
                                        type="radio"
                                        name="regType"
                                        value="MUN + Conference"
                                        checked={formData.regType === 'MUN + Conference'}
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                    <div className="text-center">
                                        <h4 className="font-bold text-xl text-gray-800 mb-2">MUN + National Conference</h4>
                                        <p className="text-sm text-gray-600 mb-3">by DNA + Esperanza</p>
                                        <div className="text-3xl font-bold text-green-600 mb-2">₹800</div>
                                        <p className="text-xs text-green-700 font-semibold mb-4">Save ₹400! (Usually ₹1200)</p>
                                        <ul className="text-sm text-gray-600 space-y-1 text-left">
                                            <li>• Everything in MUN Only</li>
                                            <li>• Esperanza National Conference access</li>
                                            <li>• Premium networking opportunities</li>
                                        </ul>
                                    </div>
                                </label>
                            </div>

                            {/* Conference-only info */}
                            {/* <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                    <div className="text-sm">
                                        <p className="text-amber-800 font-semibold mb-1">National Conference Only?</p>
                                        <p className="text-amber-700">
                                            For National Conference only registration, contact{' '}
                                            <a href="tel:+919498653452" className="font-semibold text-amber-800 hover:underline">
                                                +91 9498653452
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div> */}
                        </div>

                        {/* Step 2: Personal & Academic Information */}
                        <div id="form-details" className="grid md:grid-cols-2 gap-6 mb-2">
                            {/* Personal Information */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <User className="w-5 h-5 text-blue-600" />
                                    Personal Details
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter your full name"
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-base font-medium text-gray-800 ${
                                                errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                            autoComplete="name"
                                            required
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" />
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="your.email@gmail.com"
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-base font-medium text-gray-800 ${
                                                errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                            autoComplete="email"
                                            required
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" />
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="whatsapp" className="block text-sm font-semibold text-gray-700 mb-1">
                                            WhatsApp Number *
                                        </label>
                                        <input
                                            type="tel"
                                            id="whatsapp"
                                            name="whatsapp"
                                            value={formData.whatsapp}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="+91 9400076226"
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-base font-medium text-gray-800 ${
                                                errors.whatsapp ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                            autoComplete="tel"
                                            required
                                        />
                                        {errors.whatsapp && (
                                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" />
                                                {errors.whatsapp}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Academic Information */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <GraduationCap className="w-5 h-5 text-blue-600" />
                                    Academic Details
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="college" className="block text-sm font-semibold text-gray-700 mb-1">
                                            College/Institution *
                                        </label>
                                        <input
                                            type="text"
                                            id="college"
                                            name="college"
                                            value={formData.college}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Your college or institution name"
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-base font-medium text-gray-800 ${
                                                errors.college ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                            autoComplete="organization"
                                            required
                                        />
                                        {errors.college && (
                                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" />
                                                {errors.college}
                                            </p>
                                        )}
                                    </div>

                                    <div className="relative custom-year-dropdown">
                                        <label htmlFor="year" className="block text-sm font-semibold text-gray-700 mb-1">
                                            Year of Study *
                                        </label>
                                        
                                        {/* Custom Dropdown Button */}
                                        <button
                                            type="button"
                                            onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-left flex items-center justify-between text-base font-medium ${
                                                errors.year 
                                                    ? 'border-red-300 bg-red-50' 
                                                    : yearDropdownOpen 
                                                        ? 'border-blue-500 ring-2 ring-blue-500 bg-blue-50' 
                                                        : 'border-gray-300 hover:border-gray-400 bg-white'
                                            }`}
                                        >
                                            <span className={formData.year ? 'text-gray-800' : 'text-gray-500'}>
                                                {formData.year || 'Select your year'}
                                            </span>
                                            {yearDropdownOpen ? (
                                                <ChevronUp className="w-5 h-5 text-gray-500" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-gray-500" />
                                            )}
                                        </button>

                                        {/* Custom Dropdown Menu */}
                                        {yearDropdownOpen && (
                                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
                                                {yearOptions.map((option, index) => (
                                                    <button
                                                        key={option.value}
                                                        type="button"
                                                        onClick={() => !option.disabled && handleYearSelect(option.value)}
                                                        disabled={option.disabled}
                                                        className={`w-full px-4 py-3 text-left transition-all duration-150 flex items-center justify-between text-base font-medium ${
                                                            option.disabled
                                                                ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                                                                : formData.year === option.value
                                                                    ? 'bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-500'
                                                                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                                                        } ${
                                                            index === 0 ? 'rounded-t-xl' : ''
                                                        } ${
                                                            index === yearOptions.length - 1 ? 'rounded-b-xl' : 'border-b border-gray-100'
                                                        }`}
                                                    >
                                                        <span>{option.label}</span>
                                                        {formData.year === option.value && !option.disabled && (
                                                            <CheckCircle className="w-4 h-4 text-blue-600" />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {/* Hidden input for form validation */}
                                        <input
                                            type="hidden"
                                            name="year"
                                            value={formData.year}
                                            required
                                        />
                                        
                                        {errors.year && (
                                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" />
                                                {errors.year}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 3: Payment - Compact */}
                        <div className="border-t border-gray-100 pt-8">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-blue-600" />
                                Complete Your Payment
                            </h3>
                            
                            {/* Compact Payment Card */}
                            <div className="bg-blue-50 border-2 border-blue-500 rounded-2xl p-4 md:p-6 mb-6">
                                <div className="text-center">
                                    <div className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">₹{formData.regType === 'MUN Only' ? '500' : '800'}</div>
                                    <p className="text-gray-600 mb-4 text-sm md:text-base">{formData.regType}</p>
                                    
                                    {/* UPI Details - More Compact */}
                                    <div className="bg-white border border-blue-200 rounded-xl p-3 md:p-4 mb-4">
                                        <p className="text-gray-600 text-xs md:text-sm mb-1">Pay to UPI ID</p>
                                        <p className="font-mono font-bold text-sm md:text-lg break-all text-gray-800">{upiId}</p>
                                    </div>
                                    
                                    {/* Single Action Button - Responsive */}
                                    <button
                                        type="button"
                                        onClick={handleUPIPayment}
                                        className={`w-full py-3 md:py-4 px-4 md:px-6 rounded-xl font-bold text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
                                            copiedUPI 
                                                ? 'bg-green-500 text-white' 
                                                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                                        }`}
                                    >
                                        {copiedUPI ? (
                                            <>
                                                <Check className="w-4 h-4 md:w-5 md:h-5" />
                                                <span className="text-sm md:text-base">Payment App Opening...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4 md:w-5 md:h-5" />
                                                <span className="text-sm md:text-base">Pay ₹{formData.regType === 'MUN Only' ? '500' : '800'} Now</span>
                                            </>
                                        )}
                                    </button>
                                    
                                    <p className="text-gray-600 text-xs md:text-sm mt-3">
                                        Questions? Call <a href="tel:+919400076226" className="font-semibold text-blue-600 hover:underline">+91 9400076226</a>
                                    </p>
                                </div>
                            </div>

                            {/* File Upload */}
                            <div>

                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Upload className="w-5 h-5 text-blue-600" />
                                Upload Payment Screenshot
                            </h3>                                
                                {photoPreview ? (
                                    <div className="space-y-4">
                                        <div className="relative max-w-sm mx-auto">
                                            <img
                                                src={photoPreview}
                                                alt="Payment screenshot"
                                                className="w-full rounded-xl border-2 border-green-200 shadow-lg"
                                            />
                                            <div className="absolute top-3 right-3 bg-green-500 text-white p-2 rounded-full">
                                                <CheckCircle className="w-4 h-4" />
                                            </div>
                                        </div>
                                        <div className="flex justify-center">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPaymentPhoto(null);
                                                    setPhotoPreview(null);
                                                }}
                                                className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors duration-200"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200">
                                        <input
                                            type="file"
                                            id="paymentPhoto"
                                            accept="image/png,image/jpeg,image/jpg"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            required
                                        />
                                        <label htmlFor="paymentPhoto" className="cursor-pointer">
                                            <div className="space-y-4">
                                                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                                                    <Upload className="w-8 h-8 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800 text-lg">Upload Payment Screenshot</p>
                                                    <p className="text-sm text-gray-600 mt-1">PNG, JPG up to 10MB</p>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Global Error */}
                        {globalError && (
                            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                <p className="text-red-700 font-medium">{globalError}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="border-t border-gray-100 pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                                    isSubmitting
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 shadow-xl hover:shadow-2xl transform hover:scale-[1.02]'
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader className="w-5 h-5 animate-spin" />
                                        Submitting Registration...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-5 h-5" />
                                        Complete Registration
                                    </>
                                )}
                            </button>
                            
                            <p className="text-center text-sm text-gray-500 mt-4">
                                By registering, you agree to our terms and conditions for DIIMUN 2025
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;