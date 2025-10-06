import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import useDebounce from '../hooks/useDebounce';
import Portal from './Portal';
import {
    User, Phone, Mail, GraduationCap, Upload,
    CheckCircle, AlertCircle, Loader, Copy, Check,
    Star, Info, ChevronDown, ChevronUp, Users, Shield, Mic, Camera, FileText, Award
} from 'lucide-react';
import { smoothScrollTo } from '../animations/parallax';
import { BsPerson } from 'react-icons/bs';

const RegistrationForm = () => {
    // NEW: State to detect if the user is on an iOS device
    const [isIOS, setIsIOS] = useState(false);

    // NEW: State to manage the primary choice path ('delegate' or 'ip')
    const [registrationPath, setRegistrationPath] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        whatsapp: '',
        email: '',
        college: '',
        year: '',
        committee_preference: '', // This will now store the specific choice (WHO, Assembly, IP - Photography, IP - Essay)
        hasRegisteredEsperanza: 'no' // Default to 'no' for Esperanza registration status
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
    const [showFormIncomplete, setShowFormIncomplete] = useState(false);
    const [copiedUPI, setCopiedUPI] = useState(false);
    const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const dropdownRef = useRef(null);
    const dropdownMenuRef = useRef(null);

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
        { value: 'Postgraduate', label: 'Postgraduate' },
        { value: 'Doctor / Practitioner', label: 'Doctor / Practitioner' },
        { value: 'Staff (Asst./Assoc./Prof.)', label: 'Staff (Asst./Assoc./Prof.)' }
    ];

    // iOS Detection - Run once when component mounts (for instruction text only)
    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        // Check for iPhone, iPad, or iPod
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            setIsIOS(true);
        }
    }, []);

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
                            committee_preference: debouncedFormData.committee_preference,
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

    // Calculate dropdown position when opened
    useEffect(() => {
        if (yearDropdownOpen && dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
            });
        }
    }, [yearDropdownOpen]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is outside BOTH the trigger and the menu
            if (
                yearDropdownOpen &&
                !dropdownRef.current?.contains(event.target) &&
                !dropdownMenuRef.current?.contains(event.target)
            ) {
                setYearDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [yearDropdownOpen]);

    // NEW: Handle primary path selection (Delegate vs IP)
    const handlePathChange = (path) => {
        setRegistrationPath(path);
        // Reset the specific preference when the main path changes
        setFormData(prev => ({ ...prev, committee_preference: '' }));
        // Clear any existing errors
        setErrors(prev => ({ ...prev, committee_preference: '' }));
        setGlobalError('');

        // Scroll to the next step after a short delay to allow state update
        setTimeout(() => {
            const nextStep = document.querySelector('[data-step="2"]');
            if (nextStep) {
                const elementTop = nextStep.offsetTop;
                const offsetPosition = elementTop - 100; // 100px offset to account for navbar

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    };

    // NEW: Handle specific preference selection within the chosen path
    const handlePreferenceChange = (preference) => {
        setFormData(prev => ({ ...prev, committee_preference: preference }));
        // Clear any existing errors
        if (errors.committee_preference) {
            setErrors(prev => ({ ...prev, committee_preference: '' }));
        }
        setGlobalError('');

        // Scroll to the next step after a short delay to allow state update
        setTimeout(() => {
            const nextStep = document.querySelector('[data-step="3"]');
            if (nextStep) {
                const elementTop = nextStep.offsetTop;
                const offsetPosition = elementTop - 100; // 100px offset to account for navbar

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    };

    // Copy UPI ID helper function
    const copyUPI = async () => {
        try {
            await navigator.clipboard.writeText(upiId);
            setCopiedUPI(true);
            setTimeout(() => setCopiedUPI(false), 3000);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = upiId;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopiedUPI(true);
            setTimeout(() => setCopiedUPI(false), 3000);
        }
    };

    // Updated handleUPIPayment for non-iOS devices
    const handleUPIPayment = () => {
        copyUPI(); // Still copy the ID first
        const amount = formData.hasRegisteredEsperanza === 'yes' ? '347' : '499';
        const transactionNote = `DIIMUN 2025 Registration - ${formData.name || 'Participant'}`;
        const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent('Aghosh B Prasad')}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
        
        setTimeout(() => {
            window.location.href = upiUrl;
        }, 500);
    };

    // Custom year dropdown handler
    const handleYearSelect = (value) => {
        setFormData(prev => ({
            ...prev,
            year: value,
            // Auto-set college to 'Not applicable' for Doctor/Practitioner if left blank
            // Clear 'Not applicable' if changing away from Doctor/Practitioner
            college: value === 'Doctor / Practitioner' 
                ? (!prev.college ? 'Not applicable' : prev.college)
                : (prev.college === 'Not applicable' ? '' : prev.college)
        }));
        setYearDropdownOpen(false);

        if (errors.year) {
            setErrors(prev => ({ ...prev, year: '' }));
        }
        if (errors.college) {
            setErrors(prev => ({ ...prev, college: '' }));
        }
        setGlobalError('');
    };

    // Input change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Auto-set college to 'Not applicable' for Doctor/Practitioner if left blank
        // Clear 'Not applicable' if changing away from Doctor/Practitioner
        if (name === 'year') {
            if (value === 'Doctor / Practitioner') {
                setFormData(prev => ({ ...prev, college: prev.college || 'Not applicable' }));
            } else if (formData.college === 'Not applicable') {
                setFormData(prev => ({ ...prev, college: '' }));
            }
        }

        // Scroll to upload section when Esperanza option is selected
        if (name === 'hasRegisteredEsperanza' && value === 'yes') {
            setTimeout(() => {
                const uploadStep = document.querySelector('[data-step="5"]');
                if (uploadStep) {
                    const elementTop = uploadStep.offsetTop;
                    const offsetPosition = elementTop - 100; // 100px offset to account for navbar

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }

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
                // College is optional for Doctor/Practitioner
                if (formData.year === 'Doctor / Practitioner') return '';
                if (!value.trim()) return 'College name is required';
                return '';

            case 'year':
                if (!value) return 'Please select your year of study';
                return '';

            case 'hasRegisteredEsperanza':
                // This field is optional - users can choose not to select Esperanza discount
                return '';

            case 'committee_preference':
                if (!value) return 'Please select your committee or International Press role';
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

    // Check if form is ready for submission
    const isFormReady = () => {
        // Check registration path
        if (!registrationPath) return false;
        
        // Check committee preference
        if (!formData.committee_preference) return false;
        
        // Check required personal fields
        const requiredFields = ['name', 'email', 'whatsapp', 'year'];
        for (const field of requiredFields) {
            if (!formData[field] || formData[field].trim() === '') return false;
        }
        
        // Check college (required unless Doctor/Practitioner)
        if (formData.year !== 'Doctor / Practitioner' && (!formData.college || formData.college.trim() === '')) return false;
        
        // Check MUN payment screenshot
        if (!munPaymentPhoto) return false;
        
        // Check Esperanza payment screenshot if required
        if (formData.hasRegisteredEsperanza === 'yes' && !esperanzaPaymentPhoto) return false;
        
        return true;
    };

    // Get the next pending step
    const getNextPendingStep = () => {
        if (!registrationPath) return 'Select Your Role';
        if (!formData.committee_preference) return 'Choose Committee';
        if (!formData.name || formData.name.trim() === '') return 'Enter Personal Details';
        if (!formData.email || formData.email.trim() === '') return 'Enter Personal Details';
        if (!formData.whatsapp || formData.whatsapp.trim() === '') return 'Enter Personal Details';
        if (!formData.year || formData.year.trim() === '') return 'Enter Personal Details';
        if (formData.year !== 'Doctor / Practitioner' && (!formData.college || formData.college.trim() === '')) return 'Enter Personal Details';
        if (!munPaymentPhoto) return 'Upload Payment Screenshot';
        if (formData.hasRegisteredEsperanza === 'yes' && !esperanzaPaymentPhoto) return 'Upload Esperanza Screenshot';
        return 'Complete Registration';
    };

    // Hide form incomplete message when form becomes ready
    useEffect(() => {
        if (isFormReady() && showFormIncomplete) {
            setShowFormIncomplete(false);
        }
    }, [isFormReady, showFormIncomplete]);

    // Form validation
    const validateForm = () => {
        const newErrors = {};
        const missingFields = [];
        
        // Check each required field
        Object.keys(formData).forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
                missingFields.push(field);
            }
        });

        // Check for missing registration path
        if (!registrationPath) {
            setGlobalError('Please select your role (Delegate or International Press) in Step 1');
            setTimeout(() => {
                const step1 = document.querySelector('[data-step="1"]');
                if (step1) {
                    step1.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
            return false;
        }

        // Check for missing committee preference
        if (!formData.committee_preference) {
            setGlobalError('Please select your committee or International Press role in Step 2');
            setTimeout(() => {
                const step2 = document.querySelector('[data-step="2"]');
                if (step2) {
                    step2.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
            return false;
        }

        // Check for missing personal information
        if (missingFields.length > 0) {
            const fieldNames = {
                name: 'Full Name',
                email: 'Email Address',
                whatsapp: 'WhatsApp Number',
                college: 'College/Institution',
                year: 'Year of Study'
            };
            
            const missingFieldNames = missingFields.map(field => fieldNames[field] || field).join(', ');
            setGlobalError(`Please fill in the following required fields: ${missingFieldNames}`);
            
            // Scroll to first missing field
            setTimeout(() => {
                const firstErrorField = document.querySelector(`[name="${missingFields[0]}"]`);
                if (firstErrorField) {
                    firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstErrorField.focus();
                } else {
                    const step3 = document.querySelector('[data-step="3"]');
                    if (step3) {
                        step3.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            }, 100);
            return false;
        }

        // Validate MUN payment screenshot (always required)
        if (!munPaymentPhoto) {
            setGlobalError('Please upload your MUN payment screenshot in Step 5');
            setTimeout(() => {
                const step5 = document.querySelector('[data-step="5"]');
                if (step5) {
                    step5.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
            return false;
        }

        // Validate Esperanza payment screenshot (required only if user has registered for Esperanza)
        if (formData.hasRegisteredEsperanza === 'yes' && !esperanzaPaymentPhoto) {
            setGlobalError('Please upload your Esperanza payment screenshot for verification in Step 5');
            setTimeout(() => {
                const step5 = document.querySelector('[data-step="5"]');
                if (step5) {
                    step5.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
            return false;
        }

        setErrors(newErrors);
        setGlobalError(''); // Clear any previous global errors
        return true;
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // If form is not ready, show the incomplete message
        if (!isFormReady()) {
            setShowFormIncomplete(true);
            return;
        }

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
                    committee_preference: formData.committee_preference,
                    has_registered_esperanza: formData.hasRegisteredEsperanza,
                    mun_payment_photo_url: munUrlData.publicUrl,
                    esperanza_payment_photo_url: esperanzaUrlData?.publicUrl || null,
                    registration_amount: formData.hasRegisteredEsperanza === 'yes' ? 347 : 499,
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 md:py-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-midnight-800 to-cognac-600 bg-clip-text text-transparent mb-4">
                        Register for DIIMUN 2025
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Join the premier Model United Nations experience and shape the future of global diplomacy
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* STEP 1: CHOOSE YOUR ROLE - This is the new primary fork */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden" data-step="1">
                        <div className="bg-gradient-to-r from-gray-700 to-gray-900 px-8 py-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                    <Award className="w-5 h-5 text-white" />
                                </div>
                                Step 1: Choose Your Role
                            </h2>
                            <p className="text-gray-300 mt-2">Are you participating as a Delegate or as International Press?</p>
                        </div>
                        <div className="p-8 grid md:grid-cols-2 gap-6">
                            {/* Delegate Path */}
                            <div
                                onClick={() => handlePathChange('delegate')}
                                className={`cursor-pointer rounded-2xl border-4 p-6 text-center transition-all duration-300 hover:scale-[1.02] ${registrationPath === 'delegate'
                                        ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 scale-105 shadow-2xl ring-4 ring-blue-100'
                                        : 'border-gray-200 hover:border-blue-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50'
                                    }`}
                            >
                                <BsPerson className="w-12 h-12 mx-auto text-blue-500 mb-4" />
                                <h3 className="text-xl font-bold text-gray-800">Register as a Delegate</h3>
                                <p className="text-gray-600 mt-1">Participate in WHO or The Assembly of Homoeopathy.</p>
                            </div>
                            {/* IP Path */}
                            <div
                                onClick={() => handlePathChange('ip')}
                                className={`cursor-pointer rounded-2xl border-4 p-6 text-center transition-all duration-300 hover:scale-[1.02] ${registrationPath === 'ip'
                                        ? 'border-teal-500 bg-gradient-to-r from-teal-50 to-cyan-50 scale-105 shadow-2xl ring-4 ring-teal-100'
                                        : 'border-gray-200 hover:border-teal-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-teal-50'
                                    }`}
                            >
                                <Camera className="w-12 h-12 mx-auto text-teal-500 mb-4" />
                                <h3 className="text-xl font-bold text-gray-800">Join International Press</h3>
                                <p className="text-gray-600 mt-1">Participate as a Photographer or Essayist.</p>
                            </div>
                        </div>
                    </div>

                    {/* This entire block will only appear AFTER a path is chosen */}
                    {registrationPath && (
                        <>
                            {/* STEP 2: CHOOSE YOUR COMMITTEE/ROLE */}
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden" data-step="2">
                                <div className={`bg-gradient-to-r ${registrationPath === 'delegate' ? 'from-blue-600 to-indigo-600' : 'from-teal-600 to-cyan-600'} px-8 py-6`}>
                                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                            {registrationPath === 'delegate' ? <Shield className="w-5 h-5 text-white" /> : <Camera className="w-5 h-5 text-white" />}
                                        </div>
                                        Step 2: Select Your Preference
                                    </h2>
                                    <p className="text-white/80 mt-2">
                                        {registrationPath === 'delegate'
                                            ? 'Choose your committee for the debate sessions'
                                            : 'Choose your role in the International Press'
                                        }
                                    </p>
                                </div>
                                <div className="p-8 space-y-4">
                                    {/* CONDITIONAL: Delegate Options */}
                                    {registrationPath === 'delegate' && (
                                        <>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            {/* WHO Committee */}
                                            <div
                                                onClick={() => handlePreferenceChange('WHO')}
                                                className={`group cursor-pointer relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 ${formData.committee_preference === 'WHO'
                                                        ? 'ring-4 ring-green-400 scale-105 shadow-green-200'
                                                        : 'hover:scale-105'
                                                    }`}
                                            >
                                                {/* Background Image */}
                                                <div className="absolute inset-0 opacity-15 group-hover:opacity-20 transition-opacity duration-500">
                                                    <img 
                                                        src="/images/World Health Organissation.webp" 
                                                        alt="WHO Background" 
                                                        className="w-full h-full object-cover filter"
                                                    />
                                                </div>

                                                {/* Gradient Overlay */}
                                                <div className={`absolute inset-0 bg-gradient-to-br opacity-80 group-hover:opacity-60 transition-all duration-500 ${
                                                    formData.committee_preference === 'WHO'
                                                        ? 'from-blue-900/80 via-blue-800/70 to-blue-900/80'
                                                        : 'from-midnight-900/80 via-midnight-800/70 to-midnight-900/80 group-hover:from-midnight-900/60 group-hover:via-midnight-800/50 group-hover:to-midnight-900/60'
                                                }`}></div>

                                                {/* Content */}
                                                <div className="relative z-10 p-8 text-white min-h-[50px] flex flex-col justify-between">
                                                    {/* Header */}
                                                    <div>
                                                        {/* Committee Type Badge */}
                                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 bg-midnight-600/90 text-white backdrop-blur-sm">
                                                            <Users className="w-4 h-4" />
                                                            General Committee
                                                        </div>

                                                        {/* Title */}
                                                        <h4 className="text-2xl font-bold mb-6 leading-tight group-hover:text-white transition-colors duration-300">
                                                            World Health Organization (WHO)
                                                        </h4>
                                                    </div>

                                                    {/* Footer */}
                                                    <div className="border-t border-white/20 pt-4">
                                                        <p className="text-gray-200 text-sm font-medium">Team of 2</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Assembly of Homoeopathy */}
                                            <div
                                                onClick={() => handlePreferenceChange('The Assembly of Homoeopathy')}
                                                className={`group cursor-pointer relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 ${formData.committee_preference === 'The Assembly of Homoeopathy'
                                                        ? 'ring-4 ring-green-400 scale-105 shadow-green-200'
                                                        : 'hover:scale-105'
                                                    }`}
                                            >
                                                {/* Background Image */}
                                                <div className="absolute inset-0 opacity-15 group-hover:opacity-20 transition-opacity duration-500">
                                                    <img 
                                                        src="/images/The Great Homoeopathic Assembly.jpg" 
                                                        alt="Great Homoeopathic Assembly Background" 
                                                        className="w-full h-full object-cover filter"
                                                    />
                                                </div>

                                                {/* Gradient Overlay */}
                                                <div className={`absolute inset-0 bg-gradient-to-br opacity-80 group-hover:opacity-60 transition-all duration-500 ${
                                                    formData.committee_preference === 'The Assembly of Homoeopathy'
                                                        ? 'from-cognac-900/80 via-cognac-800/70 to-cognac-900/80'
                                                        : 'from-cognac-900/80 via-cognac-800/70 to-cognac-900/80 group-hover:from-cognac-900/60 group-hover:via-cognac-800/50 group-hover:to-cognac-900/60'
                                                }`}></div>

                                                {/* Content */}
                                                <div className="relative z-10 p-8 text-white min-h-[300px] flex flex-col justify-between">
                                                    {/* Header */}
                                                    <div>
                                                        {/* Committee Type Badge */}
                                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 bg-cognac-600/90 text-white backdrop-blur-sm">
                                                            <Award className="w-4 h-4" />
                                                            Exclusive Committee
                                                        </div>

                                                        {/* Title */}
                                                        <h4 className="text-2xl font-bold mb-6 leading-tight group-hover:text-white transition-colors duration-300">
                                                            The Great Homoeopathic Assembly
                                                        </h4>
                                                    </div>

                                                    {/* Footer */}
                                                    <div className="border-t border-white/20 pt-4">
                                                        <p className="text-gray-200 mb-2 text-sm font-medium">Team of 2</p>
                                                        <div className="bg-yellow-100/20 border border-yellow-300/30 text-yellow-200 p-3 rounded-lg text-xs leading-relaxed">
                                                            <strong>Note:</strong> Limited slots. Allotment on first come first serve basis. Excess registrations will be automatically allotted to WHO.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Common Team Information */}
                                        <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                                            <div className="flex items-start gap-3">
                                                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-blue-800 font-semibold mb-1">Team Registration Process</p>
                                                    <p className="text-blue-700 text-sm">
                                                        Team details will be collected later in the WhatsApp group after each member registers individually.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        </>
                                    )}
                                    {/* CONDITIONAL: International Press Options */}
                                    {registrationPath === 'ip' && (
                                        <>
                                            <div
                                                onClick={() => handlePreferenceChange('IP - Photography')}
                                                className={`cursor-pointer flex items-start gap-3 rounded-2xl border-2 p-4 transition-all duration-300 hover:scale-[1.02] ${formData.committee_preference === 'IP - Photography'
                                                        ? 'border-teal-500 bg-gradient-to-r from-teal-50 to-cyan-50 shadow-xl ring-4 ring-teal-100'
                                                        : 'border-gray-200 hover:border-teal-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-teal-50'
                                                    }`}
                                            >
                                                <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <Camera className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-gray-800">International Press - Photographer</h4>
                                                    <p className="text-gray-600 font-medium">Individual Participation</p>
                                                    <p className="text-sm text-gray-500 mt-1">Capture the moments of the conference. Award for Best Photographer (₹1000).</p>
                                                </div>
                                            </div>
                                            <div
                                                onClick={() => handlePreferenceChange('IP - Essay')}
                                                className={`cursor-pointer flex items-start gap-3 rounded-2xl border-2 p-4 transition-all duration-300 hover:scale-[1.02] ${formData.committee_preference === 'IP - Essay'
                                                        ? 'border-cyan-500 bg-gradient-to-r from-cyan-50 to-blue-50 shadow-xl ring-4 ring-cyan-100'
                                                        : 'border-gray-200 hover:border-cyan-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-cyan-50'
                                                    }`}
                                            >
                                                <div className="w-10 h-10 bg-cyan-100 text-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <FileText className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-gray-800">International Press - Essayist</h4>
                                                    <p className="text-gray-600 font-medium">Individual Participation</p>
                                                    <p className="text-sm text-gray-500 mt-1">Report on the proceedings and debates. Award for Best Writeup (₹1000).</p>
                                                </div>
                                            </div>
                                            <div className="mt-4 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                                                <div className="flex items-start gap-3">
                                                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="text-blue-800 font-semibold mb-1">Want to do both Photography and Essay?</p>
                                                        <p className="text-blue-700 text-sm">
                                                            Complete this registration for one role, then submit a new form for the other role. Each role requires separate registration.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                {errors.committee_preference && (
                                    <div className="px-8 pb-4">
                                        <p className="text-sm text-red-600 flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.committee_preference}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Step 3: Personal & Academic Information */}
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden" data-step="3">
                                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                            <User className="w-5 h-5 text-white" />
                                        </div>
                                        Step 3: Personal & Academic Information
                                    </h2>
                                    <p className="text-blue-100 mt-2">Tell us about yourself</p>
                                </div>

                                <div className="p-8">
                                    <div className="grid md:grid-cols-2 gap-8 overflow-visible">
                                        {/* Personal Information */}
                                        <div className="space-y-6 overflow-visible">
                                            <div className="border-l-4 border-blue-500 pl-4">
                                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Details</h3>
                                                <div className="space-y-5">
                                                    <div>
                                                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
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
                                                            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200 text-base font-medium text-gray-800 bg-gray-50 hover:bg-white ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                                                }`}
                                                            autoComplete="name"
                                                            required
                                                        />
                                                        {errors.name && (
                                                            <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                                                                <AlertCircle className="w-4 h-4" />
                                                                {errors.name}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
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
                                                            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200 text-base font-medium text-gray-800 bg-gray-50 hover:bg-white ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                                                }`}
                                                            autoComplete="email"
                                                            required
                                                        />
                                                        {errors.email && (
                                                            <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                                                                <AlertCircle className="w-4 h-4" />
                                                                {errors.email}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label htmlFor="whatsapp" className="block text-sm font-semibold text-gray-700 mb-2">
                                                            WhatsApp Number *
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            id="whatsapp"
                                                            name="whatsapp"
                                                            value={formData.whatsapp}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            // placeholder="+91 9400076226"
                                                            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200 text-base font-medium text-gray-800 bg-gray-50 hover:bg-white ${errors.whatsapp ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                                                }`}
                                                            autoComplete="tel"
                                                            required
                                                        />
                                                        {errors.whatsapp && (
                                                            <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                                                                <AlertCircle className="w-4 h-4" />
                                                                {errors.whatsapp}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Academic Information */}
                                        <div className="space-y-6 overflow-visible">
                                            <div className="border-l-4 border-indigo-500 pl-4">
                                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Details</h3>
                                                <div className="space-y-5">
                                                    <div className="relative custom-year-dropdown z-10">
                                                        <label htmlFor="year" className="block text-sm font-semibold text-gray-700 mb-2">
                                                            Year of Study *
                                                        </label>

                                                        {/* Custom Dropdown Button */}
                                                        <button
                                                            ref={dropdownRef}
                                                            type="button"
                                                            onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
                                                            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200 text-left flex items-center justify-between text-base font-medium bg-gray-50 hover:bg-white ${errors.year
                                                                    ? 'border-red-300 bg-red-50'
                                                                    : yearDropdownOpen
                                                                        ? 'border-blue-500 ring-4 ring-blue-100 bg-white'
                                                                        : 'border-gray-200 hover:border-gray-300'
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

                                                        {/* Custom Dropdown Menu with Portal */}
                                                        {yearDropdownOpen && (
                                                            <Portal>
                                                                <div
                                                                    ref={dropdownMenuRef}
                                                                    className="absolute bg-white border-2 border-gray-200 rounded-xl shadow-2xl z-[9999] max-h-72 overflow-y-auto"
                                                                    style={{
                                                                        top: `${dropdownPosition.top}px`,
                                                                        left: `${dropdownPosition.left}px`,
                                                                        width: `${dropdownPosition.width}px`,
                                                                        marginTop: '0.25rem', // This was your mt-1
                                                                    }}
                                                                >
                                                                    {yearOptions.map((option, index) => (
                                                                        <button
                                                                            key={option.value}
                                                                            type="button"
                                                                            onClick={() => !option.disabled && handleYearSelect(option.value)}
                                                                            disabled={option.disabled}
                                                                            className={`w-full px-4 py-3 text-left transition-all duration-150 flex items-center justify-between text-base font-medium ${option.disabled
                                                                                    ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                                                                                    : formData.year === option.value
                                                                                        ? 'bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-500'
                                                                                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                                                                                } ${index === 0 ? 'rounded-t-xl' : ''
                                                                                } ${index === yearOptions.length - 1 ? 'rounded-b-xl' : 'border-b border-gray-100'
                                                                                }`}
                                                                        >
                                                                            <span>{option.label}</span>
                                                                            {formData.year === option.value && !option.disabled && (
                                                                                <CheckCircle className="w-4 h-4 text-blue-600" />
                                                                            )}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </Portal>
                                                        )}

                                                        {/* Hidden input for form validation */}
                                                        <input
                                                            type="hidden"
                                                            name="year"
                                                            value={formData.year}
                                                            required
                                                        />

                                                        {errors.year && (
                                                            <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                                                                <AlertCircle className="w-4 h-4" />
                                                                {errors.year}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label htmlFor="college" className="block text-sm font-semibold text-gray-700 mb-2">
                                                            College/Institution {formData.year === 'Doctor / Practitioner' ? '' : '*'}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="college"
                                                            name="college"
                                                            value={formData.college}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            placeholder={formData.year === 'Doctor / Practitioner' ? 'Not applicable' : 'Your college or institution name'}
                                                            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200 text-base font-medium text-gray-800 bg-gray-50 hover:bg-white ${errors.college ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                                                }`}
                                                            autoComplete="organization"
                                                            required={formData.year !== 'Doctor / Practitioner'}
                                                        />
                                                        {errors.college && (
                                                            <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                                                                <AlertCircle className="w-4 h-4" />
                                                                {errors.college}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* Step 4: Payment */}
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden" data-step="4">
                                <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
                                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                            <CheckCircle className="w-5 h-5 text-white" />
                                        </div>
                                        Step 4: Complete Your Payment
                                    </h2>
                                    <p className="text-purple-100 mt-2">Secure payment via UPI</p>
                                </div>

                                <div className="p-8">
                                    {/* Esperanza Discount Option - Subtle */}
                                    <div className="mb-4 text-center">
                                        <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
                                            <input
                                                type="checkbox"
                                                id="esperanzaDiscount"
                                                checked={formData.hasRegisteredEsperanza === 'yes'}
                                                onChange={(e) => {
                                                    setFormData(prev => ({ 
                                                        ...prev, 
                                                        hasRegisteredEsperanza: e.target.checked ? 'yes' : 'no' 
                                                    }));
                                                    setGlobalError('');
                                                }}
                                                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                            />
                                            <label htmlFor="esperanzaDiscount" className="cursor-pointer">
                                                Registered for Esperanza 4.0? 
                                                <span className="text-green-600 font-medium"> Get ₹152 off</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Payment Card */}
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
                                        <div className="text-center">
                                            <div className="text-4xl font-bold text-gray-800 mb-2">₹{formData.hasRegisteredEsperanza === 'yes' ? '347' : '499'}</div>
                                            <p className="text-gray-600 mb-6">
                                                {formData.hasRegisteredEsperanza === 'yes' ? 'DIIMUN 2025 Registration (Esperanza Special Offer)' : 'DIIMUN 2025 Registration'}
                                            </p>

                                            {/* ====== UNIVERSAL PAYMENT UI ====== */}
                                            <div className="space-y-6">
                                                {/* QR Code Section */}
                                                <div className="space-y-4">
                                                    <div className="flex justify-center">
                                                        <img src="/upi-qrcode.jpg" alt="UPI QR Code" className="w-48 h-48 rounded-lg border-4 border-white shadow-lg" />
                                                    </div>
                                                    {isIOS ? (
                                                        <p className="text-sm text-gray-600 text-center">
                                                            Tap and hold the QR code to pay, or scan it with your camera.
                                                        </p>
                                                    ) : (
                                                        <p className="text-sm text-gray-600 text-center">
                                                            Scan the QR code with your payment app or use the button below.
                                                        </p>
                                                    )}
                                                </div>

                                                {/* UPI ID Display */}
                                                <div className="bg-white border-2 border-blue-200 rounded-xl p-4">
                                                    <p className="text-gray-600 text-sm mb-2">Pay to UPI ID</p>
                                                    <p className="font-mono font-bold text-base break-all text-gray-800">{upiId}</p>
                                                </div>

                                                {/* Pay Now Button */}
                                                <button
                                                    type="button"
                                                    onClick={handleUPIPayment}
                                                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl ${
                                                        copiedUPI 
                                                            ? 'bg-green-500 text-white' 
                                                            : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                                                    }`}
                                                >
                                                    {copiedUPI ? (
                                                        <>
                                                            <Check className="w-5 h-5" />
                                                            <span>Payment App Opening...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy className="w-5 h-5" />
                                                            <span>Pay ₹{formData.hasRegisteredEsperanza === 'yes' ? '347' : '499'} Now</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                            {/* ====== END UNIVERSAL UI ====== */}

                                            <p className="text-gray-600 text-sm mt-4">
                                                Questions? Call <a href="tel:+919400076226" className="font-semibold text-blue-600 hover:underline">+91 9400076226</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 5: Upload Payment Confirmation Screenshot */}
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden" data-step="5">
                                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
                                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                            <Upload className="w-5 h-5 text-white" />
                                        </div>
                                        Step 5: Upload Payment Confirmation Screenshot
                                    </h2>
                                    <p className="text-green-100 mt-2">Upload your payment confirmation to complete registration</p>
                                </div>

                                <div className="p-8">
                                    {/* Upload Section */}
                                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6">

                                        {/* MUN Payment Upload */}
                                        <div className="mb-6">
                                            {munPhotoPreview ? (
                                                <div className="space-y-4">
                                                    <div className="relative max-w-sm mx-auto">
                                                        <img
                                                            src={munPhotoPreview}
                                                            alt="MUN Payment screenshot"
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
                                                                setMunPaymentPhoto(null);
                                                                setMunPhotoPreview(null);
                                                            }}
                                                            className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors duration-200"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200">
                                                    <input
                                                        type="file"
                                                        id="munPaymentPhoto"
                                                        accept="image/png,image/jpeg,image/jpg"
                                                        onChange={handleMunFileChange}
                                                        className="hidden"
                                                        required
                                                    />
                                                    <label htmlFor="munPaymentPhoto" className="cursor-pointer">
                                                        <div className="space-y-4">
                                                            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                                                                <Upload className="w-8 h-8 text-blue-600" />
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold text-gray-800 text-lg">Upload MUN Payment Screenshot</p>
                                                                <p className="text-gray-600 mt-1">PNG, JPG up to 10MB</p>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                            )}
                                        </div>

                                        {/* Esperanza Payment Upload - Only show if user has registered for Esperanza */}
                                        {formData.hasRegisteredEsperanza === 'yes' && (
                                            <div className="mb-6">
                                                {esperanzaPhotoPreview ? (
                                                    <div className="space-y-4">
                                                        <div className="relative max-w-sm mx-auto">
                                                            <img
                                                                src={esperanzaPhotoPreview}
                                                                alt="Esperanza Payment screenshot"
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
                                                                    setEsperanzaPaymentPhoto(null);
                                                                    setEsperanzaPhotoPreview(null);
                                                                }}
                                                                className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors duration-200"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 hover:bg-green-50 transition-all duration-200">
                                                        <input
                                                            type="file"
                                                            id="esperanzaPaymentPhoto"
                                                            accept="image/png,image/jpeg,image/jpg"
                                                            onChange={handleEsperanzaFileChange}
                                                            className="hidden"
                                                            required
                                                        />
                                                        <label htmlFor="esperanzaPaymentPhoto" className="cursor-pointer">
                                                            <div className="space-y-4">
                                                                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                                                                    <Upload className="w-8 h-8 text-green-600" />
                                                                </div>
                                                                <div>
                                                                    <p className="font-semibold text-gray-800 text-lg">Upload Esperanza Payment Screenshot</p>
                                                                    <p className="text-gray-600 mt-1">PNG, JPG up to 10MB</p>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !isFormReady()}
                                            className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
                                                isSubmitting || !isFormReady()
                                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                    : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 transform hover:scale-[1.02] hover:shadow-xl'
                                            }`}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader className="w-5 h-5 animate-spin" />
                                                    Submitting Registration...
                                                </>
                                            ) : !isFormReady() ? (
                                                <>
                                                    <AlertCircle className="w-5 h-5" />
                                                    {getNextPendingStep()}
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle className="w-5 h-5" />
                                                    Complete Registration
                                                </>
                                            )}
                                        </button>

                                        {/* Form Status Indicator - Only show when user tries to submit incomplete form */}
                                        {showFormIncomplete && !isFormReady() && !isSubmitting && (
                                            <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                                                <div className="flex items-start gap-3">
                                                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="text-yellow-800 font-semibold mb-2">Form Incomplete</p>
                                                        <ul className="text-yellow-700 text-sm space-y-1">
                                                            {!registrationPath && <li>• Select your role (Delegate or International Press)</li>}
                                                            {!formData.committee_preference && <li>• Choose your committee or IP role</li>}
                                                            {(!formData.name || formData.name.trim() === '') && <li>• Enter your full name</li>}
                                                            {(!formData.email || formData.email.trim() === '') && <li>• Enter your email address</li>}
                                                            {(!formData.whatsapp || formData.whatsapp.trim() === '') && <li>• Enter your WhatsApp number</li>}
                                                            {(!formData.year || formData.year.trim() === '') && <li>• Select your year of study</li>}
                                                            {(formData.year !== 'Doctor / Practitioner' && (!formData.college || formData.college.trim() === '')) && <li>• Enter your college/institution</li>}
                                                            {!munPaymentPhoto && <li>• Upload MUN payment screenshot</li>}
                                                            {formData.hasRegisteredEsperanza === 'yes' && !esperanzaPaymentPhoto && <li>• Upload Esperanza payment screenshot</li>}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <p className="text-center text-gray-500 mt-4">
                                            By registering, you agree to our{' '}
                                            <a 
                                                href="/terms" 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 underline font-medium"
                                            >
                                                terms and conditions
                                            </a>
                                            {' '}for DIIMUN 2025
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </>
                    )}

                    {/* Global Error */}
                    {globalError && (
                        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-6">
                            <div className="flex items-start gap-4">
                                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <h3 className="text-red-800 font-bold text-lg mb-2">Form Incomplete</h3>
                                    <p className="text-red-700 font-medium mb-3">{globalError}</p>
                                    <div className="bg-red-100 border border-red-300 rounded-lg p-3">
                                        <p className="text-red-800 text-sm font-medium mb-1">Quick Checklist:</p>
                                        <ul className="text-red-700 text-sm space-y-1">
                                            <li>✓ Select your role (Delegate or International Press)</li>
                                            <li>✓ Choose your committee or IP role</li>
                                            <li>✓ Fill in personal details (name, email, WhatsApp, college, year)</li>
                                            <li>✓ Complete payment and upload screenshot</li>
                                            {formData.hasRegisteredEsperanza === 'yes' && (
                                                <li>✓ Upload Esperanza payment screenshot</li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Auto-save indicator */}
                    {isSaving && (
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 flex items-center gap-4">
                            <Loader className="w-5 h-5 text-blue-600 animate-spin flex-shrink-0" />
                            <p className="text-blue-700 font-medium">Auto-saving your progress...</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;