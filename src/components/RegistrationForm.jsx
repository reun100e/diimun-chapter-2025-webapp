import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import useDebounce from '../hooks/useDebounce';
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
        hasRegisteredEsperanza: '' // New field for Esperanza registration status
    });
    
    // Debounce the form data. The effect will only run 1.5s after the user stops typing.
    const debouncedFormData = useDebounce(formData, 1500);
    
    // File upload state
    const [munPaymentPhoto, setMunPaymentPhoto] = useState(null);
    const [munPhotoPreview, setMunPhotoPreview] = useState(null);
    const [esperanzaPaymentPhoto, setEsperanzaPaymentPhoto] = useState(null);
    const [esperanzaPhotoPreview, setEsperanzaPhotoPreview] = useState(null);
    
    // UI state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [globalError, setGlobalError] = useState('');
    const [copiedUPI, setCopiedUPI] = useState(false);
    const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

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

    // This effect runs when the debounced data changes, saving partial entries
    useEffect(() => {
        const savePartialData = async () => {
            // Only save if we have an email to use as a unique ID
            if (debouncedFormData.email) {
                setIsSaving(true);
                try {
                    const { error } = await supabase
                        .from('registrations')
                        // 'upsert' will INSERT a new row if email doesn't exist,
                        // or UPDATE the existing row if it does.
                        .upsert({
                            name: debouncedFormData.name,
                            whatsapp_number: debouncedFormData.whatsapp,
                            email: debouncedFormData.email,
                            college: debouncedFormData.college,
                            year: debouncedFormData.year,
                            has_registered_esperanza: debouncedFormData.hasRegisteredEsperanza,
                            status: 'Partial' // Explicitly set status to Partial
                        }, { onConflict: 'email' });

                    if (error) {
                        console.error('Error auto-saving partial data:', error);
                    }
                } catch (error) {
                    console.error('Error in savePartialData:', error);
                } finally {
                    setIsSaving(false);
                }
            }
        };

        savePartialData();
    }, [debouncedFormData]);

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
        const amount = formData.hasRegisteredEsperanza === 'yes' ? '649' : '899';
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
                
            case 'hasRegisteredEsperanza':
                if (!value) return 'Please select your Esperanza registration status';
                return '';
                
            default:
                return '';
        }
    };

    // File upload handler for MUN payment
    const handleMunFileChange = (e) => {
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
        
        setMunPaymentPhoto(file);
        setGlobalError('');
        
        const reader = new FileReader();
        reader.onload = (e) => setMunPhotoPreview(e.target.result);
        reader.readAsDataURL(file);
    };

    // File upload handler for Esperanza payment
    const handleEsperanzaFileChange = (e) => {
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
        
        setEsperanzaPaymentPhoto(file);
        setGlobalError('');
        
        const reader = new FileReader();
        reader.onload = (e) => setEsperanzaPhotoPreview(e.target.result);
        reader.readAsDataURL(file);
    };

    // Form validation
    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });
        
        // Validate MUN payment screenshot (always required)
        if (!munPaymentPhoto) {
            setGlobalError('Please upload your MUN payment screenshot');
            return false;
        }
        
        // Validate Esperanza payment screenshot (required only if user has registered for Esperanza)
        if (formData.hasRegisteredEsperanza === 'yes' && !esperanzaPaymentPhoto) {
            setGlobalError('Please upload your Esperanza payment screenshot for verification');
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
            // Upload MUN payment screenshot
            const munFileName = `mun_${Date.now()}_${munPaymentPhoto.name}`;
            const { error: munUploadError } = await supabase.storage
                .from('payment-screenshots')
                .upload(munFileName, munPaymentPhoto);

            if (munUploadError) throw munUploadError;

            const { data: munUrlData } = supabase.storage
                .from('payment-screenshots')
                .getPublicUrl(munFileName);

            let esperanzaUrlData = null;
            
            // Upload Esperanza payment screenshot if provided
            if (esperanzaPaymentPhoto) {
                const esperanzaFileName = `esperanza_${Date.now()}_${esperanzaPaymentPhoto.name}`;
                const { error: esperanzaUploadError } = await supabase.storage
                    .from('payment-screenshots')
                    .upload(esperanzaFileName, esperanzaPaymentPhoto);

                if (esperanzaUploadError) throw esperanzaUploadError;

                const { data: esperanzaUrl } = supabase.storage
                    .from('payment-screenshots')
                    .getPublicUrl(esperanzaFileName);
                    
                esperanzaUrlData = esperanzaUrl;
            }

            // UPDATE the final record with the photo URLs and 'Completed' status
            const { error: updateError } = await supabase
                .from('registrations')
                .update({
                    name: formData.name,
                    whatsapp_number: formData.whatsapp,
                    email: formData.email,
                    college: formData.college,
                    year: formData.year,
                    has_registered_esperanza: formData.hasRegisteredEsperanza,
                    mun_payment_photo_url: munUrlData.publicUrl,
                    esperanza_payment_photo_url: esperanzaUrlData?.publicUrl || null,
                    registration_amount: formData.hasRegisteredEsperanza === 'yes' ? 649 : 899,
                    status: 'Completed' // Mark as completed on final submission
                })
                .eq('email', formData.email); // Find the row by email to update

            if (updateError) throw updateError;

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
                        
                        {/* Step 1: Registration Type Selection */}
                        <div className="mb-6">
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-1">Choose Your Registration</h3>
                                <p className="text-sm text-gray-600">Select the option that applies to you</p>
                            </div>
                            
                            {/* Registration Options - Compact Grid */}
                            <div className="space-y-3">
                                {/* Primary Option - MUN Only */}
                                <label className={`cursor-pointer block rounded-xl border-2 p-4 transition-all duration-200 ${
                                    formData.hasRegisteredEsperanza === 'no'
                                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                }`}>
                                    <input
                                        type="radio"
                                        name="hasRegisteredEsperanza"
                                        value="no"
                                        checked={formData.hasRegisteredEsperanza === 'no'}
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <GraduationCap className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800">DIIMUN 2025 Registration</h4>
                                                <p className="text-sm text-gray-600">The one-stop shop for complete MUN experience</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-blue-600">₹899</div>
                                        </div>
                                    </div>
                                </label>

                                {/* Secondary Option - Esperanza Special Offer */}
                                <label className={`cursor-pointer block rounded-xl border-2 p-4 transition-all duration-200 ${
                                    formData.hasRegisteredEsperanza === 'yes'
                                        ? 'border-green-500 bg-green-50 shadow-lg'
                                        : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                                }`}>
                                    <input
                                        type="radio"
                                        name="hasRegisteredEsperanza"
                                        value="yes"
                                        checked={formData.hasRegisteredEsperanza === 'yes'}
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Star className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800">Esperanza Special Offer</h4>
                                                <p className="text-sm text-gray-600">For participants who have already registered for Esperanza</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-green-600">₹649</div>
                                            <p className="text-xs text-green-700 font-semibold">Save ₹250</p>
                                        </div>
                                    </div>
                                </label>
                            </div>

                            {/* Esperanza Registration Link - Compact */}
                            <div className="text-center mt-4">
                                <a 
                                    href="https://forms.gle/NNjAuwyPpEpvFyFd6" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
                                >
                                    Register for Esperanza
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>

                            {/* Info box - Only show when Esperanza option is selected */}
                            {formData.hasRegisteredEsperanza === 'yes' && (
                                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                                    <div className="flex items-start gap-2">
                                        <Info className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                        <div className="text-sm">
                                            <p className="text-green-800 font-semibold mb-1">Payment Verification Required</p>
                                            <p className="text-green-700">
                                                Upload both MUN and Esperanza payment screenshots.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
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

                        {/* Step 3: Payment */}
                        <div className="border-t border-gray-100 pt-6">
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-1">Complete Your Payment</h3>
                                <p className="text-sm text-gray-600">Secure payment via UPI</p>
                            </div>
                            
                            {/* Payment Card - Compact */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-4 md:p-6 mb-6">
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                                        <CheckCircle className="w-6 h-6 text-blue-600" />
                                    </div>
                                    
                                    <div className="text-3xl font-bold text-gray-800 mb-2">₹{formData.hasRegisteredEsperanza === 'yes' ? '649' : '899'}</div>
                                    <p className="text-sm text-gray-600 mb-4">
                                        {formData.hasRegisteredEsperanza === 'yes' ? 'MUN Registration (Esperanza Special Offer)' : 'DIIMUN 2025 Registration'}
                                    </p>
                                    
                                    {/* UPI Details - Compact */}
                                    <div className="bg-white border border-blue-200 rounded-xl p-3 mb-4">
                                        <p className="text-gray-600 text-xs mb-1">Pay to UPI ID</p>
                                        <p className="font-mono font-bold text-sm break-all text-gray-800">{upiId}</p>
                                    </div>
                                    
                                    {/* Payment Button - Compact */}
                                    <button
                                        type="button"
                                        onClick={handleUPIPayment}
                                        className={`w-full py-3 px-4 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                                            copiedUPI 
                                                ? 'bg-green-500 text-white' 
                                                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                                        }`}
                                    >
                                        {copiedUPI ? (
                                            <>
                                                <Check className="w-4 h-4" />
                                                <span>Payment App Opening...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4" />
                                                <span>Pay ₹{formData.hasRegisteredEsperanza === 'yes' ? '649' : '899'} Now</span>
                                            </>
                                        )}
                                    </button>
                                    
                                    <p className="text-gray-600 text-xs mt-3">
                                        Questions? Call <a href="tel:+919400076226" className="font-semibold text-blue-600 hover:underline">+91 9400076226</a>
                                    </p>
                                </div>
                            </div>

                            {/* File Upload Section - Compact */}
                            <div className="space-y-4">
                                <div className="text-center">
                                    <h3 className="text-lg font-bold text-gray-800 mb-1">Upload Payment Screenshot</h3>
                                    <p className="text-sm text-gray-600">Upload your payment confirmation</p>
                                </div>

                                {/* MUN Payment Upload */}
                                <div>
                                    <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                        <Upload className="w-4 h-4 text-blue-600" />
                                        MUN Payment Screenshot *
                                    </h4>                                
                                    {munPhotoPreview ? (
                                        <div className="space-y-3">
                                            <div className="relative max-w-xs mx-auto">
                                                <img
                                                    src={munPhotoPreview}
                                                    alt="MUN Payment screenshot"
                                                    className="w-full rounded-xl border-2 border-green-200 shadow-lg"
                                                />
                                                <div className="absolute top-2 right-2 bg-green-500 text-white p-1.5 rounded-full">
                                                    <CheckCircle className="w-3 h-3" />
                                                </div>
                                            </div>
                                            <div className="flex justify-center">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setMunPaymentPhoto(null);
                                                        setMunPhotoPreview(null);
                                                    }}
                                                    className="bg-red-100 text-red-700 px-3 py-1.5 rounded-lg font-medium hover:bg-red-200 transition-colors duration-200 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200">
                                            <input
                                                type="file"
                                                id="munPaymentPhoto"
                                                accept="image/png,image/jpeg,image/jpg"
                                                onChange={handleMunFileChange}
                                                className="hidden"
                                                required
                                            />
                                            <label htmlFor="munPaymentPhoto" className="cursor-pointer">
                                                <div className="space-y-3">
                                                    <div className="w-12 h-12 mx-auto bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                                                        <Upload className="w-6 h-6 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-800">Upload MUN Payment Screenshot</p>
                                                        <p className="text-xs text-gray-600 mt-1">PNG, JPG up to 10MB</p>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    )}
                                </div>

                                {/* Esperanza Payment Upload - Only show if user has registered for Esperanza */}
                                {formData.hasRegisteredEsperanza === 'yes' && (
                                    <div>
                                        <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                            <Upload className="w-4 h-4 text-green-600" />
                                            Esperanza Payment Screenshot *
                                        </h4>
                                        <p className="text-xs text-gray-600 mb-3">
                                            Please upload your Esperanza National Conference payment screenshot for verification.
                                        </p>                                
                                        {esperanzaPhotoPreview ? (
                                            <div className="space-y-3">
                                                <div className="relative max-w-xs mx-auto">
                                                    <img
                                                        src={esperanzaPhotoPreview}
                                                        alt="Esperanza Payment screenshot"
                                                        className="w-full rounded-xl border-2 border-green-200 shadow-lg"
                                                    />
                                                    <div className="absolute top-2 right-2 bg-green-500 text-white p-1.5 rounded-full">
                                                        <CheckCircle className="w-3 h-3" />
                                                    </div>
                                                </div>
                                                <div className="flex justify-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setEsperanzaPaymentPhoto(null);
                                                            setEsperanzaPhotoPreview(null);
                                                        }}
                                                        className="bg-red-100 text-red-700 px-3 py-1.5 rounded-lg font-medium hover:bg-red-200 transition-colors duration-200 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-400 hover:bg-green-50 transition-all duration-200">
                                                <input
                                                    type="file"
                                                    id="esperanzaPaymentPhoto"
                                                    accept="image/png,image/jpeg,image/jpg"
                                                    onChange={handleEsperanzaFileChange}
                                                    className="hidden"
                                                    required
                                                />
                                                <label htmlFor="esperanzaPaymentPhoto" className="cursor-pointer">
                                                    <div className="space-y-3">
                                                        <div className="w-12 h-12 mx-auto bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                                                            <Upload className="w-6 h-6 text-green-600" />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-800">Upload Esperanza Payment Screenshot</p>
                                                            <p className="text-xs text-gray-600 mt-1">PNG, JPG up to 10MB</p>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                        )}
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

                        {/* Auto-save indicator */}
                        {isSaving && (
                            <div className="mb-4 bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center gap-3">
                                <Loader className="w-4 h-4 text-blue-600 animate-spin" />
                                <p className="text-blue-700 text-sm font-medium">Auto-saving your progress...</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="border-t border-gray-100 pt-6">
                            <div className="text-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-3 px-6 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                                        isSubmitting
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transform hover:scale-[1.01]'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader className="w-4 h-4 animate-spin" />
                                            Submitting Registration...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-4 h-4" />
                                            Complete Registration
                                        </>
                                    )}
                                </button>
                                
                                <p className="text-center text-xs text-gray-500 mt-3">
                                    By registering, you agree to our terms and conditions for DIIMUN 2025
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;